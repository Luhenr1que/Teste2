import { StatusBar } from 'expo-status-bar';
import { View, Image, ImageBackground } from "react-native";
import styles from "./style.js";
import * as Animatable from 'react-native-animatable';
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalIdioma from '../../../trocarIdioma.js';



export default function Splash() {
    const navigation = useNavigation();
 
    const animaL = 'fadeInLeft';
    const animaR = 'fadeInRight';
    const [idiomaSelecionado, setIdiomaSelecionado] = useState(null);
    const [ver, setVer] = useState(false);

    // Seleção de idioma
    const idiomaSelect = (lingua) => {
        setIdiomaSelecionado(lingua);
        setVer(false);
    };

    // Função para verificar login automático
    const verificarLoginAutomatico = async () => {
        try {
            const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
            const idUsers = await AsyncStorage.getItem("idUsers");
            console.log("🔍 Verificando login automático:", { isLoggedIn, idUsers });
            return isLoggedIn === "true" && idUsers;
        } catch (error) {
            console.log("Erro ao verificar login automático:", error);
            return false;
        }
    };

    // Navegação para login
    const navegarParaLogin = () => {
        navigation.navigate('Login');
    };

    useEffect(() => {
        async function decisão() {
            const escolhaIdioma = await AsyncStorage.getItem('idioma');
            const loginAutomático = await verificarLoginAutomatico();

            if (loginAutomático) {
                navigation.navigate('Main');
                return;
            }

            if (escolhaIdioma || idiomaSelecionado) {
                // Se já existe idioma ou usuário selecionou, vai para Login depois de 3s
                const timer = setTimeout(() => {
                    navegarParaLogin();
                }, 3000);
                return () => clearTimeout(timer);
            } else {
                // Caso não tenha idioma definido, mostrar modal após 2s
                setTimeout(() => setVer(true), 2000);
            }
        }

        decisão();
    }, [idiomaSelecionado]);

    return (
        <View style={styles.container}>
            <ImageBackground source={require('./img/back.png')} style={styles.tituCont}>
                <Animatable.View useNativeDriver animation={'fadeInDown'} duration={1500}>
                    <Image style={styles.titu} source={require('./img/O_Manual_do_Imigrante.png')} />
                </Animatable.View>
            </ImageBackground>

            <View style={styles.imgCont}>
                <Animatable.View useNativeDriver animation={animaL} duration={1500}>
                    <Image style={styles.left} source={require('./img/left.png')} />
                </Animatable.View>
                <Animatable.View useNativeDriver animation={animaR} duration={1500}>
                    <Image style={styles.right} source={require('./img/right.png')} />
                </Animatable.View>
            </View>

            <View style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bottom: '-20%',
                backgroundColor: '#67bbaa',
            }}>
                <Image source={require('../../../assets/imgPadrao/Loader.gif')} style={{ width: 100, height: 100 }} />
            </View>

            <ModalIdioma
                ver={ver}
                setVer={setVer}
                onIdiomaSelecionado={idiomaSelect} 
            />

            <StatusBar />
        </View>
    );
}
