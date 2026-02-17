import React, { useState, useRef, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker'
import { View, KeyboardAvoidingView, ScrollView, Text, TextInput, Pressable, Alert, Image, Dimensions, Keyboard, Modal } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import getStyles from './style';
import ModalIdioma from "../../../../trocarIdioma";
import { useIdioma } from '../../../../idiomaContext';
import { useTheme } from '../../../../themeContext';
import { useApi } from '../../../../CRUD';
import { Ionicons } from '@expo/vector-icons';

export default function Questionario({ navigation }) {
    const { isDarkMode, toggleTheme } = useTheme();
    const styles = getStyles(isDarkMode);

    const { atualizarDocumentos } = useApi()

    const [focusedInput, setFocusedInput] = useState(null);
    const [ver, setVer] = useState(false);
    const [mIni, setMIni] = useState(true);

    const scrollRef = useRef(null);
    const inputCrnmRef = useRef(null);
    const inputCpfRef = useRef(null);
    const inputMercosulRef = useRef(null);
    const inputPassaporteRef = useRef(null);

    const screenHeight = Dimensions.get('window').height;
    const [currentScrollY, setCurrentScrollY] = useState(0);

    const [form, setForm] = useState({
        condicao: "refugiado",
        crnm_rne: "",
        cpf: "",
        mercosul: "",
        passaporte: "",
    });

    // Função para scrollar até o input
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

    const handleFocus = (fieldName, ref) => {
        if (focusedInput !== fieldName) {
            scrollToInput(ref);
            setFocusedInput(fieldName);
        }
    };

    const handleBlur = () => {
        setFocusedInput(null);
    };

    // Formatação de inputs
    const formatarCRNM = (text) => cad("crnm_rne", text.replace(/\D/g, '').slice(0, 9));

    const formatarCPF = (text) => {
        const temp = text.replace(/\D/g, '').slice(0, 11);
        let formatado = temp;
        if (temp.length > 3 && temp.length <= 6) formatado = temp.slice(0, 3) + '.' + temp.slice(3);
        else if (temp.length > 6 && temp.length <= 9) formatado = temp.slice(0, 3) + '.' + temp.slice(3, 6) + '.' + temp.slice(6);
        else if (temp.length > 9) formatado = temp.slice(0, 3) + '.' + temp.slice(3, 6) + '.' + temp.slice(6, 9) + '-' + temp.slice(9);
        cad("cpf", formatado);
    };

    const formatarMercosul = (text) => cad("mercosul", text.replace(/\D/g, '').slice(0, 12));
    const formatarPassaporte = (text) => {
        const letras = text.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase();
        const numeros = text.replace(/\D/g, '').slice(0, 6);
        cad("passaporte", letras + numeros);
    };

    const cad = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    // Função de validação
    const validarFormulario = () => {

        if (!form.condicao) {
            Alert.alert('⚠️ ' + (textoAviso[4] || 'Atenção'), 'Selecione sua condição');
            return false;
        }
        if (form.crnm_rne !== "" && form.crnm_rne.length !== 9) {
            Alert.alert('⚠️ ' + (textoAviso[4] || 'Atenção'), 'CRNM/RNE deve ter 9 dígitos');
            return false;
        }
        if (form.cpf !== "" && form.cpf.replace(/\D/g, '').length !== 11) {
            Alert.alert('⚠️ ' + (textoAviso[4] || 'Atenção'), 'CPF deve ter 11 dígitos');
            return false;
        }
        if (form.mercosul !== "" && form.mercosul.length !== 12) {
            Alert.alert('⚠️ ' + (textoAviso[4] || 'Atenção'), 'Mercosul deve ter 12 dígitos');
            return false;
        }
        if (form.passaporte !== "" && form.passaporte.length !== 8) {
            Alert.alert('⚠️ ' + (textoAviso[4] || 'Atenção'), 'Passaporte deve ter 8 caracteres');
            return false;
        }

        return true;
    };

    const go = async () => {
        if (!validarFormulario()) return;
        const id = await AsyncStorage.getItem("idUsers");


        const documentosParaEnviar = {};

        documentosParaEnviar.condicaoUsers = form.condicao || "";
        documentosParaEnviar.cpfUsers = form.cpf || "";
        documentosParaEnviar.crmRneUsers = form.crnm_rne || "";
        documentosParaEnviar.mercosulUsers = form.mercosul || "";
        documentosParaEnviar.passaporteUsers = form.passaporte || "";


        console.log('📤 Dados enviados:', documentosParaEnviar);

        await salvarLocal();
        await atualizarDocumentos(id, documentosParaEnviar);
        console.log('Dados salvos com sucesso!');
        navigation.navigate('Login');
    }

    const salvarLocal = async () => {
        try {
            await AsyncStorage.setItem("@cadastroDocumenos", JSON.stringify(form));
        } catch (error) {
            console.log("Erro ao salvar dados:", error);
            Alert.alert('❌ Erro', 'Não foi possível salvar os documentos');
        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            if (focusedInput === 'crnm_rne') {
                scrollToInput(inputCrnmRef);
            } else if (focusedInput === 'cpf') {
                scrollToInput(inputCpfRef);
            } else if (focusedInput === 'mercosul') {
                scrollToInput(inputMercosulRef);
            } else if (focusedInput === 'passaporte') {
                scrollToInput(inputPassaporteRef);
            }
        });

        return () => {
            keyboardDidShowListener.remove();
        };
    }, [focusedInput]);

    const { textos } = useIdioma();
    const texto = textos?.questionario || [];
    const textoAviso = textos?.aviso || [];

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
                    {/* Botões de topo */}
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

                    {/* Formulário */}
                    <View style={styles.container}>
                        <Text style={styles.titulo}>{texto[11]}</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={form.condicao}
                                onValueChange={(itemValue) => cad("condicao", itemValue)}
                                style={styles.picker}
                                dropdownIconColor="#40666B"
                            >
                                <Picker.Item label={texto[12]} value="refugiado" style={styles.pickerText} />
                                <Picker.Item label={texto[13]} value="imigrante" style={styles.pickerText} />
                            </Picker>
                        </View>
                        <Text style={styles.titulo}>{texto[0]}</Text>
                        <TextInput
                            ref={inputCrnmRef}
                            style={styles.textInput}
                            placeholderTextColor="#40666B"
                            placeholder={texto[1]}
                            value={form.crnm_rne}
                            onChangeText={formatarCRNM}
                            onFocus={() => handleFocus('crnm_rne', inputCrnmRef)}
                            onBlur={handleBlur}
                        />

                        <Text style={styles.titulo}>{texto[2]}</Text>
                        <TextInput
                            ref={inputCpfRef}
                            style={styles.textInput}
                            placeholderTextColor="#40666B"
                            placeholder={texto[3]}
                            value={form.cpf}
                            onChangeText={formatarCPF}
                            onFocus={() => handleFocus('cpf', inputCpfRef)}
                            onBlur={handleBlur}
                        />

                        <Text style={styles.titulo}>{texto[4]}</Text>
                        <TextInput
                            ref={inputMercosulRef}
                            style={styles.textInput}
                            placeholderTextColor="#40666B"
                            placeholder={texto[5]}
                            value={form.mercosul}
                            onChangeText={formatarMercosul}
                            onFocus={() => handleFocus('mercosul', inputMercosulRef)}
                            onBlur={handleBlur}
                        />

                        <Text style={styles.titulo}>{texto[6]}</Text>
                        <TextInput
                            ref={inputPassaporteRef}
                            style={styles.textInput}
                            placeholderTextColor="#40666B"
                            placeholder={texto[7]}
                            value={form.passaporte}
                            onChangeText={formatarPassaporte}
                            onFocus={() => handleFocus('passaporte', inputPassaporteRef)}
                            onBlur={handleBlur}
                        />

                        <Pressable onPress={() => go()} style={styles.btn}>
                            <LinearGradient
                                colors={['#186858ff', '#3BAF92']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.gradient}
                            >
                                <Text style={styles.textBtn}>{texto[8]}</Text>
                            </LinearGradient>
                        </Pressable>
                    </View>

                    <Modal animationType='fade' visible={mIni} transparent={true}>
                        <Animatable.View animation={'fadeInUp'} style={styles.ModalConatiner}>
                            <Pressable onPress={() => setMIni(false)} style={{ flex: 1 }}>
                                <Text style={styles.tituMIni}>{texto[9]}</Text>
                                <Animatable.View style={styles.ModalBox}>
                                    <Text style={styles.textMIni}>{texto[10]}</Text>
                                </Animatable.View>
                                <Image style={styles.imgMIni} source={require('../img/Mulher sorrindo com balões de fala.png')}></Image>
                            </Pressable>
                        </Animatable.View>
                    </Modal>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}