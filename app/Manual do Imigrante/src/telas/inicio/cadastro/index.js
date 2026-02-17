import React, { useEffect, useState, useRef } from 'react';
import { KeyboardAvoidingView, ScrollView, TextInput, View, Text, Pressable, Image, Modal, Keyboard, useColorScheme, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import ModalIdioma from "../../../../trocarIdioma"; 
import { useIdioma } from '../../../../idiomaContext';
import { useTheme } from "../../../../themeContext";
import getStyles from "./style"
import { withSpring, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { useApi } from '../../../../CRUD';
import { usePaisesComBandeiras } from './pais';
import { useBubble } from "../../../../src/telas/principal/Bolha/index";
import { Ionicons } from '@expo/vector-icons';

export default function Cadastro({ navigation }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const styles = getStyles(isDarkMode);

  const { salvarConta } = useApi();
  const [loading, setLoading] = useState(false);

  const [focusedInput, setFocusedInput] = useState(null);
  const [ver, setVer] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [openPais, setOpenPais] = useState(false);
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  
  const [mAviso, setMAviso] = useState(false);
  const [aviso, setAviso] = useState();
  const [formData, setFormData] = useState({
    nome: "", dataNasc: "", email: "", paisOrigem: "", telefone: "", senha: "",
  });

  const scrollRef = useRef(null);
  const inputNomeRef = useRef(null);
  const inputEmailRef = useRef(null);
  const inputSenhaRef = useRef(null);
  const inputDataRef = useRef(null);
  const inputTelefoneRef = useRef(null);

  const screenHeight = Dimensions.get('window').height;
  const [currentScrollY, setCurrentScrollY] = useState(0);
  const borda = '';

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
  const textoPais = textos?.pais || []

  const labelPosNome = useSharedValue(0);
  const labelPosEmail = useSharedValue(0);
  const labelPosSenha = useSharedValue(0);
  const labelPosData = useSharedValue(0);
  const labelPosTelefone = useSharedValue(0);

  const animatedLabelNome = useAnimatedStyle(() => ({
    transform: [{ translateY: labelPosNome.value }],
  }));
  const animatedLabelEmail = useAnimatedStyle(() => ({
    transform: [{ translateY: labelPosEmail.value }],
  }));
  const animatedLabelSenha = useAnimatedStyle(() => ({
    transform: [{ translateY: labelPosSenha.value }],
  }));
  const animatedLabelData = useAnimatedStyle(() => ({
    transform: [{ translateY: labelPosData.value }],
  }));
  const animatedLabelTelefone = useAnimatedStyle(() => ({
    transform: [{ translateY: labelPosTelefone.value }],
  }));

  const cad = (type, text) => setFormData(prev => ({ ...prev, [type]: text }));

  const formatarData = (text) => {
    const temp = text.replace(/\D/g, '');
    let formatado = temp;
    if (temp.length > 2 && temp.length <= 4) {
      formatado = temp.slice(0, 2) + '/' + temp.slice(2);
    } else if (temp.length > 4) {
      formatado = temp.slice(0, 2) + '/' + temp.slice(2, 4) + '/' + temp.slice(4, 8);
    }
    cad("dataNasc", formatado);
  }

  const formatarTelefone = (text) => {
    // Remove tudo que não é dígito
    const temp = text.replace(/\D/g, '');
    
    let formatado = temp;
    
    // Se começar com +, mantém o + e formata o restante
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
      // Se não começar com +, adiciona o +55 automaticamente (Brasil como padrão)
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
    
    cad("telefone", formatado);
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

  const validarData = (dataNasc) => {
    const partes = dataNasc.split('/');
    if (partes.length !== 3) return false;
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1;
    const ano = parseInt(partes[2], 10);
    const data = new Date(ano, mes, dia);
    return data.getFullYear() === ano && data.getMonth() === mes && data.getDate() === dia;
  }

  const validarTelefone = (telefone) => {
    // Remove todos os caracteres não numéricos, exceto o +
    const numeroLimpo = telefone.replace(/[^\d+]/g, '');
    
    // Verifica se tem pelo menos 8 dígitos (após o código do país)
    const digitos = numeroLimpo.replace(/\D/g, '');
    return digitos.length >= 8 && numeroLimpo.includes('+');
  }

  const validarCampos = () => {
  const { nome, dataNasc, email, telefone, senha } = formData;
  const regexEmail = /^[a-zA-Z0-9._-]{6,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexLetras = /[a-zA-Z]/;

  if (!nome || nome.length < 2) {
    Alert.alert('⚠️ ' + textoAviso[0] || 'Atenção', textoAviso[0] || 'Nome deve ter pelo menos 2 caracteres');
    return false;
  }

  if (!dataNasc || dataNasc.length !== 10 || !validarData(dataNasc)) {
    Alert.alert('⚠️ ' + (textoAviso[1] || 'Data inválida'), textoAviso[1] || 'Data deve estar no formato DD/MM/AAAA');
    return false;
  }

  if (!regexEmail.test(email) || !regexLetras.test(email.split("@")[0])) {
    Alert.alert('⚠️ ' + (textoAviso[2] || 'E-mail inválido'), textoAviso[2] || 'Digite um e-mail válido');
    return false;
  }

  if (!telefone || !validarTelefone(telefone)) {
    Alert.alert('⚠️ ' + (textoAviso[6] || 'Telefone inválido'), textoAviso[6] || 'Formato: +55 (11) 99999-9999');
    return false;
  }

  if (!senha || senha.length < 8) {
    Alert.alert('⚠️ ' + (textoAviso[3] || 'Senha inválida'), textoAviso[3] || 'Senha deve ter pelo menos 8 caracteres');
    return false;
  }

  return true;
}

const go = async () => {
  if (!validarCampos()) return;
  
  try {
    setLoading(true);
    
    // ✅ Converter data de DD/MM/YYYY para YYYY-MM-DD
    const dataParts = formData.dataNasc.split('/');
    const dataFormatada = `${dataParts[2]}-${dataParts[1]}-${dataParts[0]}`;
    
    console.log('📤 Enviando dados para API:', {
      ...formData,
      dataNasc: dataFormatada
    });
    
    // ✅ Chamar a função do Context
    const resposta = await salvarConta(
      formData.nome,
      formData.email,
      dataFormatada,
      formData.telefone,
      formData.paisOrigem,
      formData.senha
    );

    if (resposta && resposta.id) {
      await AsyncStorage.setItem("idUsers", resposta.id.toString());
      console.log("✅ ID do usuário salvo:", resposta.id);
    } else if (resposta.data && resposta.data.id) {
      await AsyncStorage.setItem("idUsers", resposta.data.id.toString());
      console.log("✅ ID do usuário salvo:", resposta.data.id);
    }
    
    // ✅ Se chegou aqui, o cadastro na API foi bem-sucedido
    await salvarLocal();
    console.log('✅ Cadastro realizado com sucesso!');
    
    // ✅ Navegar para a próxima tela
    navigation.navigate('Questionario');
    
  } catch (error) {
    console.log('❌ Erro no cadastro');
    // O alerta de erro já é mostrado pela função salvarConta
  } finally {
    setLoading(false);
  }
}

  const salvarLocal = async () => {
    try {
      await AsyncStorage.setItem("@cadastro", JSON.stringify(formData));
      console.log("Dados salvos com sucesso!");
    } catch (error) {
      console.log("Erro ao salvar dados:", error);
    }
  };

  const carregarLocal = async () => {
    try {
      const dados = await AsyncStorage.getItem("@cadastro");
      if (dados) {
        setFormData(JSON.parse(dados));
        console.log("Dados carregados:", dados);
      }
    } catch (error) {
      console.log("Erro ao carregar dados:", error);
    }
  };

  const fecharModalAviso = () => setMAviso(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      if (focusedInput === 'nome') {
        scrollToInput(inputNomeRef);
      } else if (focusedInput === 'email') {
        scrollToInput(inputEmailRef);
      } else if (focusedInput === 'senha') {
        scrollToInput(inputSenhaRef);
      } else if (focusedInput === 'data') {
        scrollToInput(inputDataRef);
      } else if (focusedInput === 'telefone') {
        scrollToInput(inputTelefoneRef);
      }
    });

    return () => {
      keyboardDidShowListener.remove();
    };
  }, [focusedInput]);

  const paisesComBandeiras = usePaisesComBandeiras();
  const [listaPaises, setListaPaises] = useState(paisesComBandeiras);

  useEffect(() => {
  // Atualiza a lista quando os textos carregarem
  if (textoPais && textoPais.length > 0) {
    const paisesAtualizados = paisesComBandeiras.map((paisItem, index) => ({
      ...paisItem,
      label: textoPais[index] || paisItem.label
    }));
    setListaPaises(paisesAtualizados);
  }
}, [textoPais]);

useEffect(() => {
  setListaPaises(paisesComBandeiras);
}, []);

  return (
    <View style={{ height:'100%', width:'100%', backgroundColor: '#186858ff' }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" keyboardVerticalOffset={0}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
          onScroll={event => setCurrentScrollY(event.nativeEvent.contentOffset.y)}
          scrollEventThrottle={16}
        >
          <Modal animationType='fade' visible={mAviso} transparent={true}>
            <Pressable onPress={fecharModalAviso} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
              <Pressable onPress={() => {}} style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
                <Text style={{ color: 'red', fontSize: 16 }}>⚠️ {aviso}</Text>
              </Pressable>
            </Pressable>
          </Modal>  
          
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
          
          <ModalIdioma ver={ver} setVer={setVer}></ModalIdioma>

          <View style={styles.container}>
            <Text style={styles.titulo}>{texto[0]}</Text>

            {/* Nome */}
            <View style={styles.text}>
              <Animated.Text style={[{ fontSize: 20,fontWeight:'600',top:15, color: isDarkMode ? '#fff' : '#000' }, animatedLabelNome]}>
                {texto[1]}
              </Animated.Text>
              <TextInput
                ref={inputNomeRef}
                style={styles.textInput}
                onFocus={() => handleFocus('nome', labelPosNome, inputNomeRef)}
                onBlur={() => handleBlur(labelPosNome, formData.nome)}
                onChangeText={(text) => cad('nome', text)}
                value={formData.nome}
              />
            </View>

            {/* Email */}
            <View style={styles.text}>
              <Animated.Text style={[{ fontSize: 20,fontWeight:'600',top:15, color: isDarkMode ? '#fff' : '#000' }, animatedLabelEmail]}>
                {texto[2]}
              </Animated.Text>
              <TextInput
                ref={inputEmailRef}
                style={styles.textInput}
                keyboardType='email-address'
                onFocus={() => handleFocus('email', labelPosEmail, inputEmailRef)}
                onBlur={() => handleBlur(labelPosEmail, formData.email)}
                onChangeText={(text) => cad('email', text.toLowerCase())}
                value={formData.email}
              />
            </View>

            {/* Data de Nascimento */}
            <View style={styles.text}>
              <Animated.Text style={[{ fontSize: 20,fontWeight:'600',top:15, color: isDarkMode ? '#fff' : '#000' }, animatedLabelData]}>
                {texto[4] || "Data de Nascimento"}
              </Animated.Text>
              <TextInput
                ref={inputDataRef}
                style={styles.textInput}
                onFocus={() => handleFocus('data', labelPosData, inputDataRef)}
                onBlur={() => handleBlur(labelPosData, formData.dataNasc)}
                onChangeText={formatarData}
                value={formData.dataNasc}
                keyboardType="numeric"
                maxLength={10}
              />
            </View>

            {/* Telefone */}
            <View style={styles.text}>
              <Animated.Text style={[{ fontSize: 20,fontWeight:'600',top:15, color: isDarkMode ? '#fff' : '#000' }, animatedLabelTelefone]}>
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
              />
            </View>

            {/* País de Origem */}
             <View style={styles.text}>
              <DropDownPicker
                listMode="MODAL"
                modalProps={{
                  animationType: "slide",
                  presentationStyle: "pageSheet",
                }}
                searchContainerStyle={{
                  borderBottomColor: isDarkMode ? '#555' : '#ccc',
                  backgroundColor: isDarkMode ? '#313131' : '#ffffffff',
                  flexDirection: 'row-reverse', 
                  alignItems: 'center',
                  marginRight:10, 
                }}
                searchable={true}
                searchPlaceholder="Pesquisar país..."
                searchTextInputProps={{
                  style: {
                    color: isDarkMode ? '#fff' : '#131F3C',
                    backgroundColor: isDarkMode ? '#424242' : '#f0f0f0',
                    width:'80%',
                    height:'120%',
                    borderWidth:1,
                    marginRight:0, 
                  },
                  placeholderTextColor: isDarkMode ? '#ccc' : '#666',
                }}
                arrowIconStyle={{
                  width: 25,
                  height: 25,
                  tintColor: isDarkMode ? '#fff' : '#131F3C', 
                }}
                modalContentContainerStyle={{
                  backgroundColor: isDarkMode ? '#313131ff' : '#ffffffff',
                  paddingVertical: 20,
                }}
                modalTitleStyle={{
                  color: isDarkMode ? '#fff' : '#131F3C',
                }}
                closeIconStyle={{
                  marginRight:15, 
                  tintColor: isDarkMode ? '#fff' : '#131F3C',
                }}
                style={{
                  width: '100%',
                  height: 70,
                  borderWidth: 0,
                  backgroundColor: 'transparent',
                }}
                open={openPais}
                value={formData.paisOrigem}
                items={listaPaises}
                setOpen={setOpenPais}
                setValue={(value) => cad("paisOrigem", value)}
                setItems={setListaPaises}
                placeholder={texto[3]}
                dropDownContainerStyle={{
                  width: '90%',
                  height: 300,
                  borderColor: '#40666B',
                  backgroundColor: isDarkMode ? '#313131ff' : '#CCEED9',
                }}
                textStyle={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: isDarkMode ? "#fff" : "#131F3C",
                }}
                placeholderStyle={{
                  marginLeft:-10,
                  fontWeight: '600',
                  fontSize: 20,
                  color: isDarkMode ? "#fff" : "#131F3C",
                }}
                tickIconStyle={{
                  width: 30,
                  height: 30,
                }}
                showArrowIcon={true}
                showTickIcon={true}
                zIndex={3000}
                zIndexInverse={1000}
                renderListItem={({ item }) => (
                  <Pressable
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 14,
                      paddingHorizontal: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: '#ccc',
                    }}
                    onPress={() => {
                      cad("paisOrigem", item.value);
                      setOpenPais(false);
                    }}
                  >
                    {item.icon && item.icon()}
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: '600',
                        color: isDarkMode ? "#fff" : '#40666B',
                        marginLeft: 12,
                        flexShrink: 1,
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                )}
              />
            </View>

            {/* Senha */}
            <View style={[styles.text, styles.senhaContainer]}>
              <View style={{ flex: 1 }}>
                <Animated.Text
                  style={[
                    {
                      fontSize: 20,
                      fontWeight:'600',
                      color: isDarkMode ? '#fff' : '#000',
                      position: 'absolute',
                      top:5,
                    },
                    animatedLabelSenha
                  ]}
                >
                  {texto[5]}
                </Animated.Text>

                <TextInput
                  ref={inputSenhaRef}
                  style={[
                    styles.senhaInput,
                    { borderColor: formData.senha.length >= 8 ? 'green' : borda }
                  ]}
                  maxLength={8}
                  secureTextEntry={!senhaVisivel}
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
              <Text style={styles.loginText}>{texto[7]}</Text>
              <Pressable onPress={()=>navigation.navigate('Login')}>
                <Text style={styles.loginbtn}>{texto[8]}</Text>
              </Pressable>   
            </View>

            <Pressable 
              onPress={() => go()} 
              style={[styles.btn, loading && { opacity: 0.7 }]} 
              disabled={loading}
            >
              <LinearGradient 
                colors={['#186858ff', '#3BAF92']} 
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
              >
                <Text style={styles.textBtn}>
                  {loading ? texto[12] : texto[6]}
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}