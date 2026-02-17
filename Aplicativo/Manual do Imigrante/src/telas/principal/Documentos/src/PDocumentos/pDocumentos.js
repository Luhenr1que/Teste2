import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Dimensions, Image, Modal, ScrollView, Alert } from "react-native";
import { useIdioma } from "../../../../../../idiomaContext";
import { useTheme, Colors } from "../../../../../../themeContext";
import getStyles from "./style";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from '@react-navigation/native';
import BubbleArea from '../../../Bolha/areaBolha';
import dados from "../../dados/idDocuments";

export default function PDocumentos({ navigation }) {
    const route = useRoute();
    const { tipo, tipoDocumento, abrirModalAutomaticamente } = route.params || {};

    const { temaCor, isDarkMode } = useTheme();
    const styles = getStyles(isDarkMode);
    const { width, height } = Dimensions.get('window');
    const { textos } = useIdioma();
    const texto = textos?.docs || [];

    const [idiomaNum, setIdiomaNum] = useState(0);
    const [historico, setHistorico] = useState([]);

    // MODAL PRINCIPAL
    const [modalVisible, setModalVisible] = useState(false);
    const [docSelecionado, setDocSelecionado] = useState(null);

    // SUBMODAL DE TIPO
    const [tipoModalVisible, setTipoModalVisible] = useState(false);
    const [tipoSelecionado, setTipoSelecionado] = useState(null);

    useEffect(() => {
        console.log("📥 PDocumentos - PARÂMETROS RECEBIDOS:", { tipo, tipoDocumento, abrirModalAutomaticamente });
        
        idiomaSelecionado();
        carregarHistorico();
        
        // Se veio da câmera com flag para abrir modal automaticamente
        if (abrirModalAutomaticamente && tipoDocumento) {
            console.log("🚀 ABRINDO MODAL AUTOMATICAMENTE para documento:", tipoDocumento);
            const documentoEncontrado = encontrarDocumentoPorTipo(tipoDocumento);
            if (documentoEncontrado) {
                console.log("✅ DOCUMENTO ENCONTRADO:", documentoEncontrado.nome[0]);
                setDocSelecionado(documentoEncontrado);
                setModalVisible(true);
            } else {
                console.log("❌ DOCUMENTO NÃO ENCONTRADO:", tipoDocumento);
            }
        }
    }, [tipo, tipoDocumento, abrirModalAutomaticamente]);

    const encontrarDocumentoPorTipo = (tipoDocumento) => {
        console.log("🔍 BUSCANDO DOCUMENTO:", tipoDocumento);
        
        // Procura em todos os documentos pelo tipo identificado
        for (let categoria in dados) {
            for (let key in dados[categoria]) {
                const doc = dados[categoria][key];
                // Compara o tipo recebido com as chaves dos documentos
                if (key === tipoDocumento) {
                    console.log("✅ ENCONTRADO NA CATEGORIA:", categoria);
                    return doc;
                }
            }
        }
        console.log("❌ DOCUMENTO NÃO ENCONTRADO EM NENHUMA CATEGORIA");
        return null;
    };

    const idiomaSelecionado = async () => {
        try {
            const idioma = await AsyncStorage.getItem('idioma');
            if (idioma === 'Portugues') setIdiomaNum(0);
            else if (idioma === 'Inglês') setIdiomaNum(1);
            else if (idioma === 'Espanhol') setIdiomaNum(2);
        } catch (error) {
            console.log("Erro ao obter o idioma:", error);
        }
    };

    const carregarHistorico = async () => {
        try {
            const data = await AsyncStorage.getItem('historicoDocs');
            if (data) {
                setHistorico(JSON.parse(data));
            }
        } catch (error) {
            console.log("Erro ao carregar histórico:", error);
        }
    };

    const salvarHistorico = async (novoHistorico) => {
        setHistorico(novoHistorico);
        await AsyncStorage.setItem('historicoDocs', JSON.stringify(novoHistorico));
    };

    const navegarPara = async (proximoTipo) => {
        const novoHistorico = [...historico, tipo];
        await salvarHistorico(novoHistorico);
        navigation.navigate('PDocumentos', { tipo: proximoTipo });
    };

    const voltar = async () => {
        if (historico.length > 0) {
            const novoHistorico = [...historico];
            const ultimaTela = novoHistorico.pop();
            await salvarHistorico(novoHistorico);
            navigation.navigate('PDocumentos', { tipo: ultimaTela });
        } else {
            navigation.goBack();
        }
    };

    const abrirModal = (doc) => {
        setDocSelecionado(doc);
        setModalVisible(true);
    };

    const fecharModal = () => {
        setModalVisible(false);
        setDocSelecionado(null);
    };

    const abrirTipoModal = (tipoObj) => {
        setTipoSelecionado(tipoObj);
        setTipoModalVisible(true);
    };

    const fecharTipoModal = () => {
        setTipoModalVisible(false);
        setTipoSelecionado(null);
    };

    // DETERMINAR O QUE MOSTRAR NA TELA
    let conteudoTela = null;

    // MODO 1: Veio da câmera - mostra apenas o documento específico
    if (abrirModalAutomaticamente && tipoDocumento) {
        const documentoEspecifico = encontrarDocumentoPorTipo(tipoDocumento);
        conteudoTela = documentoEspecifico ? (
            <Pressable key={tipoDocumento} onPress={() => abrirModal(documentoEspecifico)} style={styles.card}>
                <Image
                    source={documentoEspecifico.imagem}
                    style={{ width: width, height: height * 0.2, marginBottom: 10, alignSelf: 'center' }}
                    resizeMode="contain"
                />
                <View style={styles.line} />
                <Text style={styles.title}>{documentoEspecifico.nome[idiomaNum]}</Text>
            </Pressable>
        ) : (
            <Text style={styles.noDataText}>Documento "{tipoDocumento}" não encontrado</Text>
        );
    }
    // MODO 2: Navegação normal - mostra todos os documentos da categoria
    else if (tipo && dados[tipo]) {
        const dadosDocumento = dados[tipo];
        conteudoTela = Object.keys(dadosDocumento).length === 0 ? (
            <Text style={styles.noDataText}>{texto[9]}</Text>
        ) : (
            Object.entries(dadosDocumento).map(([key, doc]) => (
                <Pressable key={key} onPress={() => abrirModal(doc)} style={styles.card}>
                    <Image
                        source={doc.imagem}
                        style={{ width: width, height: height * 0.2, marginBottom: 10, alignSelf: 'center' }}
                        resizeMode="contain"
                    />
                    <View style={styles.line} />
                    <Text style={styles.title}>{doc.nome[idiomaNum]}</Text>
                </Pressable>
            ))
        );
    }
    // MODO 3: Sem parâmetros válidos
    else {
        conteudoTela = <Text style={styles.noDataText}>Selecione uma categoria</Text>;
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Pressable
                        style={styles.backButton}
                        onPress={voltar}
                    >
                        <Ionicons name="arrow-back" size={height * 0.035} color={Colors[temaCor]} />
                    </Pressable>
                </View>
                
                {/* Mostrar título baseado no modo */}
                {abrirModalAutomaticamente && tipoDocumento ? (
                    <View style={styles.scannedInfo}>
                        <Text style={styles.scannedTitle}>Documento Identificado</Text>
                        <Text style={styles.scannedText}>Clique no documento para ver detalhes</Text>
                    </View>
                ) : (
                    <Text style={styles.categoryTitle}>
                        {tipo === 'identificacao' ? 'Documentos de Identificação' :
                         tipo === 'veiculos' ? 'Documentos de Veículos' :
                         tipo === 'transporteP' ? 'Documentos de Transporte' :
                         tipo === 'saude' ? 'Documentos de Saúde' : 'Documentos'}
                    </Text>
                )}

                <View style={styles.content}>
                    {conteudoTela}
                </View>

                {/* MODAL PRINCIPAL */}
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={fecharModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {docSelecionado && (
                                    <>
                                        <Text style={styles.modalTitle}>{docSelecionado.nome[idiomaNum]}</Text>
                                        {docSelecionado.imagem && (
                                            <>
                                                <Text style={styles.sectionTitle}>{texto[0]}</Text>
                                                <Image
                                                    source={docSelecionado.imagem}
                                                    style={styles.image}
                                                    resizeMode="contain"
                                                />
                                            </>
                                        )}

                                        <Text style={styles.sectionTitle}>{texto[1]}</Text>
                                        <Text style={styles.text}>{docSelecionado.descricao[idiomaNum]}</Text>

                                        <Text style={styles.sectionTitle}>{texto[2]}</Text>
                                        {docSelecionado.camposPrincipais && docSelecionado.camposPrincipais.map((campo, i) => (
                                            <Text key={i} style={styles.text}>• {campo[idiomaNum]}</Text>
                                        ))}

                                        <Text style={styles.sectionTitle}>{texto[3]}</Text>
                                        <Text style={styles.text}>{docSelecionado.validade && docSelecionado.validade[idiomaNum]}</Text>

                                        <Text style={styles.sectionTitle}>{texto[4]}</Text>
                                        {docSelecionado.usoComum && docSelecionado.usoComum.map((uso, i) => (
                                            <Text key={i} style={styles.text}>• {uso[idiomaNum]}</Text>
                                        ))}

                                        {/* SEÇÃO DE REQUISITOS */}
                                        {docSelecionado.requisitos && (
                                            <>
                                                <Text style={styles.sectionTitle}>{texto[7] || "Requisitos"}</Text>
                                                <View style={styles.requisitosContainer}>
                                                    {docSelecionado.requisitos.map((requisito, index) => (
                                                        <Pressable
                                                            key={index}
                                                            style={({ pressed }) => [
                                                                styles.requisitoItem,
                                                                { opacity: pressed ? 0.7 : 1 }
                                                            ]}
                                                        >
                                                            <View style={styles.requisitoIcon}>
                                                                <Ionicons
                                                                    name="document-text-outline"
                                                                    size={16}
                                                                    color={Colors[temaCor]}
                                                                />
                                                            </View>
                                                            <Text style={styles.requisitoText}>
                                                                {requisito[idiomaNum]}
                                                            </Text>
                                                        </Pressable>
                                                    ))}
                                                </View>
                                            </>
                                        )}

                                        {docSelecionado.tipos && (
                                            <>
                                                <Text style={styles.sectionTitle}>{texto[5]}</Text>
                                                {docSelecionado.tipos.map((t, index) => (
                                                    <Pressable
                                                        key={index}
                                                        style={styles.tipoButton}
                                                        onPress={() => abrirTipoModal(t)}
                                                    >
                                                        <Text style={styles.tipoButtonText}>{t.tipo[idiomaNum]}</Text>
                                                    </Pressable>
                                                ))}
                                            </>
                                        )}

                                        {docSelecionado.local && (
                                            <View>
                                                <Text style={styles.sectionTitle}>{texto[10]}</Text>
                                                <Pressable
                                                    onPress={() => navigation.navigate('Mapa', {
                                                        local: docSelecionado.local,
                                                        tipoFiltro: 'custom'
                                                    })}
                                                    style={styles.mapContainer}
                                                >
                                                    <Ionicons name="location-outline" size={60} color={Colors[temaCor]} style={styles.mapIcon} />
                                                </Pressable>
                                            </View>
                                        )}
                                    </>
                                )}
                            </ScrollView>

                            <Pressable onPress={fecharModal} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>{texto[6]}</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                {/* SUBMODAL DE TIPO */}
                <Modal
                    visible={tipoModalVisible}
                    animationType="fade"
                    transparent={true}
                    onRequestClose={fecharTipoModal}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            {tipoSelecionado && (
                                <>
                                    <Text style={styles.modalTitle}>{tipoSelecionado.tipo[idiomaNum]}</Text>
                                    <Text style={styles.text}>{tipoSelecionado.descricao[idiomaNum]}</Text>

                                    {tipoSelecionado.imagem && (
                                        <Image
                                            source={tipoSelecionado.imagem}
                                            style={styles.image}
                                            resizeMode="contain"
                                        />
                                    )}
                                </>
                            )}
                            <Pressable onPress={fecharTipoModal} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>{texto[6]}</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
            <BubbleArea />
        </View>
    );
}