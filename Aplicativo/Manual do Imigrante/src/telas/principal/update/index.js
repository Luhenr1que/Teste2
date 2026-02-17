import React, { useState, useRef, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, TextInput, View, Text, Pressable, Image, Alert, Keyboard, Dimensions, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIdioma } from '../../../../idiomaContext';
import { useTheme } from '../../../../themeContext';
import ModalIdioma from '../../../../trocarIdioma';
import { useApi } from '../../../../CRUD';
import { withSpring, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { Colors } from '../../../../themeContext';
import { Ionicons } from '@expo/vector-icons';
import getStyles from "./style";

export default function AtualizarPerfil({ navigation }) {
  const { isDarkMode, temaCor } = useTheme();
  const styles = getStyles(isDarkMode);

  const { atualizarPerfil, carregarDadosUsuario } = useApi();

  const [focusedInput, setFocusedInput] = useState(null);
  const [ver, setVer] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    nome: "", email: "", telefone: "",
  });

  const corPrincipal = Colors?.[temaCor] || "#4F46E5"; // fallback seguro
  const corSecundaria = corPrincipal + "CC";

  const scrollRef = useRef(null);
  const inputNomeRef = useRef(null);
  const inputEmailRef = useRef(null);
  const inputTelefoneRef = useRef(null);

  const screenHeight = Dimensions.get('window').height;
  const [currentScrollY, setCurrentScrollY] = useState(0);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const { textos } = useIdioma();
  const texto = textos?.cadastro || [];
  const textoAviso = textos?.aviso || [];

  useEffect(() => {
    carregarDadosDoUsuario();
  }, []);

  // Labels começam 20 pixels mais baixo e sobem apenas 10 pixels
  const labelPosNome = useSharedValue(20);
  const labelPosEmail = useSharedValue(20);
  const labelPosTelefone = useSharedValue(20);

  const animatedLabelNome = useAnimatedStyle(() => ({
    transform: [{ translateY: labelPosNome.value }],
  }));
  const animatedLabelEmail = useAnimatedStyle(() => ({
    transform: [{ translateY: labelPosEmail.value }],
  }));
  const animatedLabelTelefone = useAnimatedStyle(() => ({
    transform: [{ translateY: labelPosTelefone.value }],
  }));

  const atualizar = (type, text) => setFormData(prev => ({ ...prev, [type]: text }));

  const formatarTelefone = (text) => {
    const temp = text.replace(/\D/g, '');

    let formatado = temp;

    if (text.startsWith('+')) {
      if (temp.length > 2 && temp.length <= 4) {
        formatado = '+' + temp.slice(0, 2) + ' (' + temp.slice(2);
      } else if (temp.length > 4 && temp.length <= 7) {
        formatado = '+' + temp.slice(0, 2) + ' (' + temp.slice(2, 4) + ') ' + temp.slice(4);
      } else if (temp.length > 7 && temp.length <= 11) {
        formatado = '+' + temp.slice(0, 2) + ' (' + temp.slice(2, 4) + ') ' + temp.slice(4, 9) + '-' + temp.slice(9);
      } else if (temp.length > 11) {
        formatado = '+' + temp.slice(0, 2) + ' (' + temp.slice(2, 4) + ') ' + temp.slice(4, 9) + '-' + temp.slice(9, 13);
      } else if (temp.length > 0) {
        formatado = '+' + temp;
      }
    } else {
      if (temp.length === 0) {
        formatado = '+55';
      } else if (temp.length <= 2) {
        formatado = '+' + temp;
      } else if (temp.length > 2 && temp.length <= 4) {
        formatado = '+' + temp.slice(0, 2) + ' (' + temp.slice(2);
      } else if (temp.length > 4 && temp.length <= 9) {
        formatado = '+' + temp.slice(0, 2) + ' (' + temp.slice(2, 4) + ') ' + temp.slice(4);
      } else if (temp.length > 9 && temp.length <= 13) {
        formatado = '+' + temp.slice(0, 2) + ' (' + temp.slice(2, 4) + ') ' + temp.slice(4, 9) + '-' + temp.slice(9);
      } else if (temp.length > 13) {
        formatado = '+' + temp.slice(0, 2) + ' (' + temp.slice(2, 4) + ') ' + temp.slice(4, 9) + '-' + temp.slice(9, 13);
      }
    }

    atualizar("telefone", formatado);
  }

  const scrollToInput = (ref) => {
    setTimeout(() => {
      if (!ref.current || !scrollRef.current) return;

      ref.current.measureInWindow((x, y, width, height) => {
        const offset = -200;
        const targetY = y + height / 2 - screenHeight / 2 - offset;
        const scrollToY = targetY > 0 ? targetY : 0;

        const finalScrollY = scrollToY > currentScrollY ? scrollToY : currentScrollY;

        scrollRef.current.scrollTo({ y: finalScrollY, animated: true });
      });
    }, 0);
  };

  const handleFocus = (fieldName, labelPos, ref) => {
    if (labelPos.value !== -10) {
      labelPos.value = withSpring(-10); // Sobe apenas 10 pixels
    }

    if (focusedInput !== fieldName) {
      scrollToInput(ref);
      setFocusedInput(fieldName);
    }
  };

  const handleBlur = (labelPos, value) => {
    if (!value) {
      labelPos.value = withSpring(20); // Volta para 20 pixels se estiver vazio
    }
    setFocusedInput(null);
  };

  const validarCampos = () => {
    const { nome, email, telefone } = formData;

    if (!nome || nome.length < 2) {
      Alert.alert('⚠️', 'Por favor, insira um nome válido');
      return false;
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
      Alert.alert('⚠️', 'Por favor, insira um email válido');
      return false;
    }

    if (!telefone || telefone.length < 14) {
      Alert.alert('⚠️', 'Por favor, insira um telefone válido');
      return false;
    }

    return true;
  };

  const carregarDadosDoUsuario = async () => {
    try {
      setLoading(true);
      const id = await AsyncStorage.getItem("idUsers");

      if (!id) {
        Alert.alert('❌ Erro', 'ID do usuário não encontrado');
        setLoading(false);
        return;
      }

      const dadosUsuario = await carregarDadosUsuario(id);

      if (dadosUsuario) {
        // Quando os dados são carregados, os labels sobem apenas 10 pixels
        if (dadosUsuario.nomeUsers) labelPosNome.value = withSpring(-10);
        if (dadosUsuario.emailUsers) labelPosEmail.value = withSpring(-10);
        if (dadosUsuario.telefoneUsers) labelPosTelefone.value = withSpring(-10);

        setFormData({
          nome: dadosUsuario.nomeUsers || "",
          email: dadosUsuario.emailUsers || "",
          telefone: dadosUsuario.telefoneUsers || ""
        });
      }
    } catch (error) {
      console.log("Erro ao carregar dados:", error);
      Alert.alert('❌ Erro', 'Não foi possível carregar os dados do usuário');
    } finally {
      setLoading(false);
    }
  };

  const salvarAlteracoes = async () => {
    if (!validarCampos()) return;

    try {
      setLoading(true);
      const id = await AsyncStorage.getItem("idUsers");
      if (!id) {
        Alert.alert('❌ Erro', 'ID do usuário não encontrado');
        setLoading(false);
        return;
      }

      await atualizarPerfil(id, formData.nome, formData.email, formData.telefone);

      Alert.alert('✅ Sucesso', 'Dados atualizados com sucesso!');

      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (error) {
      Alert.alert('❌ Erro', 'Erro ao salvar alterações: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      if (focusedInput === 'nome') {
        scrollToInput(inputNomeRef);
      } else if (focusedInput === 'email') {
        scrollToInput(inputEmailRef);
      } else if (focusedInput === 'telefone') {
        scrollToInput(inputTelefoneRef);
      }
    });

    return () => {
      keyboardDidShowListener.remove();
    };
  }, [focusedInput]);

  if (loading) {
    return (
      <View style={[styles.loadingContainer]}>
        <ActivityIndicator
          size="large"
          color={corPrincipal}
        />
        <Text style={styles.loadingText}>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </Pressable>

        <Text style={styles.headerTitle}>{texto[10] || "Atualizar Perfil"}</Text>

        <Pressable style={styles.languageButton} onPress={() => setVer(true)}>
          <Ionicons name="language" size={28} color="#fff" />
        </Pressable>
      </View>

      <ModalIdioma ver={ver} setVer={setVer} />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" keyboardVerticalOffset={0}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          onScroll={event => setCurrentScrollY(event.nativeEvent.contentOffset.y)}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            {/* Nome */}
            <View style={styles.inputContainer}>
              <Animated.Text style={[styles.inputLabel, animatedLabelNome]}>
                {texto[1] || "Nome"}
              </Animated.Text>
              <TextInput
                ref={inputNomeRef}
                style={styles.textInput}
                onFocus={() => handleFocus('nome', labelPosNome, inputNomeRef)}
                onBlur={() => handleBlur(labelPosNome, formData.nome)}
                onChangeText={(text) => atualizar('nome', text)}
                value={formData.nome}
                placeholder="Digite seu nome completo"
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
              />
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
              <Animated.Text style={[styles.inputLabel, animatedLabelEmail]}>
                {texto[2] || "Email"}
              </Animated.Text>
              <TextInput
                ref={inputEmailRef}
                style={styles.textInput}
                onFocus={() => handleFocus('email', labelPosEmail, inputEmailRef)}
                onBlur={() => handleBlur(labelPosEmail, formData.email)}
                onChangeText={(text) => atualizar('email', text.toLowerCase())}
                value={formData.email}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="seu@email.com"
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
              />
            </View>

            {/* Telefone */}
            <View style={styles.inputContainer}>
              <Animated.Text style={[styles.inputLabel, animatedLabelTelefone]}>
                {texto[9] || "Telefone"}
              </Animated.Text>
              <TextInput
                ref={inputTelefoneRef}
                style={styles.textInput}
                onFocus={() => handleFocus('telefone', labelPosTelefone, inputTelefoneRef)}
                onBlur={() => handleBlur(labelPosTelefone, formData.telefone)}
                onChangeText={formatarTelefone}
                value={formData.telefone}
                keyboardType="phone-pad"
                maxLength={20}
                placeholder="+55 (00) 00000-0000"
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
              />
            </View>

            <Pressable
              onPress={salvarAlteracoes}
              style={styles.saveButton}
              disabled={loading}
            >
              <LinearGradient
                colors={[corPrincipal, corSecundaria]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.gradient, loading && { opacity: 0.7 }]}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <View style={styles.buttonContent}>
                    <Ionicons name="save-outline" size={24} color="#fff" />
                    <Text style={styles.buttonText}>{texto[11] || "Salvar Alterações"}</Text>
                  </View>
                )}
              </LinearGradient>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}