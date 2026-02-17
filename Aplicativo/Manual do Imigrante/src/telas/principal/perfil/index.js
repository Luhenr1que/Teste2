import React, { useState, useEffect } from "react";
import { Pressable, View, Text, ScrollView, FlatList, Modal, Appearance, ActivityIndicator, Alert, TextInput, Image, TouchableOpacity, Dimensions } from "react-native";
import ModalIdioma from "../../../../trocarIdioma";
import { useIdioma } from "../../../../idiomaContext";
import { useTheme } from "../../../../themeContext";
import getStyles from "./style";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../../../themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApi, API_URL } from "../../../../CRUD";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import axios from 'axios';
import { LinearGradient } from "expo-linear-gradient";
import BubbleArea from "../Bolha/areaBolha";
import * as LocalAuthentication from 'expo-local-authentication';
import { useBubble } from "../Bolha/index";

// Diretório para salvar as fotos em cache
const CACHE_DIR = FileSystem.cacheDirectory + 'profile_photos/';
const { width, height } = Dimensions.get('window');

export default function Perfil({ navigation }) {
  // Contextos e temas
  const cor = Appearance.getColorScheme();
  const { themeMode, setThemeMode, isDarkMode, setTemaCor, temaCor } = useTheme();
  const styles = getStyles(isDarkMode);
  const { selectInfo, carregarDadosUsuario, atualizarSenha, escomungar } = useApi();
  const { textos } = useIdioma();
  const { visible, setVisible } = useBubble();

  const font = isDarkMode ? '#ffffffff' : "#000000ff";

  // Estados
  const [local, setLocal] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpfUsers: "",
    crmRneUsers: "",
    mercosulUsers: "",
    passaporteUsers: ""
  });
  const [ver, setVer] = useState(false);
  const [verTema, setVerTema] = useState(false);
  const [notificar, setNotificar] = useState(false);
  const [info, setInfo] = useState([]);
  const [id, setId] = useState();
  const [codigo, setCodigo] = useState('');
  const [loading, setLoading] = useState(true);
  const [c, setC] = useState('');
  const [senhaNova, setSenhaNova] = useState('');
  const [senhaConfirmar, setSenhaConfirmar] = useState('');
  const [verModalEmail, setVerModalEmail] = useState(false);
  const [modalE, setModalE] = useState(0);
  const [photoUri, setPhotoUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageKey, setImageKey] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [modalPerfilVisible, setModalPerfilVisible] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [maxRetries] = useState(3);
  const [modalTermosVisible, setModalTermosVisible] = useState(false);
  const [modalPrivacidadeVisible, setModalPrivacidadeVisible] = useState(false);
  const [modalDocumentos, setModalDocumentos] = useState(false);

  // Textos do contexto de idioma
  const texto = textos?.perfil || [];
  const textoCor = textos?.cores || [];
  const textoAviso = textos?.aviso || [];
  const textoHome = textos?.home || [];
  const textoFeed = textos?.feed || [];
  const textoDocumentos = textos?.documentos || [];
  const termos = textos?.termos || [];
  const privacidade = textos?.privacidade || [];

  let textoEndereco = local ? texto[17] : texto[16];

  // Dados dos botões
  const botoes = [
    { id: "1", icon: "globe-outline", label: texto[0], action: () => setVer(true) },
    { id: "2", icon: "color-palette-outline", label: texto[1], action: () => setVerTema(true) },
    { id: "3", icon: "notifications-outline", label: texto[2] + " " + (!visible ? texto[3] : texto[4]), action: () => setVisible(!visible)},
    { id: "8", icon: "map-outline", label: textoEndereco, action: () => navigation.navigate('Logradouro') },
    { id: "7", icon: "lock-closed-outline", label: texto[15], action: () => visualizarM() },
    { id: "9", icon: "help-circle-outline", label: texto[61], action: () => abrirChat() },
    { id: "4", icon: "document-text-outline", label: texto[5], action: () => setModalTermosVisible(true) },
    { id: "5", icon: "shield-checkmark-outline", label: texto[6], action: () => setModalPrivacidadeVisible(true) },
    { id: "6", icon: "log-out-outline", label: texto[7], action: () => logout() },
  ];

  const cores = [
    { id: "1", cor: "padrao", nome: textoCor[0] },
    { id: "2", cor: "laranja", nome: textoCor[1] },
    { id: "4", cor: "azul", nome: textoCor[2] },
    { id: "5", cor: "amarelo", nome: textoCor[4] },
    { id: "8", cor: "verde", nome: textoCor[7] },
    { id: "9", cor: "azulEscuro", nome: textoCor[8] },
    { id: "3", cor: "roxo", nome: textoCor[3] },
    { id: "6", cor: "rosa", nome: textoCor[5] },
    { id: "7", cor: "vermelho", nome: textoCor[6] },
  ];

  // Funções auxiliares melhoradas
  const obterUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem("idUsers");
      return userId;
    } catch (error) {
      console.error("Erro ao obter user ID:", error);
      return null;
    }
  };

  const excluirConta = async () => {
    try {
      const userId = await obterUserId();
      if (!userId) {
        Alert.alert(textoAviso[8] || texto[19], texto[28]);
        return;
      }
      await escomungar(userId);
      await logout();
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
    }
  };

  // ✅ FUNÇÃO CORRIGIDA: Verificar imagem usando a nova API
  const verificarImagemValida = async (uri) => {
    try {
      if (!uri) return false;

      if (uri.startsWith('file://')) {
        // Usando a nova API FileSystem
        const fileInfo = await FileSystem.getInfoAsync(uri);
        const isValid = fileInfo.exists && fileInfo.size > 0;
        return isValid;
      }

      // Para URLs remotas, fazemos uma verificação simples
      if (uri.startsWith('http')) {
        return true;
      }

      return false;
    } catch (error) {
      console.log('ℹ️ Erro ao verificar imagem:', error);
      return false;
    }
  };

  // ✅ FUNÇÃO CORRIGIDA: Baixar e salvar imagem usando a nova API
  const baixarESalvarImagem = async (imageUrl, userId) => {
    try {
      // Usando FileSystem.downloadAsync da nova API
      await FileSystem.makeDirectoryAsync(CACHE_DIR, { intermediates: true });
      const fileName = `profile_${userId}_cache.jpg`;
      const localPath = CACHE_DIR + fileName;

      const downloadResult = await FileSystem.downloadAsync(imageUrl, localPath);

      if (downloadResult.status !== 200) {
        throw new Error(`Download failed with status ${downloadResult.status}`);
      }

      await AsyncStorage.setItem('localProfilePhoto', localPath);
      return localPath;
    } catch (error) {
      console.log('❌ Erro ao baixar imagem:', error);
      throw error;
    }
  };

  // ✅ FUNÇÃO CORRIGIDA: Salvar imagem localmente usando a nova API
  const salvarImagemLocalmente = async (uri, userId) => {
    try {
      await FileSystem.makeDirectoryAsync(CACHE_DIR, { intermediates: true });
      const fileName = `profile_${userId}_${Date.now()}.jpg`;
      const localPath = CACHE_DIR + fileName;

      // Usando copyAsync da nova API
      await FileSystem.copyAsync({
        from: uri,
        to: localPath
      });

      await AsyncStorage.setItem('localProfilePhoto', localPath);
      return localPath;
    } catch (error) {
      console.error('❌ Erro ao salvar imagem localmente:', error);
      return uri;
    }
  };

  // ✅ FUNÇÃO CORRIGIDA: Carregar imagem local usando a nova API
  const carregarImagemLocal = async (userId) => {
    try {
      const localPath = await AsyncStorage.getItem('localProfilePhoto');
      if (localPath) {
        const fileInfo = await FileSystem.getInfoAsync(localPath);
        if (fileInfo.exists && fileInfo.size > 0) {
          return localPath;
        } else {
          await AsyncStorage.removeItem('localProfilePhoto');
          if (fileInfo.exists) {
            await FileSystem.deleteAsync(localPath, { idempotent: true });
          }
        }
      }
      return null;
    } catch (error) {
      console.log('ℹ️ Erro ao carregar imagem local:', error);
      return null;
    }
  };

  // ✅ FUNÇÃO CORRIGIDA: Carregar imagem do perfil com nova API
  const carregarImagemPerfil = async (userData, userId) => {
    try {
      setImageError(false);

      // Primeiro tenta carregar a imagem local do cache
      const localPhotoUri = await carregarImagemLocal(userId);
      if (localPhotoUri && await verificarImagemValida(localPhotoUri)) {
        const localPhotoWithTimestamp = `${localPhotoUri}?t=${Date.now()}`;
        setPhotoUri(localPhotoWithTimestamp);
        return;
      }

      // Se não tem local, tenta carregar do servidor e salvar no cache
      if (userData.imgUsers) {
        let fotoUrl = userData.imgUsers.startsWith('http')
          ? userData.imgUsers
          : `${API_URL}${userData.imgUsers}`;

        // Tenta baixar e salvar no cache primeiro
        try {
          const cachedPath = await baixarESalvarImagem(fotoUrl, userId);
          const cachedWithTimestamp = `${cachedPath}?t=${Date.now()}`;
          setPhotoUri(cachedWithTimestamp);
        } catch (cacheError) {
          // Se falhar ao baixar, usa a URL direta do servidor
          console.log('🔄 Usando URL direta do servidor');
          fotoUrl += `?t=${Date.now()}`;
          setPhotoUri(fotoUrl);
        }
      } else {
        // Se não tem imagem, usa placeholder
        setPhotoUri(null);
      }
    } catch (error) {
      console.error("❌ Erro ao carregar imagem do perfil:", error);
      setImageError(true);
      setPhotoUri(null);
    }
  };

  // ✅ FUNÇÃO CORRIGIDA: Recarregar imagem discretamente
  const recarregarImagemDiscreta = async () => {
    try {
      if (retryCount >= maxRetries) {
        return;
      }

      setRetryCount(prev => prev + 1);
      setImageKey(prev => prev + 1);

      const userId = await obterUserId();
      if (!userId) return;

      // Recarrega os dados do usuário para tentar novamente
      const userData = await carregarDadosUsuario(userId);
      if (userData) {
        await carregarImagemPerfil(userData, userId);
      }
    } catch (error) {
      // Falha silenciosamente
    }
  };

  // ✅ FUNÇÃO CORRIGIDA: Escolher imagem da galeria
  const pickImageFromGallery = async () => {
    try {
      const userId = await obterUserId();
      if (!userId) {
        Alert.alert(textoAviso[8] || texto[19], texto[28]);
        return;
      }

      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert(texto[26]);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.3,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0].uri;

        // ✅ VERIFICAÇÃO CORRIGIDA: Usando a nova API
        const imageInfo = await FileSystem.getInfoAsync(selectedImage);
        if (!imageInfo.exists || imageInfo.size === 0) {
          Alert.alert(textoAviso[8] || texto[19], texto[29]);
          return;
        }

        const localPath = await salvarImagemLocalmente(selectedImage, userId);
        const localPathWithTimestamp = `${localPath}?t=${Date.now()}`;

        setPhotoUri(localPathWithTimestamp);
        setImageError(false);
        setImageKey(prev => prev + 1);

        // Upload para servidor em segundo plano
        await uploadImage(selectedImage);
      }
    } catch (error) {
      console.error('❌ Erro ao escolher imagem:', error);
      alert(texto[25]);
    }
  };

  // ✅ FUNÇÃO CORRIGIDA: Upload de imagem
  const uploadImage = async (uri) => {
    try {
      setUploading(true);

      const userId = await obterUserId();
      if (!userId) {
        throw new Error(texto[28]);
      }

      const formData = new FormData();
      formData.append('foto', {
        uri: uri,
        type: 'image/jpeg',
        name: `perfil_${userId}_${Date.now()}.jpg`,
      });
      formData.append('idUsers', userId);

      const response = await axios.post(`${API_URL}/api/upload-foto`, formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 segundos de timeout
      });

      if (response.data.success) {
        Alert.alert(texto[22], texto[23]);
        await carregar();
      } else {
        throw new Error(response.data.message || 'Erro desconhecido');
      }
    } catch (error) {
      console.error("❌ Erro no upload para servidor:", error);
      Alert.alert(texto[24], texto[25]);
    } finally {
      setUploading(false);
    }
  };

  // ✅ FUNÇÃO CORRIGIDA: Limpar cache da imagem
  const limparCacheImagem = async () => {
    try {
      const localPath = await AsyncStorage.getItem('localProfilePhoto');
      if (localPath) {
        await FileSystem.deleteAsync(localPath, { idempotent: true });
      }
      await AsyncStorage.removeItem('localProfilePhoto');
      setPhotoUri(null);
      setImageKey(prev => prev + 1);
    } catch (error) {
      console.log('ℹ️ Erro ao limpar cache da imagem:', error);
    }
  };

  // Funções principais melhoradas
  // Funções principais melhoradas
  const carregar = async () => {
    try {
      setLoading(true);
      setImageError(false);
      setRetryCount(0); // Reseta as tentativas ao recarregar

      const userId = await AsyncStorage.getItem("idUsers");

      if (!userId) {
        setFormData({
          nome: "Usuário",
          email: "",
          telefone: "",
          cpfUsers: "",
          crmRneUsers: "",
          mercosulUsers: "",
          passaporteUsers: ""
        });
        setLoading(false);
        return;
      }

      setId(userId);
      const localStorage = await AsyncStorage.getItem("@endereçoUsuario");
      if (localStorage) {
        try {
          const enderecoParsed = JSON.parse(localStorage);
          setLocal(enderecoParsed);
        } catch (parseError) {
          console.error("❌ Erro ao fazer parse do endereço:", parseError);
          setLocal(null);
        }
      } else {
        setLocal(null);
      }

      const userData = await carregarDadosUsuario(userId);
      if (userData) {
        setFormData({
          nome: userData.nomeUsers || userData.nome || "",
          email: userData.emailUsers || userData.email || "",
          telefone: userData.telefoneUsers || userData.telefone || "",
          cpfUsers: userData.cpfUsers || "",
          crmRneUsers: userData.crmRneUsers || "",
          mercosulUsers: userData.mercosulUsers || "",
          passaporteUsers: userData.passaporteUsers || ""
        });

        // Carrega a imagem do perfil
        await carregarImagemPerfil(userData, userId);
      }

      const dados = await selectInfo();
      setInfo(dados);

    } catch (erro) {
      console.error("❌ Erro no carregamento:", erro);
      setImageError(true);
    } finally {
      setLoading(false);
    }
  };

  const chamarVerificação = async () => {
    try {
      const userData = await carregarDadosUsuario(id);

      const response = await axios.post(`${API_URL}/api/email`, {
        nomeUsers: userData.nomeUsers,
        emailUsers: userData.emailUsers
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.data.success) {
        setC(String(response.data.codigo));
      } else {
        throw new Error(response.data.message || 'Erro ao enviar email');
      }
    } catch (erro) {
      console.error("❌ Erro ao enviar email:", erro);
      Alert.alert(textoAviso[8] || texto[19], textoAviso[8] || texto[19]);
    }
  };

  const visualizarM = async () => {
    if (!verModalEmail) {
      setVerModalEmail(true);
      await chamarVerificação();
      setModalE(1);
    } else {
      setVerModalEmail(false);
    }
  };

  const abrirChat = () => {
    navigation.navigate('Chat');
  }

  const verificarSenha = async () => {
    if (senhaNova === senhaConfirmar) {
      try {
        await atualizarSenha(id, senhaConfirmar);
        Alert.alert("Senha atualizada com sucesso");
        setModalE(0);
        setVerModalEmail(false);
        setSenhaNova('');
        setSenhaConfirmar('');
      } catch (erro) {
        console.error("❌ Erro ao atualizar:", erro);
        Alert.alert(textoAviso[8] || texto[19], textoAviso[8] || texto[19]);
      }
    } else {
      Alert.alert(textoAviso[2] || texto[20], texto[40]);
    }
  };

  const abrirModalPerfil = () => {
    setModalPerfilVisible(true);
  };

  const abrirModalDocumentos = async() => {
        const disponivel = await LocalAuthentication.hasHardwareAsync();
        const tipos = await LocalAuthentication.supportedAuthenticationTypesAsync();
    
        if (!disponivel || tipos.length === 0) {
          alert("Biometria não disponível no dispositivo.");
          return;
        }
    
        const resultado = await LocalAuthentication.authenticateAsync({
          promptMessage: "Confirme sua identidade",
          fallbackLabel: "Usar senha",
          cancelLabel: "Cancelar",
        });
    
        if (resultado.success) {
          setModalDocumentos(true);
        } else {
          alert("Não foi possível confirmar sua identidade.");
        }
  }

  const logout = async () => {
    try {
      const userId = await AsyncStorage.getItem("idUsers");

      // Limpar cache da foto
      try {
        const localPath = await AsyncStorage.getItem('localProfilePhoto');
        if (localPath) {
          await FileSystem.deleteAsync(localPath, { idempotent: true });
        }
        await AsyncStorage.removeItem('localProfilePhoto');
      } catch (error) {
        console.log('ℹ️ Não havia foto em cache para limpar');
      }

      setThemeMode("system");
      setTemaCor('padrao');

      await AsyncStorage.multiRemove([
        'idUsers',
        '@cadastro',
        '@cadastroDocumenos',
        '@endereçoUsuario',
        'localProfilePhoto',
        'isLoggedIn',
        'idAdmP'
      ]);

      await AsyncStorage.multiSet([['compacto', 'true']]);
      navigation.navigate('Splash');
    } catch (error) {
      console.error('❌ Erro no logout:', error);
      Alert.alert(textoAviso[8] || texto[19], texto[53]);
    }
  };

  // Renderização dos botões
  const renderBotao = ({ item }) => (
    <Pressable style={styles.botao} onPress={item.action}>
      <Ionicons name={item.icon} size={45} color={isDarkMode ? "#fff" : "#484848ff"} />
      <Text style={styles.botaoTexto}>{item.label}</Text>
    </Pressable>
  );

  // Componente de imagem com tratamento discreto de erros
  const RenderImagemPerfil = () => (
    <Pressable onPress={abrirModalPerfil} style={styles.foto}>
      {photoUri ? (
        <Image
          key={imageKey}
          source={{
            uri: photoUri,
            cache: 'reload'
          }}
          style={styles.fotoImage}
          onError={() => {
            // Tenta recarregar discretamente após um delay
            setTimeout(() => {
              recarregarImagemDiscreta();
            }, 2000);
          }}
          onLoad={() => {
            setImageError(false);
            setRetryCount(0); // Reseta o contador ao carregar com sucesso
          }}
        />
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={{ color: '#ffffffff', fontSize: 70 }}>
            {formData.nome ? formData.nome[0].toUpperCase() : 'U'}
          </Text>
        </View>
      )}
      {uploading && (
        <View style={styles.uploadOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </Pressable>
  );

  // UseEffects
  useEffect(() => {
    carregar();
  }, []);

  useEffect(() => {
    if (codigo.length === 5) {
      if (codigo === c) {
        setVerModalEmail(false);
        setModalE(2);
        setVerModalEmail(true);
      } else if (codigo.length === 5 && codigo !== c) {
        Alert.alert("Código incorreto", texto[33]);
        setCodigo('');
      }
    }
  }, [codigo, c]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregar();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const verificarMudancaUsuario = async () => {
      const currentUserId = await AsyncStorage.getItem("idUsers");
      if (currentUserId && currentUserId !== id) {
        carregar();
      }
    };

    const interval = setInterval(verificarMudancaUsuario, 2000);
    return () => clearInterval(interval);
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <View style={[styles.loadingContainer]}>
        <ActivityIndicator size="large" color={Colors[temaCor]} />
        <Text style={styles.loadingText}>{texto[18]}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header do Perfil */}
        <View style={styles.perfil}>
          <RenderImagemPerfil />
          <View style={styles.info}>
            <Text style={styles.infoNome}>{formData.nome}</Text>
            <Text style={styles.infoEmail}>{formData.email}</Text>
            <View style={styles.infoBots}>
              <Pressable style={styles.infoBtn} onPress={abrirModalPerfil}>
                <Text style={styles.infoBtnText}>{texto[42]}</Text>
              </Pressable>
              <Pressable style={styles.infoBtn} onPress={abrirModalDocumentos}>
                <Text style={styles.infoBtnText}>{texto[62]}</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Grid de Botões */}
        <View style={styles.botoes}>
          <FlatList
            data={botoes}
            renderItem={renderBotao}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            style={styles.lista}
          />
        </View>

        {/* Modal de Tema */}
        <Modal transparent={false} visible={verTema} animationType="fade">
          <View style={styles.modalTemaContainer}>
            <View style={styles.modalTemaTitulo}>
              <Pressable onPress={() => setVerTema(false)}>
                <Ionicons name="close" size={50} color={Colors[temaCor]} />
              </Pressable>
              <Text style={styles.modalTitulo} numberOfLines={1}>{texto[1]}</Text>
            </View>
            <Text style={styles.textTituloModal}>{texto[13]}</Text>
            <View style={styles.modalLinha}>
              <View style={[styles.modalTemaView, themeMode === 'system' && styles.select]}>
                <Pressable onPress={() => setThemeMode("system")} style={[styles.modalTema, { backgroundColor: cor == 'dark' ? '#313131ff' : '#fff' }]}>
                  <FontAwesome name="gear" size={50} color={Colors[temaCor]} />
                </Pressable>
                <Text numberOfLines={1} style={styles.modalTemaText}>{texto[9]}</Text>
              </View>
              <View style={[styles.modalTemaView, themeMode === 'light' && styles.select]}>
                <Pressable onPress={() => setThemeMode("light")} style={[styles.modalTema, { backgroundColor: '#fff' }]}>
                  <Ionicons name="sunny" size={60} color={Colors[temaCor]} />
                </Pressable>
                <Text numberOfLines={1} style={styles.modalTemaText}>{texto[10]}</Text>
              </View>
              <View style={[styles.modalTemaView, themeMode === 'dark' && styles.select]}>
                <Pressable onPress={() => setThemeMode("dark")} style={[styles.modalTema, { backgroundColor: '#313131ff' }]}>
                  <Ionicons name="moon" size={50} color={Colors[temaCor]} />
                </Pressable>
                <Text numberOfLines={1} style={styles.modalTemaText}>{texto[11]}</Text>
              </View>
            </View>
            <Text style={styles.textTituloModal}>{texto[14]}</Text>
            <FlatList
              data={cores}
              style={styles.flat}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable style={[styles.flatContainer, temaCor === item.cor && styles.select]} onPress={() => setTemaCor(item.cor)}>
                  <View style={[styles.flatCor, { backgroundColor: Colors[item.cor] }]} />
                  <Text style={styles.flatText}>
                    {texto[12]}: {item.nome}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </Modal>

        <Modal transparent={false} visible={modalDocumentos} animationType="slide">
          <View style={styles.modalDocumentosContainer}>
            {/* Header */}
            <View style={styles.modalDocumentosHeader}>
              <TouchableOpacity
                style={styles.modalDocumentosBackButton}
                onPress={() => setModalDocumentos(false)}
              >
                <Ionicons name="arrow-back" size={24} color={Colors[temaCor]} />
              </TouchableOpacity>
              <Text style={styles.modalDocumentosTitle}>Meus Documentos</Text>
              <View style={styles.modalHeaderSpacer} />
            </View>

            {/* Conteúdo */}
            <ScrollView style={styles.modalDocumentosContent} showsVerticalScrollIndicator={false}>
              {/* Card de Documentos */}
              <View style={styles.documentosSection}>
                <Text style={styles.documentosSectionTitle}>Documentos Cadastrados</Text>

                {!formData.cpfUsers && !formData.crmRneUsers && !formData.mercosulUsers && !formData.passaporteUsers ? (
                  <View style={styles.documentosVazio}>
                    <Ionicons name="document-outline" size={64} color={Colors[temaCor]} />
                    <Text style={styles.documentosVazioText}>Nenhum documento cadastrado</Text>
                    <Text style={styles.documentosVazioSubtext}>
                      Adicione seus documentos para verificar sua conta
                    </Text>
                  </View>
                ) : (
                  <>
                    {/* CPF */}
                    {formData.cpfUsers && (
                      <View style={styles.documentoCard}>
                        <View style={styles.documentoHeader}>
                          <View style={styles.documentoIconContainer}>
                            <Ionicons name="card" size={24} color={Colors[temaCor]} />
                          </View>
                          <View style={styles.documentoInfo}>
                            <Text style={styles.documentoName}>CPF</Text>
                            <Text style={styles.documentoNumber}>{formData.cpfUsers}</Text>
                          </View>
                          <View style={[styles.statusBadge, styles.statusVerified]}>
                            <Ionicons name="checkmark-circle" size={16} color="#fff" />
                            <Text style={styles.statusText}>Cadastrado</Text>
                          </View>
                        </View>
                        <View style={styles.documentoActions}>
{/*                           <TouchableOpacity style={styles.documentoActionButton}>
                            <Ionicons name="eye" size={18} color={Colors[temaCor]} />
                            <Text style={[styles.documentoActionText, { color: Colors[temaCor] }]}>Visualizar</Text>
                          </TouchableOpacity> */}
                        </View>
                      </View>
                    )}

                    {/* CRM/RNE */}
                    {formData.crmRneUsers && (
                      <View style={styles.documentoCard}>
                        <View style={styles.documentoHeader}>
                          <View style={styles.documentoIconContainer}>
                            <Ionicons name="medical" size={24} color={Colors[temaCor]} />
                          </View>
                          <View style={styles.documentoInfo}>
                            <Text style={styles.documentoName}>CRNM/RNE</Text>
                            <Text style={styles.documentoNumber}>{formData.crmRneUsers}</Text>
                          </View>
                          <View style={[styles.statusBadge, styles.statusVerified]}>
                            <Ionicons name="checkmark-circle" size={16} color="#fff" />
                            <Text style={styles.statusText}>Cadastrado</Text>
                          </View>
                        </View>
                        <View style={styles.documentoActions}>
{/*                           <TouchableOpacity style={styles.documentoActionButton}>
                            <Ionicons name="eye" size={18} color={Colors[temaCor]} />
                            <Text style={[styles.documentoActionText, { color: Colors[temaCor] }]}>Visualizar</Text>
                          </TouchableOpacity> */}
                        </View>
                      </View>
                    )}

                    {/* Mercosul */}
                    {formData.mercosulUsers && (
                      <View style={styles.documentoCard}>
                        <View style={styles.documentoHeader}>
                          <View style={styles.documentoIconContainer}>
                            <Ionicons name="globe" size={24} color={Colors[temaCor]} />
                          </View>
                          <View style={styles.documentoInfo}>
                            <Text style={styles.documentoName}>Registro Mercosul</Text>
                            <Text style={styles.documentoNumber}>{formData.mercosulUsers}</Text>
                          </View>
                          <View style={[styles.statusBadge, styles.statusVerified]}>
                            <Ionicons name="checkmark-circle" size={16} color="#fff" />
                            <Text style={styles.statusText}>Cadastrado</Text>
                          </View>
                        </View>
                        <View style={styles.documentoActions}>
{/*                           <TouchableOpacity style={styles.documentoActionButton}>
                            <Ionicons name="eye" size={18} color={Colors[temaCor]} />
                            <Text style={[styles.documentoActionText, { color: Colors[temaCor] }]}>Visualizar</Text>
                          </TouchableOpacity> */}
                        </View>
                      </View>
                    )}

                    {/* Passaporte */}
                    {formData.passaporteUsers && (
                      <View style={styles.documentoCard}>
                        <View style={styles.documentoHeader}>
                          <View style={styles.documentoIconContainer}>
                            <Ionicons name="airplane" size={24} color={Colors[temaCor]} />
                          </View>
                          <View style={styles.documentoInfo}>
                            <Text style={styles.documentoName}>Passaporte</Text>
                            <Text style={styles.documentoNumber}>{formData.passaporteUsers}</Text>
                          </View>
                          <View style={[styles.statusBadge, styles.statusVerified]}>
                            <Ionicons name="checkmark-circle" size={16} color="#fff" />
                            <Text style={styles.statusText}>Cadastrado</Text>
                          </View>
                        </View>
                      </View>
                    )}
                  </>
                )}
              </View>
            </ScrollView>
          </View>
        </Modal>

        {/* Modal de Idioma */}
        <ModalIdioma ver={ver} setVer={setVer} />

        {/* Modal de Verificação de Email/Senha */}
        <Modal
          visible={verModalEmail}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setVerModalEmail(false)}
        >
          {modalE == 0 ? (
            <View style={styles.modalContainer}>
              <View style={styles.modalLoadingContent}>
                <View style={styles.modalLoadingHeader}>
                  <Text style={styles.modalLoadingTitulo}>Enviando Código</Text>
                </View>
                <View style={styles.modalLoadingBody}>
                  <ActivityIndicator size="large" color={Colors[temaCor]} />
                  <Text style={styles.modalLoadingText}>Enviando código de verificação para seu email...</Text>
                </View>
              </View>
            </View>
          ) : modalE == 1 ? (
            <View style={styles.modalContainer}>
              <View style={styles.modalCodigoContent}>
                <View style={styles.modalCodigoHeader}>
                  <Pressable
                    onPress={() => setVerModalEmail(false)}
                    style={styles.modalCloseButton}
                  >
                    <Ionicons name="close" size={30} color={font} />
                  </Pressable>
                  <Text style={styles.modalCodigoTitulo}>Verificação</Text>
                  <View style={styles.modalHeaderSpacer} />
                </View>
                <View style={styles.modalCodigoBody}>
                  <View style={styles.codigoIconContainer}>
                    <Ionicons name="mail" size={50} color={Colors[temaCor]} />
                  </View>
                  <Text style={styles.codigoInstructionText}>
                    Digite o código de 5 dígitos enviado para seu email
                  </Text>
                  <TextInput
                    style={styles.codigoInput}
                    onChangeText={setCodigo}
                    value={codigo}
                    placeholder="00000"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    maxLength={5}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus={true}
                    textContentType="oneTimeCode"
                    textAlign="center"
                  />
                  {codigo.length === 5 && codigo !== c && (
                    <Text style={styles.codigoErrorText}>Código incorreto!</Text>
                  )}
                  <View style={styles.codigoButtonContainer}>
                    <Pressable
                      style={styles.codigoCancelButton}
                      onPress={() => setVerModalEmail(false)}
                    >
                      <Text style={styles.codigoCancelButtonText}>Cancelar</Text>
                    </Pressable>
                    <Pressable
                      style={[
                        styles.codigoVerifyButton,
                        codigo.length !== 5 && styles.codigoButtonDisabled
                      ]}
                      onPress={() => {
                        if (codigo === c) {
                          setModalE(2);
                        }
                      }}
                      disabled={codigo.length !== 5}
                    >
                      <View style={styles.codigoButtonGradient}>
                        <Ionicons name="checkmark" size={20} color="#fff" />
                        <Text style={styles.codigoVerifyButtonText}>Verificar</Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.modalContainer}>
              <View style={styles.modalSenhaContent}>
                <View style={styles.modalSenhaHeader}>
                  <Pressable
                    onPress={() => setVerModalEmail(false)}
                    style={styles.modalCloseButton}
                  >
                    <Ionicons name="close" size={30} color={font} />
                  </Pressable>
                  <Text style={styles.modalSenhaTitulo}>Trocar Senha</Text>
                  <View style={styles.modalHeaderSpacer} />
                </View>
                <View style={styles.modalSenhaBody}>
                  <View style={styles.senhaInputContainer}>
                    <Ionicons name="lock-closed" size={24} color={Colors[temaCor]} style={styles.inputIcon} />
                    <TextInput
                      style={styles.senhaInput}
                      onChangeText={setSenhaNova}
                      value={senhaNova}
                      placeholder="Nova senha"
                      placeholderTextColor="#999"
                      maxLength={8}
                      secureTextEntry={true}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                  <View style={styles.senhaInputContainer}>
                    <Ionicons name="lock-closed" size={24} color={Colors[temaCor]} style={styles.inputIcon} />
                    <TextInput
                      style={styles.senhaInput}
                      onChangeText={setSenhaConfirmar}
                      value={senhaConfirmar}
                      placeholder="Confirmar senha"
                      placeholderTextColor="#999"
                      maxLength={8}
                      secureTextEntry={true}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                  {senhaNova && senhaConfirmar && senhaNova !== senhaConfirmar && (
                    <Text style={styles.senhaErrorText}>As senhas não coincidem!</Text>
                  )}
                  <Pressable
                    style={[
                      styles.senhaConfirmButton,
                      (!senhaNova || !senhaConfirmar || senhaNova !== senhaConfirmar) && styles.senhaButtonDisabled
                    ]}
                    onPress={verificarSenha}
                    disabled={!senhaNova || !senhaConfirmar || senhaNova !== senhaConfirmar}
                  >
                    <LinearGradient
                      colors={['#6247AA', '#856bccff']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.senhaButtonGradient}
                    >
                      <Ionicons name="checkmark" size={20} color="#fff" />
                      <Text style={styles.senhaButtonText}>Confirmar Nova Senha</Text>
                    </LinearGradient>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        </Modal>

        {/* Modal do Perfil */}
        <Modal
          visible={modalPerfilVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalPerfilVisible(false)}
        >
          <View style={styles.modalPerfilOverlay}>
            <View style={styles.modalPerfilContainer}>
              <View style={styles.modalPerfilHeader}>
                <Text style={styles.modalPerfilTitle}>{texto[42]}</Text>
                <TouchableOpacity style={styles.modalPerfilCloseButton} onPress={() => setModalPerfilVisible(false)}>
                  <Ionicons name="close" size={24} color={isDarkMode ? "#fff" : "#000"} />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalPerfilContent} showsVerticalScrollIndicator={false}>
                <View style={styles.modalFotoContainer}>
                  {photoUri ? (
                    <Image
                      source={{
                        uri: photoUri,
                        cache: 'reload'
                      }}
                      style={styles.modalFoto}
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <View style={styles.placeholderContainer}>
                      <Text style={styles.placeholderText}>
                        {formData.nome ? formData.nome[0].toUpperCase() : 'U'}
                      </Text>
                    </View>
                  )}
                  <TouchableOpacity style={styles.modalFotoEditButton} onPress={pickImageFromGallery}>
                    <Ionicons name="camera" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View style={styles.modalInfoContainer}>
                  <View style={styles.modalInfoItem}>
                    <Ionicons name="person" size={20} color={Colors[temaCor]} />
                    <View style={styles.modalInfoText}>
                      <Text style={styles.modalInfoLabel}>{texto[44]}</Text>
                      <Text style={styles.modalInfoValue}>{formData.nome}</Text>
                    </View>
                  </View>
                  <View style={styles.modalInfoItem}>
                    <Ionicons name="mail" size={20} color={Colors[temaCor]} />
                    <View style={styles.modalInfoText}>
                      <Text style={styles.modalInfoLabel}>{texto[45]}</Text>
                      <Text style={styles.modalInfoValue}>{formData.email}</Text>
                    </View>
                  </View>
                  <View style={styles.modalInfoItem}>
                    <Ionicons name="call" size={20} color={Colors[temaCor]} />
                    <View style={styles.modalInfoText}>
                      <Text style={styles.modalInfoLabel}>{texto[46]}</Text>
                      <Text style={styles.modalInfoValue}>{formData.telefone || texto[47]}</Text>
                    </View>
                  </View>
                  {local && (
                    <View style={styles.modalInfoItem}>
                      <Ionicons name="location" size={20} color={Colors[temaCor]} />
                      <View style={styles.modalInfoText}>
                        <Text style={styles.modalInfoLabel}>{texto[60]}</Text>
                        <Text style={styles.modalInfoValue}>
                          {`${local.logradouro}, ${local.numero}\n${local.bairro}\n${local.cidade} - ${local.estado}\n${local.cep}`}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </ScrollView>
              <View style={styles.modalActionsContainer}>
                <TouchableOpacity
                  style={styles.modalEditButton}
                  onPress={() => {
                    setModalPerfilVisible(false);
                    navigation.navigate('AtualizarPerfil');
                  }}
                >
                  <Ionicons name="create" size={20} color="#fff" />
                  <Text style={styles.modalEditButtonText}>{texto[8]}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalDeleteButton} onPress={excluirConta}>
                  <MaterialIcons name="delete" size={20} color="#fff" />
                  <Text style={styles.modalDeleteButtonText}>{texto[49]}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal de Termos de Uso */}
        <Modal
          visible={modalTermosVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalTermosVisible(false)}
        >
          <View style={styles.modalDocumentosOverlay}>
            <View style={styles.modalDocumentosContainer}>
              <View style={styles.modalDocumentosHeader}>
                <Text style={styles.modalDocumentosTitle}>{termos[0]}</Text>
                <TouchableOpacity
                  style={styles.modalDocumentosCloseButton}
                  onPress={() => setModalTermosVisible(false)}
                >
                  <Ionicons name="close" size={24} color={isDarkMode ? "#fff" : "#000"} />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalDocumentosContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.modalDocumentosText}>
                  <Text style={styles.modalDocumentosSectionTitle}>{termos[1]}{"\n\n"}</Text>
                  {termos[2]}{"\n"}
                  {termos[3]}{"\n\n"}

                  <Text style={styles.modalDocumentosSectionTitle}>{termos[4]}{"\n\n"}</Text>
                  {termos[5]}{"\n"}
                  {termos[6]}{"\n\n"}

                  <Text style={styles.modalDocumentosSectionTitle}>{termos[7]}{"\n\n"}</Text>
                  {termos[8]}{"\n"}
                  {termos[9]}{"\n\n"}

                  <Text style={styles.modalDocumentosSectionTitle}>{termos[10]}{"\n\n"}</Text>
                  {termos[11]}{"\n"}
                  {termos[12]}{"\n\n"}

                  <Text style={styles.modalDocumentosSectionTitle}>{termos[13]}{"\n\n"}</Text>
                  {termos[14]}{"\n"}
                  {termos[15]}{"\n\n"}

                  <Text style={styles.modalDocumentosSectionTitle}>{termos[16]}{"\n\n"}</Text>
                  {termos[17]}{"\n"}
                  {termos[18]}{"\n\n"}

                  <Text style={styles.modalDocumentosSectionTitle}>{termos[19]}{"\n\n"}</Text>
                  {termos[20]}{"\n\n"}


                  <Text style={styles.modalDocumentosSectionTitle}>{termos[21]}{"\n\n"}</Text>
                  {termos[22]}{"\n\n"}
                </Text>
              </ScrollView>
              <View style={styles.modalDocumentosActions}>
                <TouchableOpacity
                  style={styles.modalDocumentosButton}
                  onPress={() => setModalTermosVisible(false)}
                >
                  <Text style={styles.modalDocumentosButtonText}>{termos[23]}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal de Política de Privacidade */}
        <Modal
          visible={modalPrivacidadeVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalPrivacidadeVisible(false)}
        >
          <View style={styles.modalDocumentosOverlay}>
            <View style={styles.modalDocumentosContainer}>
              <View style={styles.modalDocumentosHeader}>
                <Text style={styles.modalDocumentosTitle}>{privacidade[0]}</Text>
                <TouchableOpacity
                  style={styles.modalDocumentosCloseButton}
                  onPress={() => setModalPrivacidadeVisible(false)}
                >
                  <Ionicons name="close" size={24} color={isDarkMode ? "#fff" : "#000"} />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalDocumentosContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.modalDocumentosText}>
                  <Text style={styles.modalDocumentosSectionTitle}>{privacidade[1]}{"\n\n"}</Text>
                  {privacidade[2]}{"\n"}
                  {privacidade[3]}{"\n\n"}

                  <Text style={styles.modalDocumentosSectionTitle}>{privacidade[4]}{"\n\n"}</Text>
                  {privacidade[5]}{"\n"}
                  {privacidade[6]}{"\n"}
                  {privacidade[7]}{"\n"}
                  {privacidade[8]}{"\n"}
                  {privacidade[9]}{"\n\n"}

                  <Text style={styles.modalDocumentosSectionTitle}>{privacidade[10]}{"\n\n"}</Text>
                  {privacidade[11]}{"\n"}
                  {privacidade[12]}{"\n"}
                  {privacidade[13]}{"\n"}
                  {privacidade[14]}{"\n\n"}

                  <Text style={styles.modalDocumentosSectionTitle}>{privacidade[15]}{"\n\n"}</Text>
                  {privacidade[16]}{"\n"}
                  {privacidade[17]}{"\n\n"}

                  <Text style={styles.modalDocumentosSectionTitle}>{privacidade[18]}{"\n\n"}</Text>
                  {privacidade[19]}{"\n"}
                  {privacidade[20]}{"\n"}
                  {privacidade[21]}{"\n"}
                  {privacidade[22]}{"\n\n"}

                  <Text style={styles.modalDocumentosSectionTitle}>{privacidade[23]}{"\n\n"}</Text>
                  {privacidade[24]}{"\n"}
                  {privacidade[25]}{"\n\n"}

                  <Text style={styles.modalDocumentosSectionTitle}>{privacidade[26]}{"\n\n"}</Text>
                  {privacidade[27]}{"\n"}
                  {privacidade[28]}{"\n\n"}

                  <Text style={styles.modalDocumentosSectionTitle}>{privacidade[29]}{"\n\n"}</Text>
                  {privacidade[30]}{"\n"}
                  {privacidade[31]}{"\n"}
                  {privacidade[32]}{"\n\n"}
                </Text>
              </ScrollView>
              <View style={styles.modalDocumentosActions}>
                <TouchableOpacity
                  style={styles.modalDocumentosButton}
                  onPress={() => setModalPrivacidadeVisible(false)}
                >
                  <Text style={styles.modalDocumentosButtonText}>{privacidade[33]}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <BubbleArea />
    </View>
  );
}