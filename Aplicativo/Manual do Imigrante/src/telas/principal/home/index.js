import React, { useState, useEffect } from "react";
import { Pressable, View, Text, FlatList, ScrollView, Dimensions, Image, ActivityIndicator, Alert, Modal } from "react-native";
import ModalIdioma from "../../../../trocarIdioma";
import { useIdioma } from "../../../../idiomaContext";
import { useTheme } from "../../../../themeContext";
import getStyles from "./style";
import { useApi, API_URL } from "../../../../CRUD";
import { FontAwesome5, FontAwesome, FontAwesome6, Fontisto, AntDesign, SimpleLineIcons, MaterialIcons, Octicons, Ionicons } from '@expo/vector-icons';
import { Colors } from "../../../../themeContext";
import AudioRecorder from "../../../../gravador";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import BubbleArea from "../Bolha/areaBolha";
import { API_URL_WEB } from "../../../../CRUD";

export default function Home({ navigation }) {
    const { themeMode, setThemeMode, temaCor, toggleTheme, isDarkMode, setTemaCor } = useTheme();
    const styles = getStyles(isDarkMode);

    const { width, height } = Dimensions.get('window');

    const { selectInfo, carregarDadosUsuario, carregarNoticias } = useApi()

    const { textos } = useIdioma();
    const texto = textos?.home || [];
    const textoAviso = textos?.aviso || [];
    const [info, setInfo] = useState([]);
    const [userData, setUserData] = useState({ nomeUsers: "" });
    const [notificar, setNotificar] = useState(false);
    const [id, setId] = useState(null);
    const [loadingImg, setLoadingImg] = useState(true);


    const [mAudio, setMAudio] = useState(false); // Modal gravador
    const [loading, setLoading] = useState(true);
    const [photoUri, setPhotoUri] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageKey, setImageKey] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [maxRetries] = useState(3);

    const [modalVisible, setModalVisible] = useState(false); // Inicia como false

    // ✅ ESTADO PARA AS NOTÍCIAS DO BANCO
    const [noticias, setNoticias] = useState([]);
    const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
    const [loadingNoticias, setLoadingNoticias] = useState(true);

    const data = [
        { id: '1', title: texto[0], icon: <FontAwesome5 name="bus" size={height * 0.045} color={Colors[temaCor]} />, press: () => { } },
        { id: '2', title: texto[1], icon: <FontAwesome name="car" size={height * 0.045} color={Colors[temaCor]} />, press: () => { } },
        { id: '3', title: texto[2], icon: <Fontisto name="passport-alt" size={height * 0.045} color={Colors[temaCor]} />, press: () => { } },
        { id: '4', title: texto[3], icon: <MaterialIcons name="maps-home-work" size={height * 0.045} color={Colors[temaCor]} />, press: () => { } },
        { id: '5', title: texto[4], icon: <MaterialIcons name="south-america" size={height * 0.045} color={Colors[temaCor]} />, press: () => { } },
        { id: '6', title: texto[5], icon: <FontAwesome5 name="vote-yea" size={height * 0.045} color={Colors[temaCor]} />, press: () => { } },
    ];

    const carregarNoticiasParaHome = async () => {
        try {
            setLoadingNoticias(true);

            const noticiasDoBanco = await carregarNoticias();

            // Limita a 7 notícias e formata os dados CORRETAMENTE
            const noticiasFormatadas = noticiasDoBanco.slice(0, 7).map(noticia => {
                try {
                    // Processa o título que vem como JSON array
                    let titulo = "Título não disponível";
                    if (noticia.tituloNoticia) {
                        try {
                            const titulosArray = JSON.parse(noticia.tituloNoticia);
                            if (Array.isArray(titulosArray) && titulosArray.length > 0) {
                                titulo = titulosArray[0]; // Pega o primeiro idioma (Português)
                            }
                        } catch (e) {
                            // Se não for JSON, usa como string normal
                            titulo = noticia.tituloNoticia;
                        }
                    }

                    // Processa a descrição que vem como JSON array
                    let resumo = "Resumo não disponível";
                    if (noticia.descricaoNoticia) {
                        try {
                            const descricoesArray = JSON.parse(noticia.descricaoNoticia);
                            if (Array.isArray(descricoesArray) && descricoesArray.length > 0) {
                                resumo = descricoesArray[0]; // Pega o primeiro idioma (Português)
                            }
                        } catch (e) {
                            // Se não for JSON, usa como string normal
                            resumo = noticia.descricaoNoticia;
                        }
                    }

                    // ✅ AJUSTE AQUI: Processa a imagem da mesma forma
                    let imagemUrl = "https://via.placeholder.com/300x150?text=Sem+Imagem";

                    if (noticia.imgNoticia) {
                        const imagePath = noticia.imgNoticia.trim();
                        let baseImageUrl = "";

                        // Verifica se começa com "/" (caminho relativo)
                        if (imagePath.startsWith('/')) {
                            // Se for caminho relativo, adiciona a URL base
                            baseImageUrl = `${API_URL_WEB}${imagePath}`;
                        }
                        // Verifica se já é uma URL completa
                        else if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
                            baseImageUrl = imagePath;
                        }
                        // Se for apenas um nome de arquivo ou caminho sem barra
                        else {
                            // Adiciona "/" no início se não tiver
                            baseImageUrl = `${API_URL_WEB}/${imagePath}`;
                        }

                        // ✅ AGORA ADICIONA TIMESTAMP APENAS SE NÃO FOR PLACEHOLDER E SE TIVER UMA URL VÁLIDA
                        if (baseImageUrl) {
                            // Verifica se a URL já tem parâmetros de query
                            const hasQuery = baseImageUrl.includes('?');
                            imagemUrl = `${baseImageUrl}${hasQuery ? '&' : '?'}t=${Date.now()}`;
                        }
                    }

                    return {
                        id: noticia.idNoticia?.toString() || Date.now().toString(),
                        titulo: titulo,
                        imagem: imagemUrl, // ✅ Agora usa a URL processada
                        resumo: resumo
                    };
                } catch (error) {
                    console.error("Erro ao processar notícia:", error);
                    return {
                        id: noticia.idNoticia?.toString() || Date.now().toString(),
                        titulo: "Título não disponível",
                        imagem: "https://via.placeholder.com/300x150?text=Sem+Imagem",
                        resumo: "Resumo não disponível"
                    };
                }
            });

            setNoticias(noticiasFormatadas);

        } catch (error) {
            console.error("Erro ao carregar notícias:", error);
            setNoticias([]);
        } finally {
            setLoadingNoticias(false);
        }
    };

    // ✅ EFFECT PARA CARREGAR NOTÍCIAS
    useEffect(() => {
        carregarNoticiasParaHome();
    }, []);

    // ✅ EFFECT PARA MUDAR A NOTÍCIA A CADA 3 SEGUNDOS
    useEffect(() => {
        if (noticias.length > 1) {
            const interval = setInterval(() => {
                setCurrentNewsIndex((prevIndex) =>
                    prevIndex === noticias.length - 1 ? 0 : prevIndex + 1
                );
            }, 10000);

            return () => clearInterval(interval);
        }
    }, [noticias.length]);

    // ✅ FUNÇÕES DE NAVEGAÇÃO DO CARROSSEL
    const goToNextNews = () => {
        if (noticias.length > 1) {
            setCurrentNewsIndex((prevIndex) =>
                prevIndex === noticias.length - 1 ? 0 : prevIndex + 1
            );
        }
    };

    const goToPrevNews = () => {
        if (noticias.length > 1) {
            setCurrentNewsIndex((prevIndex) =>
                prevIndex === 0 ? noticias.length - 1 : prevIndex - 1
            );
        }
    };

    const obterUserId = async () => {
        try {
            const userId = await AsyncStorage.getItem("idUsers");
            return userId;
        } catch (error) {
            console.error("Erro ao obter user ID:", error);
            return null;
        }
    };

    // ✅ FUNÇÃO PARA VERIFICAR SE O ENDEREÇO ESTÁ COMPLETO
    const verificarEnderecoCompleto = async (userId) => {
        try {
            if (!userId) return false;

            // Busca dados do usuário do banco
            const dadosUsuario = await carregarDadosUsuario(userId);

            if (!dadosUsuario) return false;

            // Verifica se todos os campos essenciais de endereço estão preenchidos
            const camposEndereco = [
                dadosUsuario.lograUsers,    // Logradouro
                dadosUsuario.numeroUsers,   // Número
                dadosUsuario.cepUsers,      // CEP
                dadosUsuario.bairroUsers,   // Bairro
                dadosUsuario.cidadeUsers,   // Cidade
                dadosUsuario.estadoUsers    // Estado
            ];

            // Retorna true se todos os campos estiverem preenchidos
            const enderecoCompleto = camposEndereco.every(campo =>
                campo && campo.toString().trim().length > 0
            );

            return enderecoCompleto;
        } catch (error) {
            console.error("Erro ao verificar endereço:", error);
            return false;
        }
    };

    // ✅ FUNÇÃO SIMPLIFICADA PARA CARREGAR IMAGEM DO PERFIL (SEM CACHE)
    const carregarImagemPerfil = async (userData, userId) => {
        try {
            setImageError(false);

            // Carrega diretamente da URL do servidor
            if (userData.imgUsers) {
                let fotoUrl = userData.imgUsers.startsWith('http')
                    ? userData.imgUsers
                    : `${API_URL}${userData.imgUsers}`;

                // Adiciona timestamp para evitar cache
                fotoUrl += `?t=${Date.now()}`;
                setPhotoUri(fotoUrl);
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

    // ✅ FUNÇÃO DISCRETA PARA RECARREGAR IMAGEM
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
            const userData = await carregarDadosUsuarioEspecifico(userId);
            if (userData) {
                await carregarImagemPerfil(userData, userId);
            }
        } catch (error) {
            // Falha silenciosamente
        }
    };

    const pickImageFromGallery = async () => {
        try {
            if (!id) {
                Alert.alert("Erro", "Usuário não identificado");
                return;
            }

            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Permissão para acessar a galeria negada!');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 0.8,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const selectedImage = result.assets[0].uri;

                const imageInfo = await FileSystem.getInfoAsync(selectedImage);
                if (!imageInfo.exists || imageInfo.size === 0) {
                    Alert.alert("Erro", "A imagem selecionada é inválida");
                    return;
                }

                // Define a imagem selecionada diretamente
                setPhotoUri(selectedImage);
                setImageError(false);

                await uploadImage(selectedImage);
            }
        } catch (error) {
            console.error('Erro ao escolher imagem:', error);
            alert('Erro ao acessar a galeria!');
        }
    };

    const uploadImage = async (uri) => {
        try {
            setUploading(true);

            const formData = new FormData();
            formData.append('foto', {
                uri: uri,
                type: 'image/jpeg',
                name: `perfil_${id}_${Date.now()}.jpg`,
            });
            formData.append('idUsers', id);

            const response = await axios.post(`${API_URL}/api/upload-foto`, formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                Alert.alert("✅ Sucesso", "Foto de perfil atualizada!");
            } else {
                throw new Error(response.data.message || 'Erro desconhecido');
            }
        } catch (error) {
            console.error("Erro no upload:", error);
            Alert.alert("⚠️ Aviso", "Não foi possível sincronizar com o servidor");
        } finally {
            setUploading(false);
        }
    };

    // ✅ FUNÇÃO PRINCIPAL PARA CARREGAR DADOS DO USUÁRIO
    const carregarDadosUsuarioEspecifico = async (userId) => {
        try {
            if (!userId) {
                return null;
            }

            const dadosUser = await carregarDadosUsuario(userId);

            if (dadosUser && dadosUser.idUsers) {
                const userInfo = {
                    nomeUsers: dadosUser.nomeUsers || "",
                    emailUsers: dadosUser.emailUsers || "",
                    telefoneUsers: dadosUser.telefoneUsers || "",
                    imgUsers: dadosUser.imgUsers || null
                };

                return userInfo;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Erro ao carregar dados do usuário:", error);
            return null;
        }
    };

    const carregar = async () => {
        try {
            setLoading(true);
            setImageError(false);
            setRetryCount(0); // Reseta as tentativas ao recarregar

            const userId = await AsyncStorage.getItem("idUsers");

            if (!userId) {
                setUserData({ nomeUsers: "Usuário" });
                setLoading(false);
                return;
            }

            setId(userId);

            const dados = await selectInfo();
            setInfo(dados);

            const userInfo = await carregarDadosUsuarioEspecifico(userId);

            if (userInfo) {
                setUserData(userInfo);

                // ✅ CARREGA IMAGEM DIRETAMENTE DO SERVIDOR (SEM CACHE)
                await carregarImagemPerfil(userInfo, userId);

                // ✅ VERIFICA SE O ENDEREÇO ESTÁ COMPLETO
                const enderecoCompleto = await verificarEnderecoCompleto(userId);

                // ✅ MOSTRA MODAL APENAS SE O ENDEREÇO NÃO ESTIVER COMPLETO
                setModalVisible(!enderecoCompleto);
            } else {
                setUserData({ nomeUsers: "Usuário" });
                // Se não conseguiu carregar dados do usuário, mostra o modal
                setModalVisible(true);
            }

        } catch (erro) {
            console.error("Erro geral ao carregar dados:", erro);
            setImageError(true);
            setUserData({ nomeUsers: "Usuário" });
            // Em caso de erro, mostra o modal por segurança
            setModalVisible(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        carregar();

        const unsubscribe = navigation.addListener('focus', () => {
            carregar();
            // Recarrega as notícias quando a tela ganha foco
            carregarNoticiasParaHome();
        });

        return unsubscribe;
    }, [navigation]);

    // ✅ EFFECT PARA VERIFICAR MUDANÇAS NO USER ID
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

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator
                    size="large"
                    color={Colors[temaCor]}
                />
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.nav}>
                    <View style={styles.navIcons}>
                        <Pressable style={styles.navMenu1} onPress={pickImageFromGallery}>
                            {photoUri ? (
                                <Image
                                    key={imageKey}
                                    source={{ uri: photoUri }}
                                    style={{ width: width * 0.12, height: width * 0.12, borderWidth: 2, borderColor: '#fff', borderRadius: width * 0.06, }}
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
                                <Text style={{ color: 'white', fontSize: 20, borderWidth: 0.1 }}>
                                    {userData.nomeUsers ? userData.nomeUsers[0] : 'U'}
                                </Text>
                            )}
                            {uploading && (
                                <View style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    borderRadius: width * 0.06,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <ActivityIndicator size="small" color="#fff" />
                                </View>
                            )}
                        </Pressable>
                        <View style={styles.navMenu3}>
                            <Text style={styles.navText}>{texto[6]}, {userData.nomeUsers || "Usuário"} </Text>
                        </View>
                        <Pressable style={styles.navMenu2} onPress={() => setNotificar(prev => !prev)}>
                            <MaterialIcons name={notificar ? 'notifications-active' : 'notifications-off'} size={35} color='#fff' />
                        </Pressable>
                    </View>
                </View>

                {/* ✅ CARROSSEL COM NOTÍCIAS DO BANCO */}
                <View style={styles.carrosel}>
                    {loadingNoticias ? (
                        <View style={styles.noticiaCard}>
                            <View style={styles.noticiaLoading}>
                                <ActivityIndicator size="large" color={temaCor[Colors]} />
                                <Text style={styles.loadingText}>Carregando notícias...</Text>
                            </View>
                        </View>
                    ) : noticias.length > 0 ? (
                        <View style={styles.noticiaCard}>
                            {loadingImg && (
                                <ActivityIndicator
                                    size="large"
                                    color={Colors[temaCor]}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: [{ translateX: -15 }, { translateY: -15 }],
                                        zIndex: 10,
                                    }}
                                />
                            )}

                            <Image
                                source={{ uri: noticias[currentNewsIndex].imagem }}
                                style={styles.noticiaImage}
                                resizeMode="cover"
                                onLoadStart={() => setLoadingImg(true)}
                                onLoadEnd={() => setLoadingImg(false)}
                            />

                            <View style={styles.noticiaContent}>
                                <Text style={styles.noticiaTitulo} numberOfLines={2}>
                                    {noticias[currentNewsIndex].titulo}
                                </Text>
                            </View>

                            {/* ✅ INDICADORES DE PÁGINA (APENAS SE HOUVER MAIS DE 1 NOTÍCIA) */}
                            {noticias.length > 1 && (
                                <View style={styles.indicatorsContainer}>
                                    {noticias.map((_, index) => (
                                        <View
                                            key={index}
                                            style={[
                                                styles.indicator,
                                                index === currentNewsIndex && styles.activeIndicator
                                            ]}
                                        />
                                    ))}
                                </View>
                            )}

                            {/* ✅ BOTÕES DE NAVEGAÇÃO (APENAS SE HOUVER MAIS DE 1 NOTÍCIA) */}
                            {noticias.length > 1 && (
                                <>
                                    <Pressable style={styles.prevButton} onPress={goToPrevNews}>
                                        <Ionicons name="chevron-back" size={24} color="#fff" />
                                    </Pressable>
                                    <Pressable style={styles.nextButton} onPress={goToNextNews}>
                                        <Ionicons name="chevron-forward" size={24} color="#fff" />
                                    </Pressable>
                                </>
                            )}
                        </View>
                    ) : (
                        <View style={styles.noticiaCard}>
                            <View style={styles.noticiaPlaceholder}>
                                <Ionicons name="newspaper-outline" size={50} color={Colors[temaCor]} />
                                <Text style={styles.placeholderText}>Nenhuma notícia disponível</Text>
                            </View>
                        </View>
                    )}
                </View>

                <FlatList
                    style={styles.options}
                    data={data}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Pressable onPress={item.press}>
                            <View style={styles.item}>
                                {item.icon}
                                <Text style={styles.text}>{item.title}</Text>
                            </View>
                        </Pressable>
                    )}
                />
                <View style={styles.geralOptionsArea}>
                    <Pressable onPress={() => [navigation.navigate('PDocumentos', { tipo: 'identificacao' }), console.log('aaaaaaaaaaaaaaaa')]} style={styles.geralOptionsBtn}>
                        <AntDesign name="idcard" size={height * 0.05} style={styles.geralOptionsIcon} color={Colors[temaCor]} />
                        <Text style={styles.geralOptionsText}>{texto[8]}</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('PDocumentos', { tipo: 'saude' })} style={styles.geralOptionsBtn}>
                        <FontAwesome6 name="heart-pulse" size={height * 0.05} style={styles.geralOptionsIcon} color={Colors[temaCor]} />
                        <Text style={styles.geralOptionsText}>{texto[7]}</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('Emergencia')} style={styles.geralOptionsBtn}>
                        <AntDesign name="contacts" size={height * 0.05} style={styles.geralOptionsIcon} color={Colors[temaCor]} />
                        <Text style={styles.geralOptionsText}>{texto[9]}</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('PDocumentos', { tipo: 'locais' })} style={styles.geralOptionsBtn}>
                        <Octicons name="location" size={height * 0.05} style={styles.geralOptionsIcon} color={Colors[temaCor]} />
                        <Text style={styles.geralOptionsText}>{texto[10]}</Text>
                    </Pressable>

                </View>
                <AudioRecorder visible={mAudio} onClose={() => setMAudio(false)} />

                {/* ✅ MODAL APARECE APENAS SE O ENDEREÇO NÃO ESTIVER COMPLETO */}
                <Modal animationType="slide" transparent={true} visible={modalVisible} style={styles.modalMapa}>
                    <View style={styles.modalMapaMoldura}>
                        <Pressable style={styles.modalClose} onPress={() => setModalVisible(false)}>
                            <Ionicons name="close-circle-outline" size={60} color={Colors[temaCor]} />
                        </Pressable>
                        <Image source={require('./img/Mapa.png')} style={styles.mapaImg}></Image>
                        <Text style={styles.mapaText}>{texto[11]}</Text>
                        <Pressable onPress={() => {
                            setModalVisible(false);
                            navigation.navigate('Logradouro');
                        }}>
                            <View style={styles.botCont}>
                                <Ionicons name="location" size={40} color={Colors[temaCor]} />
                                <Text style={{ color: Colors[temaCor], fontSize: 30 }}>Cadastrar</Text>
                            </View>
                        </Pressable>
                    </View>
                </Modal>

            </ScrollView>
            <BubbleArea />
        </View>
    );
}