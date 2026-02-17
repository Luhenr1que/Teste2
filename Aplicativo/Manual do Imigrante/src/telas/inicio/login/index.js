import React, { useState, useRef, useEffect } from 'react';
import { View, KeyboardAvoidingView, ScrollView, TextInput, Text, Pressable, Alert, Image, Dimensions, Keyboard } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import ModalIdioma from "../../../../trocarIdioma";
import { useIdioma } from '../../../../idiomaContext';
import { useTheme } from '../../../../themeContext';
import getStyles from './style';
import { useApi } from '../../../../CRUD';
import { Ionicons } from '@expo/vector-icons';

import { withSpring, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

export default function Login({ navigation }) {
  const [focusedInput, setFocusedInput] = useState(null);
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);

  const scrollRef = useRef(null);
  const inputEmailRef = useRef(null);
  const inputSenhaRef = useRef(null);

  const { verificarConta } = useApi()

  const screenHeight = Dimensions.get('window').height;

  const [ver, setVer] = useState(false);
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [currentScrollY, setCurrentScrollY] = useState(0);

  const borda = '#713205';

  const labelPosEmail = useSharedValue(0);
  const labelPosSenha = useSharedValue(0);

  const animatedLabelEmail = useAnimatedStyle(() => ({
    transform: [{ translateY: labelPosEmail.value }],
  }));

  const animatedLabelSenha = useAnimatedStyle(() => ({
    transform: [{ translateY: labelPosSenha.value }],
  }));

  const cad = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

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

  const { textos } = useIdioma();
  const texto = textos?.login || [];
  const textoAviso = textos?.aviso || [];

  const go = async () => {
    if (!formData.email || !formData.senha) {
      Alert.alert('⚠️ ' + (textoAviso[8] || ''), textoAviso[5] || '');
      return;
    }

    try {
      // Chama a função de verificação
      const resposta = await verificarConta(formData.email, formData.senha);

      // Verifica se a resposta foi bem-sucedida baseada no 'message'
      if (resposta && resposta.data && resposta.data.message === true) {
        console.log("Login realizado com sucesso!", resposta.data.usuario);
        console.log("✅ ID do usuário salvo APENAS em idUsers:", resposta.data.usuario.idUsers.toString());


        await AsyncStorage.setItem('idUsers', resposta.data.usuario.idUsers.toString());
        await AsyncStorage.setItem('isLoggedIn', 'true');

        navigation.navigate('Main')
      } else {
        // Tratar caso de credenciais inválidas
        Alert.alert('⚠️ ' + (textoAviso[8] || ''), textoAviso[7] || '');
      }


    } catch (error) {
      console.log("Erro ao acessar dados:", error);
      Alert.alert('❌ Erro', 'Erro ao acessar dados. Tente novamente.');
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      if (focusedInput === 'email') {
        scrollToInput(inputEmailRef);
      } else if (focusedInput === 'senha') {
        scrollToInput(inputSenhaRef);
      }
    });

    return () => {
      keyboardDidShowListener.remove();
    };
  }, [focusedInput]);

  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: '#186858ff' }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" keyboardVerticalOffset={0}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingBottom: 50 }}
          keyboardShouldPersistTaps="handled"
          onScroll={event => setCurrentScrollY(event.nativeEvent.contentOffset.y)}
          scrollEventThrottle={16}
        >
          <View style={styles.botoes}>
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Ionicons name="arrow-back" size={28} color="#fff" />
            </Pressable>

            <Pressable
              style={styles.languageButton}
              onPress={() => setVer(true)}
            >
              <Ionicons name="language" size={28} color="#fff" />
            </Pressable>
          </View>

          <ModalIdioma ver={ver} setVer={setVer} />

          <View style={styles.container}>
            <Text style={styles.titulo}>{texto[0]}</Text>
            <Image style={styles.logo} source={require('../../../../assets/imgPadrao/O_Manual_do_Imigrante.png')} />

            {/* Email */}
            <View style={styles.text}>
              <Animated.Text style={[{ fontSize: 20, fontWeight: '600', top: 15, color: isDarkMode ? '#fff' : '#000' }, animatedLabelEmail]}>
                {texto[1]}
              </Animated.Text>
              <TextInput
                ref={inputEmailRef}
                style={[styles.textInput, { borderBottomColor: formData.email ? 'green' : borda }]}
                placeholderTextColor={isDarkMode ? '#fff' : '#131F3C'}
                keyboardType="email-address"
                onFocus={() => handleFocus('email', labelPosEmail, inputEmailRef)}
                onBlur={() => handleBlur(labelPosEmail, formData.email)}
                onChangeText={(text) => cad('email', text)}
                value={formData.email}
              />
            </View>

            {/* Senha */}
            <View style={[styles.text, styles.senhaContainer]}>
              <View style={{ flex: 1 }}>
                <Animated.Text
                  style={[{
                    fontSize: 20,
                    fontWeight: '600',
                    color: isDarkMode ? '#fff' : '#000',
                    position: 'absolute',
                    top: 5,
                  }, animatedLabelSenha]}
                >
                  {texto[2]}
                </Animated.Text>

                <TextInput
                  ref={inputSenhaRef}
                  style={[styles.senhaInput, { borderColor: formData.senha.length >= 8 ? 'green' : borda }]}
                  maxLength={8}
                  secureTextEntry={!senhaVisivel}
                  placeholderTextColor={isDarkMode ? "#fff" : "#131F3C"}
                  onFocus={() => handleFocus('senha', labelPosSenha, inputSenhaRef)}
                  onBlur={() => handleBlur(labelPosSenha, formData.senha)}
                  onChangeText={(text) => cad("senha", text)}
                  value={formData.senha}
                />
              </View>

              <Pressable onPress={() => setSenhaVisivel(!senhaVisivel)} style={styles.olhoBotao}>
                <Image
                  source={senhaVisivel ? require('../img/naoVer.png') : require('../img/ver.png')}
                  style={[styles.olhoIcone, { tintColor: isDarkMode ? '#fff' : '#000000' }]}
                />
              </Pressable>
            </View>

            <View style={styles.login}>
              <Text style={styles.loginText}>{texto[4]}</Text>
              <Pressable onPress={() => navigation.navigate('Cadastro')}>
                <Text style={styles.loginbtn}>{texto[5]}</Text>
              </Pressable>
            </View>

            <Pressable onPress={go} style={styles.btn}>
              <LinearGradient
                colors={['#186858ff', '#3BAF92']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
              >
                <Text style={styles.textBtn}>{texto[3]}</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}