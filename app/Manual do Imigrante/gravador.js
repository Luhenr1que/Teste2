import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, Pressable, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, Colors } from './themeContext';
import axios from 'axios';
import { useApi, API_URL } from './CRUD';

// 🔥 CORREÇÃO: Adicione onTranscription nos parâmetros
const AudioRecorder = ({ visible, onClose, onTranscription }) => {
  const { themeMode, isDarkMode, temaCor } = useTheme();

  // Adicione fallbacks para valores undefined
  const safeTemaCor = temaCor || 'padrao';
  const safeColors = Colors || { padrao: '#6200ee' };

  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const timerRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [transcriptionStatus, setTranscriptionStatus] = useState(null);
  const [transcriptionResult, setTranscriptionResult] = useState(null);
  const [taskId, setTaskId] = useState(null);

  const url = API_URL.replace(':8000',':8004')

  // Efeito para resetar tudo quando o modal fechar
  useEffect(() => {
    if (!visible) {
      console.log(url)
      // Limpar tudo
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      if (isRecording && recording) {
        recording.stopAndUnloadAsync().catch(console.error);
      }
      
      setIsRecording(false);
      setRecordingDuration(0);
      setIsUploading(false);
      setTranscriptionStatus(null);
      setTranscriptionResult(null);
      setTaskId(null);
      setRecording(null);
    }
  }, [visible, isRecording, recording]);

  useEffect(() => {
    (async () => {
      if (!permissionResponse && visible) {
        await requestPermission();
      }
    })();
  }, [visible]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const checkTranscriptionStatus = async (taskId) => {
    try {
      const response = await axios.get(`${url}/transcription/${taskId}`);
      const status = response.data.status;
      
      setTranscriptionStatus(status);

      if (status === 'completed') {
        setTranscriptionResult(response.data);
        Alert.alert('Sucesso', 'Transcrição concluída!');
        
        // 🔥 NOVO: Enviar o texto transcrito de volta
        if (onTranscription) {
          const transcribedText = response.data.transcription || response.data.text || '';
          onTranscription(transcribedText);
        }
        // 🔥 DEBUG: Verifique se onTranscription existe
      console.log('onTranscription existe?', !!onTranscription);
      console.log('Dados recebidos:', response.data);
      
      // 🔥 NOVO: Enviar o texto transcrito de volta
      if (onTranscription && typeof onTranscription === 'function') {
        const transcribedText = response.data.transcription || response.data.text || '';
        console.log('Texto a ser enviado:', transcribedText);
        onTranscription(transcribedText);
      } else {
        console.log('onTranscription não é uma função ou não existe');
      }
        
      } else if (status === 'error') {
        Alert.alert('Erro', `Falha na transcrição: ${response.data.error}`);
      } else if (['processing', 'transcribing', 'downloading', 'extracting_audio'].includes(status)) {
        setTimeout(() => checkTranscriptionStatus(taskId), 3000);
      }
    } catch (error) {
      console.error('Erro ao verificar status:', error);
      if (error.response?.status === 404) {
        setTimeout(() => checkTranscriptionStatus(taskId), 3000);
      } else {
        Alert.alert('Erro', 'Falha ao verificar status da transcrição');
      }
    }
  };

  const uploadAudioToAPI = async (fileUri, fileName) => {
    try {
      setIsUploading(true);
      setTranscriptionStatus('uploading');
      setTranscriptionResult(null);

      const formData = new FormData();
      formData.append('file', {
        uri: fileUri,
        name: fileName,
        type: 'audio/m4a',
      });

      const response = await axios.post(`${url}/transcribe/file`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000,
      });

      console.log('✅ Áudio enviado! ID:', response.data.id);
      setTaskId(response.data.id);
      
      // Iniciar verificação do status
      setTimeout(() => checkTranscriptionStatus(response.data.id), 3000);
      
      return response.data;

    } catch (error) {
      console.error('❌ Erro ao enviar áudio:', error);
      let errorMessage = 'Erro ao enviar áudio';
      if (error.response) {
        errorMessage = `Erro ${error.response.status}: ${error.response.data?.message || 'Erro no servidor'}`;
      } else if (error.request) {
        errorMessage = 'Não foi possível conectar ao servidor';
      } else {
        errorMessage = error.message;
      }
      
      Alert.alert('Erro', errorMessage);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const startRecording = async () => {
    try {
      if (!permissionResponse) {
        const newPermissionResponse = await requestPermission();
        if (newPermissionResponse.status !== 'granted') {
          Alert.alert('Permissão negada', 'É necessário conceder permissão para gravar áudio');
          return;
        }
      } else if (permissionResponse.status !== 'granted') {
        const newPermissionResponse = await requestPermission();
        if (newPermissionResponse.status !== 'granted') {
          Alert.alert('Permissão negada', 'É necessário conceder permissão para gravar áudio');
          return;
        }
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      setRecording(recording);
      setIsRecording(true);
      setRecordingDuration(0);
      setTranscriptionStatus(null);
      setTranscriptionResult(null);

      // Limpar timer anterior se existir
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
      
    } catch (err) {
      console.error('Falha ao iniciar gravação', err);
      Alert.alert('Erro', 'Não foi possível iniciar a gravação');
    }
  };

  const stopRecording = async () => {
    try {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      
      const uri = recording.getURI();
      
      if (!uri) {
        throw new Error('URI do áudio não disponível');
      }

      const fileName = `audio_imigrante_${Date.now()}.m4a`;
      await uploadAudioToAPI(uri, fileName);
      
      setRecordingDuration(0);
      setRecording(null);
      
    } catch (err) {
      console.error('Falha ao parar gravação', err);
      Alert.alert('Erro', 'Não foi possível processar a gravação');
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      uploading: 'Enviando áudio...',
      downloading: 'Baixando arquivo...',
      extracting_audio: 'Extraindo áudio...',
      processing: 'Processando...',
      transcribing: 'Transcrevendo...',
      completed: 'Concluído!',
      error: 'Erro na transcrição'
    };
    return statusMap[status] || status;
  };

  const renderResults = () => {
    if (!transcriptionResult) return null;

    return (
      <View style={[styles.resultContainer, { backgroundColor: isDarkMode ? '#484848' : '#fff' }]}>
        <Text style={[styles.resultTitle, { color: isDarkMode ? "#fff" : "#131F3C" }]}>
          ✅ Transcrição Concluída
        </Text>
        
        {transcriptionResult.transcription && (
          <View style={styles.transcriptionTextContainer}>
            <Text style={[styles.transcriptionLabel, { color: isDarkMode ? "#ccc" : "#666" }]}>
              Texto transcrito:
            </Text>
            <Text style={[styles.transcriptionText, { color: isDarkMode ? "#fff" : "#131F3C" }]}>
              {transcriptionResult.transcription}
            </Text>
          </View>
        )}
        
        {transcriptionResult.text && (
          <View style={styles.transcriptionTextContainer}>
            <Text style={[styles.transcriptionLabel, { color: isDarkMode ? "#ccc" : "#666" }]}>
              Texto transcrito:
            </Text>
            <Text style={[styles.transcriptionText, { color: isDarkMode ? "#fff" : "#131F3C" }]}>
              {transcriptionResult.text}
            </Text>
          </View>
        )}
        
        <View style={styles.jsonInfo}>
          <Text style={[styles.infoText, { color: isDarkMode ? "#ccc" : "#666" }]}>
            ID: {transcriptionResult.id}
          </Text>
          <Text style={[styles.infoText, { color: isDarkMode ? "#ccc" : "#666" }]}>
            Status: {transcriptionResult.status}
          </Text>
        </View>
      </View>
    );
  };

  if (!visible) return null;

  return (
    <Modal animationType='slide' visible={visible} transparent={false}>
      <View style={[styles.container, { backgroundColor: isDarkMode ? '#313131' : '#fff' }]}>
        <Pressable 
          onPress={() => { 
            onClose();
          }} 
          style={styles.closeButton}
        >
          <Ionicons 
            name='close-outline' 
            size={30} 
            color={Colors[temaCor] || '#6200ee'} 
          />
        </Pressable>
        
        <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#131F3C" }]}>
          Gravador de Áudio
        </Text>
        
        <Text style={[styles.subtitle, { color: isDarkMode ? "#ccc" : "#666" }]}>
          Grave e envie para transcrição
        </Text>
        
        <View style={[styles.recordingContainer, { backgroundColor: isDarkMode ? '#484848' : '#fff' }]}>
          <Text style={[styles.timer, { color: isDarkMode ? "#fff" : "#131F3C" }]}>
            {formatTime(recordingDuration)}
          </Text>
          
          {isUploading || transcriptionStatus ? (
            <View style={styles.uploadingContainer}>
              <ActivityIndicator size="large" color={Colors[temaCor] || '#6200ee'} />
              <Text style={[styles.uploadingText, { color: isDarkMode ? "#fff" : "#131F3C" }]}>
                {getStatusText(transcriptionStatus)}
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.recordButton, isRecording && styles.recordingButton, { backgroundColor: Colors[temaCor] || '#5a8945ff' }]}
              onPress={isRecording ? stopRecording : startRecording}
              disabled={isUploading}
            >
              <Ionicons 
                name={isRecording ? "stop" : "mic"} 
                size={40} 
                color="white" 
              />
            </TouchableOpacity>
          )}
          
          <Text style={[styles.recordButtonText, { color: isDarkMode ? "#fff" : "#131F3C" }]}>
            {isRecording ? 'Parar Gravação' : 'Iniciar Gravação'}
          </Text>
        </View>

        <ScrollView style={styles.resultsScrollView}>
          {renderResults()}
        </ScrollView>
      </View>        
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  recordingContainer: {
    alignItems: 'center',
    padding: 25,
    borderRadius: 20,
    marginBottom: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  timer: {
    fontSize: 52,
    fontWeight: 'bold',
    marginBottom: 25,
    fontVariant: ['tabular-nums'],
  },
  recordButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  recordingButton: {
    opacity: 0.8,
  },
  recordButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  uploadingContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  uploadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  resultsScrollView: {
    flex: 1,
  },
  resultContainer: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  transcriptionTextContainer: {
    marginBottom: 15,
  },
  transcriptionLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  transcriptionText: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
  },
  jsonInfo: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
    marginTop: 15,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default AudioRecorder;