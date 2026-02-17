import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  SafeAreaView,
  Alert,
  ActivityIndicator
} from 'react-native';

export default function SimpleChat() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const flatListRef = useRef(null);

  // Função para gerar IDs únicos
  const generateUniqueId = () => {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const removeDuplicateMessages = (messagesArray) => {
    const seen = new Set();
    return messagesArray.filter(message => {
      const duplicate = seen.has(message.id);
      seen.add(message.id);
      return !duplicate;
    });
  };

  // Função para buscar mensagens
  const fetchMessages = async () => {
    try {
      const resposta = await axios.get("http://SeuIp:8000/api/PegarMensagem", { 
        params: {
          idAdm: 1, 
          idUsers: 1
        },
        timeout: 5000
      });

      if (resposta.data.status === 'ok' && resposta.data.mensagens) {
        const apiMessages = resposta.data.mensagens.map(msg => ({
          id: `api_${msg.id}`,
          text: msg.mensagem,
          sender: msg.enviante === 'user' ? 'user' : 'bot',
          timestamp: msg.created_at
        }));

        setMessages(prevMessages => {
          // Verificar se há novas mensagens
          const currentIds = new Set(prevMessages.map(msg => msg.id));
          const newMessages = apiMessages.filter(msg => !currentIds.has(msg.id));
          
          if (newMessages.length > 0) {
            console.log('🆕 Novas mensagens recebidas:', newMessages.length);
          }
          
          return removeDuplicateMessages(apiMessages);
        });

        setLastUpdate(new Date());
      }
      
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
    }
  };

  // Buscar mensagens iniciais
  useEffect(() => {
    let isMounted = true;

    const loadInitialMessages = async () => {
      try {
        setLoading(true);
        await fetchMessages();
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadInitialMessages();

    return () => {
      isMounted = false;
    };
  }, []);

  // Polling para verificar novas mensagens a cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, 3000); // Verifica a cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  // Função para verificar se há novas mensagens do ADM
  const checkForNewAdminMessages = (prevMessages, newMessages) => {
    const prevIds = new Set(prevMessages.map(msg => msg.id));
    const newAdminMessages = newMessages.filter(msg => 
      !prevIds.has(msg.id) && msg.sender === 'bot'
    );
    
    return newAdminMessages;
  };

  const adminName = 'Jhonny';

  const handleSend = async () => {
    try {
      if (!inputText.trim()) return;

      setSending(true);

      const userMessageId = generateUniqueId();
      
      const userMessage = {
        id: userMessageId,
        text: inputText,
        sender: 'user',
        timestamp: new Date().toISOString(),
        pending: true
      };

      // Adiciona mensagem localmente imediatamente
      setMessages(prev => removeDuplicateMessages([...prev, userMessage]));
      setInputText('');

      // Rola para a nova mensagem
      setTimeout(() => flatListRef.current?.scrollToEnd(), 100);

      // Envia para a API
      const response = await axios.post('http://SeuIp:8000/api/EnviarMensagem', {
        idUsers: 1,
        mensagem: inputText, 
        enviante: "user"
      }, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('✅ Mensagem enviada com sucesso:', response.data);

      // Atualiza a mensagem para remover pending
      setMessages(prev => prev.map(msg => 
        msg.id === userMessageId 
          ? { ...msg, pending: false, id: `api_${response.data.id}` || msg.id }
          : msg
      ));

      // Força uma atualização para pegar possíveis respostas do ADM
      setTimeout(() => fetchMessages(), 1000);

    } catch (error) {
      console.error('❌ Erro no handleSend:', error);
      
      setMessages(prev => prev.map(msg => 
        msg.pending === true 
          ? { ...msg, pending: false, failed: true }
          : msg
      ));

      if (error.code === 'ECONNABORTED') {
        Alert.alert('Timeout', 'A conexão demorou muito tempo. Tente novamente.');
      } else if (error.response) {
        Alert.alert('Erro do Servidor', `Status: ${error.response.status}`);
      } else if (error.request) {
        Alert.alert('Servidor Indisponível', 'Não foi possível conectar ao servidor.');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro inesperado.');
      }
    } finally {
      setSending(false);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.msgContainer,
      item.sender === 'user' ? styles.userMsg : styles.botMsg,
      item.failed && styles.failedMsg,
      item.pending && styles.pendingMsg
    ]}>
      <Text style={[
        styles.msgText,
        item.sender === 'user' && styles.userMsgText,
        item.failed && styles.failedMsgText
      ]}>
        {item.text}
        {item.pending && ' ⏳'}
        {item.failed && ' ❌'}
      </Text>
      <Text style={styles.timestamp}>
        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  // Componente da Navbar
  const Navbar = () => (
    <View style={styles.navbar}>
      <View style={styles.navbarContent}>
        <Text style={styles.navbarTitle}>Chat</Text>
        <View style={styles.adminInfo}>
          <Text style={styles.adminLabel}>Administrador:</Text>
          <Text style={styles.adminName}>{adminName}</Text>
        </View>
        <View style={styles.statusIndicator}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Online</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#007AFF" />
      <Navbar />
      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Carregando mensagens...</Text>
          </View>
        )}
        
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id.toString()}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Digite uma mensagem..."
            placeholderTextColor="#999"
            editable={!sending}
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={[styles.sendBtn, sending && styles.sendBtnDisabled]} 
            onPress={handleSend}
            disabled={sending || !inputText.trim()}
          >
            {sending ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.sendText}>➤</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContainer: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  navbar: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#0056b3',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navbarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navbarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  adminInfo: {
    alignItems: 'flex-end',
  },
  adminLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 2,
  },
  adminName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CD964',
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  msgContainer: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
    maxWidth: '80%',
  },
  botMsg: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
  userMsg: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  pendingMsg: {
    opacity: 0.7,
  },
  failedMsg: {
    backgroundColor: '#ff6b6b',
  },
  msgText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMsgText: {
    color: '#fff',
  },
  failedMsgText: {
    color: '#fff',
    fontStyle: 'italic',
  },
  timestamp: {
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.4)',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputRow: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#fff',
    maxHeight: 100,
    textAlignVertical: 'center',
  },
  sendBtn: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: '#ccc',
  },
  sendText: {
    color: '#fff',
    fontSize: 16,
  },
});