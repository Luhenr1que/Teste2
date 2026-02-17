import React, { useState, useRef, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, TextInput, View, Text, Pressable, Image, Alert, Keyboard, Dimensions, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIdioma } from '../../../../idiomaContext';
import { useTheme } from '../../../../themeContext';
import ModalIdioma from '../../../../trocarIdioma';
import { useApi } from '../../../../CRUD';

import getStyles from "./style";
import { withSpring, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { Colors } from '../../../../themeContext';
import { Ionicons } from '@expo/vector-icons';

export default function Logradouro({ navigation }) {
  const { isDarkMode, temaCor } = useTheme();
  const styles = getStyles(isDarkMode);

  const { atualizarEndereco, carregarDadosUsuario } = useApi()

  const [focusedInput, setFocusedInput] = useState(null);
  const [ver, setVer] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    cep: "", logradouro: "", numero: "",
    bairro: "", cidade: "", estado: ""
  });

  const corPrincipal = Colors?.[temaCor] || "#4F46E5"; // fallback seguro
  const corSecundaria = corPrincipal + "CC";

  const scrollRef = useRef(null);
  const inputCepRef = useRef(null);
  const inputNumeroRef = useRef(null);
  const inputLogradouroRef = useRef(null);
  const inputBairroRef = useRef(null);
  const inputCidadeRef = useRef(null);

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
  const texto = textos?.endereco || [];
  const textoAviso = textos?.enderecoAviso || [];

  useEffect(() => {
    carregarDadosDoUsuario();
  }, []);

  const labelPosCep = useSharedValue(0);
  const labelPosLogradouro = useSharedValue(0);
  const labelPosNumero = useSharedValue(0);
  const labelPosBairro = useSharedValue(0);
  const labelPosCidade = useSharedValue(0);

  const animatedLabelCep = useAnimatedStyle(() => ({
    transform: [{ translateY: labelPosCep.value }],
  }));
  const animatedLabelLogradouro = useAnimatedStyle(() => ({
    transform: [{ translateY: labelPosLogradouro.value }],
  }));
  const animatedLabelNumero = useAnimatedStyle(() => ({
    transform: [{ translateY: labelPosNumero.value }],
  }));
  const animatedLabelBairro = useAnimatedStyle(() => ({
    transform: [{ translateY: labelPosBairro.value }],
  }));
  const animatedLabelCidade = useAnimatedStyle(() => ({
    transform: [{ translateY: labelPosCidade.value }],
  }));

  const atualizar = (type, text) => setFormData(prev => ({ ...prev, [type]: text }));

  // Formatar CEP
  const formatarCep = (text) => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = cleaned;

    if (cleaned.length > 5) {
      formatted = cleaned.slice(0, 5) + '-' + cleaned.slice(5, 8);
    }

    atualizar("cep", formatted);

    if (formatted.length === 9) {
      buscarCep(formatted);
    }
  };

  // Buscar dados do CEP na API ViaCEP
  const buscarCep = async (cep) => {
    try {
      setLoadingCep(true);
      const cleanedCep = cep.replace(/\D/g, '');

      if (cleanedCep.length !== 8) return;

      const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        Alert.alert('❌', textos.enderecoAviso[7]);
        return;
      }

      setFormData(prev => ({
        ...prev,
        logradouro: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: data.uf || ''
      }));

      if (inputNumeroRef.current) {
        inputNumeroRef.current.focus();
      }

    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      Alert.alert('❌', textos.enderecoAviso[8]);
    } finally {
      setLoadingCep(false);
    }
  };

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
    if (labelPos.value !== -25) {
      labelPos.value = withSpring(-25);
    }

    if (focusedInput !== fieldName) {
      scrollToInput(ref);
      setFocusedInput(fieldName);
    }
  };

  const handleBlur = (labelPos, value) => {
    if (!value) {
      labelPos.value = withSpring(0);
    }
    setFocusedInput(null);
  };

  const validarCampos = () => {
    const { cep, logradouro, numero, bairro, cidade } = formData;

    if (!cep || cep.length !== 9) {
      Alert.alert('⚠️', textos.enderecoAviso[0]);
      return false;
    }

    if (!logradouro || logradouro.length < 3) {
      Alert.alert('⚠️', textos.enderecoAviso[1]);
      return false;
    }

    if (!numero || numero.length < 1) {
      Alert.alert('⚠️', textos.enderecoAviso[2]);
      return false;
    }

    if (!bairro || bairro.length < 2) {
      Alert.alert('⚠️', textos.enderecoAviso[3]);
      return false;
    }

    if (!cidade || cidade.length < 2) {
      Alert.alert('⚠️', textos.enderecoAviso[4]);
      return false;
    }

    return true;
  };

  const salvarAlteracoes = async () => {
    if (!validarCampos()) return;

    try {
      setLoading(true);

      const id = await AsyncStorage.getItem("idUsers");

      if (!id) {
        Alert.alert("❌", "ID do usuário não encontrado.");
        setLoading(false);
        return;
      }

      await atualizarEndereco(id, {
        lograUsers: formData.logradouro,
        numeroUsers: formData.numero,
        cepUsers: formData.cep,
        bairroUsers: formData.bairro,
        cidadeUsers: formData.cidade,
        estadoUsers: formData.estado,
      });

      await AsyncStorage.setItem("@endereçoUsuario", JSON.stringify(formData));

      Alert.alert("✅", textos.enderecoAviso[5]);

      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (error) {
      console.log("❌ Erro ao salvar dados:", error);
      Alert.alert("❌", textos.enderecoAviso[6]);
    } finally {
      setLoading(false);
    }
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
        if (dadosUsuario.cepUsers) labelPosCep.value = withSpring(-25);
        if (dadosUsuario.lograUsers) labelPosLogradouro.value = withSpring(-25);
        if (dadosUsuario.numeroUsers) labelPosNumero.value = withSpring(-25);
        if (dadosUsuario.bairroUsers) labelPosBairro.value = withSpring(-25);
        if (dadosUsuario.cidadeUsers) labelPosCidade.value = withSpring(-25);

        setFormData({
          cep: dadosUsuario.cepUsers || "",
          logradouro: dadosUsuario.lograUsers || "",
          numero: dadosUsuario.numeroUsers || "",
          bairro: dadosUsuario.bairroUsers || "",
          cidade: dadosUsuario.cidadeUsers || "",
          estado: dadosUsuario.estadoUsers || ""
        });
      }

      const enderecoLocal = await AsyncStorage.getItem("@endereçoUsuario");
      if (enderecoLocal) {
        const enderecoData = JSON.parse(enderecoLocal);
        setFormData(prev => ({ ...prev, ...enderecoData }));
      }

    } catch (error) {
      console.log("❌ Erro ao carregar dados:", error);
      Alert.alert('❌ Erro', 'Não foi possível carregar os dados do endereço');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      if (focusedInput === 'cep') {
        scrollToInput(inputCepRef);
      } else if (focusedInput === 'numero') {
        scrollToInput(inputNumeroRef);
      } else if (focusedInput === 'logradouro') {
        scrollToInput(inputLogradouroRef);
      } else if (focusedInput === 'bairro') {
        scrollToInput(inputBairroRef);
      } else if (focusedInput === 'cidade') {
        scrollToInput(inputCidadeRef);
      }
    });

    return () => {
      keyboardDidShowListener.remove();
    };
  }, [focusedInput]);

  if (loading) {
    return (
      <View style={[styles.loadingContainer]}>
        <ActivityIndicator size="large" color={Colors[temaCor]} />
        <Text style={styles.loadingText}>Carregando endereço...</Text>
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

        <Text style={styles.headerTitle}>{texto[0]}</Text>

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
            {/* CEP */}
            <View style={styles.inputContainer}>
              <Animated.Text style={[styles.inputLabel, animatedLabelCep]}>
                {texto[1]}
              </Animated.Text>
              <TextInput
                ref={inputCepRef}
                style={styles.textInput}
                onFocus={() => handleFocus('cep', labelPosCep, inputCepRef)}
                onBlur={() => handleBlur(labelPosCep, formData.cep)}
                onChangeText={formatarCep}
                value={formData.cep}
                keyboardType="numeric"
                maxLength={9}
                placeholder="00000-000"
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
              />
              {loadingCep && (
                <View style={styles.loadingCepContainer}>
                  <ActivityIndicator size="small" color={Colors[temaCor]} />
                  <Text style={styles.loadingCepText}>Buscando CEP...</Text>
                </View>
              )}
            </View>

            {/* Logradouro */}
            <View style={styles.inputContainer}>
              <Animated.Text style={[styles.inputLabel, animatedLabelLogradouro]}>
                {texto[2]}
              </Animated.Text>
              <TextInput
                style={styles.textInput}
                ref={inputLogradouroRef}
                onFocus={() => handleFocus('logradouro', labelPosLogradouro, inputLogradouroRef)}
                onBlur={() => handleBlur(labelPosLogradouro, formData.logradouro)}
                onChangeText={(text) => atualizar('logradouro', text)}
                value={formData.logradouro}
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
              />
            </View>

            {/* Número e Bairro */}
            <View style={styles.rowContainer}>
              {/* Número */}
              <View style={[styles.inputContainer, styles.smallInput]}>
                <Animated.Text style={[styles.inputLabel, animatedLabelNumero]}>
                  {texto[3]}
                </Animated.Text>
                <TextInput
                  ref={inputNumeroRef}
                  style={styles.textInput}
                  onFocus={() => handleFocus('numero', labelPosNumero, inputNumeroRef)}
                  onBlur={() => handleBlur(labelPosNumero, formData.numero)}
                  onChangeText={(text) => atualizar('numero', text)}
                  value={formData.numero}
                  keyboardType="numeric"
                  placeholderTextColor={isDarkMode ? '#888' : '#999'}
                />
              </View>

              {/* Bairro */}
              <View style={[styles.inputContainer, styles.largeInput]}>
                <Animated.Text style={[styles.inputLabel, animatedLabelBairro]}>
                  {texto[4]}
                </Animated.Text>
                <TextInput
                  style={styles.textInput}
                  ref={inputBairroRef}
                  onFocus={() => handleFocus('bairro', labelPosBairro, inputBairroRef)}
                  onBlur={() => handleBlur(labelPosBairro, formData.bairro)}
                  onChangeText={(text) => atualizar('bairro', text)}
                  value={formData.bairro}
                  placeholderTextColor={isDarkMode ? '#888' : '#999'}
                />
              </View>
            </View>

            {/* Cidade */}
            <View style={styles.inputContainer}>
              <Animated.Text style={[styles.inputLabel, animatedLabelCidade]}>
                {texto[5]}
              </Animated.Text>
              <TextInput
                style={styles.textInput}
                ref={inputCidadeRef}
                onFocus={() => handleFocus('cidade', labelPosCidade, inputCidadeRef)}
                onBlur={() => handleBlur(labelPosCidade, formData.cidade)}
                onChangeText={(text) => atualizar('cidade', text)}
                value={formData.cidade}
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
              />
            </View>

            {/* Estado (preenchido automaticamente) */}
            {formData.estado && (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  {texto[6]}
                </Text>
                <TextInput
                  style={[styles.textInput, styles.disabledInput]}
                  value={formData.estado}
                  editable={false}
                  placeholderTextColor={isDarkMode ? '#888' : '#999'}
                />
              </View>
            )}

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