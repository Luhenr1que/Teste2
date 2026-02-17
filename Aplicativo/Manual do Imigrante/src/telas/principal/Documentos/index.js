import React, { useState, useEffect, useRef } from "react";
import { Pressable, View, Text, FlatList, ScrollView, Dimensions, Image, ActivityIndicator, Alert } from "react-native";
import ModalIdioma from "../../../../trocarIdioma";
import { useIdioma } from "../../../../idiomaContext";
import { useTheme } from "../../../../themeContext";
import getStyles from "./style";
import { useApi, API_URL } from "../../../../CRUD";
import { FontAwesome5, FontAwesome, FontAwesome6, Fontisto, AntDesign, SimpleLineIcons, MaterialIcons, Octicons, Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from "../../../../themeContext";
import AudioRecorder from "../../../../gravador";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BubbleArea from "../Bolha/areaBolha";


export default function Documentos({ navigation }) {
    const { themeMode, setThemeMode, temaCor, toggleTheme, isDarkMode, setTemaCor } = useTheme();
    const styles = getStyles(isDarkMode);

    const { width, height } = Dimensions.get('window');

    const { selectInfo, carregarDadosUsuario } = useApi()

    const { textos } = useIdioma();
    const texto = textos?.documentos || [];
    const textoAviso = textos?.aviso || [];
    const [info, setInfo] = useState([]);
    const [userData, setUserData] = useState({ nomeUsers: "" });
    const [notificar, setNotificar] = useState(false);
    const [id, setId] = useState();

    const [mAudio, setMAudio] = useState(false); // Modal gravador
    const [loading, setLoading] = useState(true);
    const [photoUri, setPhotoUri] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageKey, setImageKey] = useState(0);
    const [imageError, setImageError] = useState(false);

    const data = [
        { id: '1', title: texto[0], icon: <FontAwesome5 name="bus" size={height * 0.045} color={Colors[temaCor]} />, press: () => { } },
        { id: '2', title: texto[1], icon: <FontAwesome name="car" size={height * 0.045} color={Colors[temaCor]} />, press: () => { } },
        { id: '3', title: texto[2], icon: <Fontisto name="passport-alt" size={height * 0.045} color={Colors[temaCor]} />, press: () => { } },
        { id: '4', title: texto[3], icon: <MaterialIcons name="maps-home-work" size={height * 0.045} color={Colors[temaCor]} />, press: () => { } },
        { id: '5', title: texto[4], icon: <MaterialIcons name="south-america" size={height * 0.045} color={Colors[temaCor]} />, press: () => { } },
        { id: '6', title: texto[5], icon: <FontAwesome5 name="vote-yea" size={height * 0.045} color={Colors[temaCor]} />, press: () => { } },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef(null);
    const [isInitialized, setIsInitialized] = useState(false);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.nav}>
                    <View style={styles.navIcons}>

                    </View>
                </View>
                <View style={styles.carrosel}>
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        decelerationRate="fast"
                        snapToInterval={width}
                        contentContainerStyle={styles.scrollContent}
                        scrollEnabled={false}
                        pointerEvents="none"
                    >

                    </ScrollView>
                </View>
                <View style={styles.options}>
                    <Pressable style={styles.camBot} onPress={()=>{navigation.navigate('Camera')}}>
                        <FontAwesome5 name="camera" size={width*0.12} color={Colors[temaCor]} />
                        <Text style={styles.camBotText}>Scanner de Documentos</Text>
                    </Pressable>
                </View>
                <View style={styles.geralOptionsArea}>
                    <Pressable onPress={() => navigation.navigate('Emergencia')} style={styles.geralOptionsBtn}>
                        <Feather name="alert-octagon" size={height * 0.05} style={styles.geralOptionsIcon} color={Colors[temaCor]} />
                        <Text style={styles.geralOptionsText}>{texto[0]}</Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('PDocumentos', { tipo: 'identificacao' })} style={styles.geralOptionsBtn}>
                        <MaterialIcons name="badge" size={height * 0.05} style={styles.geralOptionsIcon} color={Colors[temaCor]} />
                        <Text style={styles.geralOptionsText}>{texto[1]}</Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('Mapa', { tipoFiltro: 'all' })} style={styles.geralOptionsBtn}>
                        <MaterialCommunityIcons name="google-maps" size={height * 0.05} style={styles.geralOptionsIcon} color={Colors[temaCor]} />
                        <Text style={styles.geralOptionsText}>{texto[2]}</Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('PDocumentos', { tipo: 'saude' })} style={styles.geralOptionsBtn}>
                        <FontAwesome6 name="heart-pulse" size={height * 0.05} style={styles.geralOptionsIcon} color={Colors[temaCor]} />
                        <Text style={styles.geralOptionsText}>{texto[3]}</Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('PDocumentos', { tipo: 'trabalho' })} style={styles.geralOptionsBtn}>
                        <MaterialIcons name="work" size={height * 0.05} style={styles.geralOptionsIcon} color={Colors[temaCor]} />
                        <Text style={styles.geralOptionsText}>{texto[4]}</Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('PDocumentos', { tipo: 'transporteP' })} style={styles.geralOptionsBtn}>
                        <FontAwesome5 name="bus" size={height * 0.05} style={styles.geralOptionsIcon} color={Colors[temaCor]} />
                        <Text style={styles.geralOptionsText}>{texto[5]}</Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('PDocumentos', { tipo: 'veiculos' })} style={styles.geralOptionsBtn}>
                        <FontAwesome5 name="car" size={height * 0.05} style={styles.geralOptionsIcon} color={Colors[temaCor]} />
                        <Text style={styles.geralOptionsText}>{texto[6]}</Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('PDocumentos', { tipo: 'direitos' })} style={styles.geralOptionsBtn}>
                        <MaterialIcons name="gavel" size={height * 0.05} style={styles.geralOptionsIcon} color={Colors[temaCor]} />
                        <Text style={styles.geralOptionsText}>{texto[8]}</Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('PDocumentos', { tipo: 'deveres' })} style={styles.geralOptionsBtn}>
                        <MaterialIcons name="balance" size={height * 0.05} style={styles.geralOptionsIcon} color={Colors[temaCor]} />
                        <Text style={styles.geralOptionsText}>{texto[9]}</Text>
                    </Pressable>
                </View>
                <AudioRecorder visible={mAudio} onClose={() => setMAudio(false)} />

            </ScrollView>
            <BubbleArea />
        </View>
    );
}