import React, { useEffect, useState, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import bot from "./aquaBot";
import { useTheme, Colors } from "../../../../themeContext";
import getStyles from "./style";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../../../CRUD";


function AdminChatSection({ isDarkMode, navigation }) {
  const { temaCor } = useTheme();
  const styles = getStyles(isDarkMode);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const flatListRef = React.useRef(null);
  const [id, setId] = useState(null);
  const [idAdmP, setAdmP] = useState(null);
  const [nomeAdm, setNomeAdm] = useState(null);

  const { width, height } = Dimensions.get("window");

  const randomNumRef = useRef(Math.floor(Math.random() * 6) + 1);
  const intervalRef = useRef(null);
  const fastPollingRef = useRef(null);



  // Imagens do bot
  const images = {
    1: require('./img/1.png'),
    2: require('./img/2.png'),
    3: require('./img/3.png'),
    4: require('./img/4.png'),
    5: require('./img/5.png'),
    6: require('./img/6.png'),
  };

  const generateUniqueId = () => {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };


  useEffect(() => {
    const loadIds = async () => {
      const savedId = await AsyncStorage.getItem("idUsers");
      const savedAdm = await AsyncStorage.getItem("idAdmP");

      if (savedId) {
        setId(savedId);
        console.log("ID carregado:", savedId);
      }

      if (savedAdm) {
        setAdmP(savedAdm);
        console.log("ID Adm carregado:", savedAdm);
      }
    };

    loadIds();
  }, []);


  useEffect(() => {
    if (!id || !idAdmP) return;

    let isMounted = true;

    const fetchWithAdm = async () => {
      try {
        setLoading(true);
        await fetchMessages();
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchWithAdm();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      fetchMessages();
    }, 10000);

    return () => {
      isMounted = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [id, idAdmP]);



  useEffect(() => {
    if (idAdmP) {
      console.log("ID do admin atualizado, buscando mensagens...");
      fetchMessages();


      if (fastPollingRef.current) {
        clearInterval(fastPollingRef.current);
      }


      fastPollingRef.current = setInterval(() => {
        fetchMessages();
      }, 5000);


      setTimeout(() => {
        if (fastPollingRef.current) {
          clearInterval(fastPollingRef.current);
          fastPollingRef.current = null;
        }
      }, 15000);
    }

    return () => {
      if (fastPollingRef.current) {
        clearInterval(fastPollingRef.current);
        fastPollingRef.current = null;
      }
    };
  }, [idAdmP]);


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);


  const fetchMessages = async () => {
    try {
      if (!idAdmP) {
        console.log("Aguardando idAdmP para buscar mensagens");
        return;
      }

      console.log("Buscando mensagens com adm:", idAdmP, "e usuário:", id);

      const resposta = await axios.get(`${API_URL}/api/PegarMensagem`, {
        params: {
          idAdm: idAdmP,
          idUsers: id
        },
        timeout: 5000
      });
      console.log("Resposta da API recebida:", resposta.data.statusConversa);

      if (!resposta.data.statusConversa) {
        if (resposta.data.status === 'ok' && resposta.data.mensagens) {
          console.log("Mensagens recebidas:", resposta.data.mensagens.length);

          const apiMessages = resposta.data.mensagens.map((msg, index) => ({
            id: msg.id ? `api_${msg.id}` : `temp_${Date.now()}_${index}`,
            text: msg.mensagens,
            sender: msg.enviante === 'user' ? 'user' : 'admin',
            timestamp: msg.created_at || new Date().toISOString()
          }));

          setNomeAdm(resposta.data.nomeAdm);

          // Atualiza as mensagens
          setMessages(apiMessages);

          // Scroll para o final após atualização
          setTimeout(() => {
            if (flatListRef.current) {
              flatListRef.current.scrollToEnd({ animated: true });
            }
          }, 100);
        } else {
          console.log("Resposta da API sem mensagens:", resposta.data);
        }
      }
      else {
       
      }


    } catch (error) {
      console.error("Erro ao buscar mensagens:", error.message);
    }
  };
  // ENVIAR MENSAGEM
  const handleSend = async () => {
    try {
      if (!inputText.trim()) return;

      setSending(true);

      const userMessage = {
        id: generateUniqueId(),
        text: inputText,
        sender: 'user',
        timestamp: new Date().toISOString(),
        pending: true
      };

      setMessages(prev => [...prev, userMessage]);
      setInputText('');

      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);

      const response = await axios.post(`${API_URL}/api/EnviarMensagem`, {
        idUsers: id,
        mensagens: inputText,
        enviante: "user"
      }, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const novoIdAdm = response.data.idAdm;
      console.log("ID Adm recebido:", novoIdAdm);

      // → IMPORTANTE: SALVAR IDADM NO STORAGE
      setAdmP(novoIdAdm);
      await AsyncStorage.setItem("idAdmP", String(novoIdAdm));

      // remover pending
      setMessages(prev => prev.map(msg =>
        msg.id === userMessage.id
          ? { ...msg, pending: false }
          : msg
      ));

      // BUSCAR MENSAGENS IMEDIATAMENTE
      await fetchMessages();

      // Configurar polling mais frequente após primeiro envio
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          fetchMessages();
        }, 1500); // Reduzir para 1.5 segundos
      }

    } catch (error) {
      console.error('Erro no handleSend:', error);

      setMessages(prev => prev.map(msg =>
        msg.pending === true
          ? { ...msg, pending: false, failed: true }
          : msg
      ));

      Alert.alert('Erro', 'Não foi possível enviar a mensagem. Tente novamente.');
    } finally {
      setSending(false);
    }
  };

  // FORÇAR ATUALIZAÇÃO MANUAL
  const handleRefresh = async () => {
    setLoading(true);
    await fetchMessages();
    setLoading(false);
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.msgContainer,
      item.sender === 'user' ? styles.msgUsuario : styles.msgBot,
      item.failed && styles.failedMsg,
      item.pending && styles.pendingMsg
    ]}>
      <Text style={[
        item.sender === 'user' ? styles.msgTextoUsuario : styles.msgTextoBot,
        item.failed && styles.failedMsgText
      ]}>
        {item.text}
        {item.pending && ' ⏳'}
        {item.failed && ' ❌'}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        Platform.OS === 'android' && keyboardHeight > 0
          ? { paddingBottom: keyboardHeight + 20 }
          : { paddingBottom: 20 }
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={height * 0.035} color={Colors[temaCor]} />
        </Pressable>

        <View style={styles.botIcon}>
          <Image
            source={images[randomNumRef.current]}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </View>

        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{nomeAdm ? nomeAdm : 'Suporte'}</Text>
          <Text style={styles.headerSubtitle}>Administrador {nomeAdm ? '• Online' : '• Aguardando'}</Text>
        </View>

        {/* Botão de atualização */}
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={handleRefresh}
          disabled={loading}
        >
          <Ionicons
            name="refresh"
            size={24}
            color={Colors[temaCor]}
          />
        </TouchableOpacity>
      </View>

      {/* Mensagens */}
      <View style={styles.chatContainer}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={temaCor[Colors]} />
            <Text style={styles.loadingText}>Carregando mensagens...</Text>
          </View>
        )}

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          style={styles.scrollArea}
          contentContainerStyle={styles.listContent}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
        />

        {/* Input */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Digite uma mensagem..."
            placeholderTextColor={isDarkMode ? "#888" : "#999"}
            editable={!sending}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendBtn, sending && styles.sendBtnDisabled]}
            onPress={handleSend}
            disabled={sending || !inputText.trim()}
          >
            {sending
              ? <ActivityIndicator size="small" color="#fff" />
              : <Text style={styles.sendText}>➤</Text>
            }
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

// --------------------------------------------
//   AQUABOT + TROCA DE TELA PARA ADMIN
// --------------------------------------------
export default function Chat() {
  const navigation = useNavigation();
  const route = useRoute();
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);

  const [botData, setBotData] = useState(null);
  const [estado, setEstado] = useState("inicio");
  const [historico, setHistorico] = useState([]);
  const [currentView, setCurrentView] = useState("bot");
  const { width, height } = Dimensions.get("window");
  const { temaCor } = useTheme();

  const executarAcao = (acao) => {
    switch (acao) {
      case "abrirChatAdmin":
        setCurrentView("admin");
        break;
      case "irParaPerfil":
        navigation.navigate('Main', { screen: 'Perfil' });
        break;
      case "abrirNoticias":
        navigation.navigate('Main', { screen: 'Feed' });
        break;
      case "irParaServicos":
        navigation.navigate('Main', { screen: 'Servico' });
        break;
      case "irParaDocumentos":
        navigation.navigate('Main', { screen: 'Documentos' });
        break;
    }
  };

  const handlePress = (item) => {
    setHistorico(prev => [...prev, { autor: "usuario", texto: item.texto }]);

    if (item.acao) executarAcao(item.acao);

    if (item.proximo && botData && botData[item.proximo]) {
      const proximoEstado = botData[item.proximo];
      setHistorico(prev => [
        ...prev,
        { autor: "bot", texto: proximoEstado.fala, estado: item.proximo }
      ]);
      setEstado(item.proximo);
    }
  };

  useEffect(() => {
    const carregarBot = async () => {
      try {
        const data = await bot(navigation);
        setBotData(data.opcoes[0]);
      } catch (error) {
        console.error("Erro ao carregar bot:", error);
      }
    };
    carregarBot();
  }, []);

  // TROCA AUTOMÁTICA PARA CHAT ADMIN SE SOLICITADO
  useEffect(() => {
    if (route.params?.abrirAdmin) {
      setCurrentView("admin");
    }
  }, [route.params]);

  // Se for chat admin → retorna componente admin
  if (currentView === "admin") {
    return <AdminChatSection isDarkMode={isDarkMode} navigation={navigation} />;
  }

  if (!botData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#075E54" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  const atual = botData[estado];
  if (!atual) {
    setEstado("inicio");
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#075E54" />
        <Text style={styles.loadingText}>Recarregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho do bot */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={height * 0.035} color={Colors[temaCor]} />
        </Pressable>

        <View style={styles.botIcon}>
          <View style={styles.eyesBot}></View>
          {typeof atual.image === "object"
            ? atual.image
            : <Text style={styles.botIconText}>🤖</Text>
          }
        </View>

        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>AquaBot</Text>
          <Text style={styles.headerSubtitle}>Online</Text>
        </View>
      </View>

      {/* Mensagens */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {historico.map((msg, index) => (
          <View key={index} style={[
            styles.msgContainer,
            msg.autor === "usuario" ? styles.msgUsuario : styles.msgBot
          ]}>
            <Text style={msg.autor === "usuario"
              ? styles.msgTextoUsuario
              : styles.msgTextoBot
            }>
              {msg.texto}
            </Text>
          </View>
        ))}

        {/* Opções do bot */}
        <View style={styles.optionsContainer}>
          {atual.funcoes && atual.funcoes.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => handlePress(item)}
              style={({ pressed }) => [
                styles.botao,
                pressed && styles.botaoPressed
              ]}
            >
              <Text style={styles.botaoTexto}>{item.texto}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.boxInvi}></View>
      </ScrollView>
    </View>
  );
}