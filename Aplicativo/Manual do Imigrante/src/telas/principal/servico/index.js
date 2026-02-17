// Servico.js
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    Pressable,
    ScrollView,
    Image,
    Modal,
    TouchableOpacity,
    Linking
} from "react-native";
import { useTheme } from "../../../../themeContext";
import getStyles from "./style";
import GestureRecognizer from 'react-native-swipe-gestures';
import { textosServicos, cards } from "./dados";


export default function Servico({ navigation }) {
    const { temaCor, isDarkMode } = useTheme();
    const styles = getStyles(isDarkMode);

    const [titulos, setTitulos] = useState([]);
    const [dadosCards, setDadosCards] = useState([]);
    const [pagina, setPagina] = useState(0);
    const [carregando, setCarregando] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [cardSelecionado, setCardSelecionado] = useState(null);

    // Carrega textos do AsyncStorage
    const carregarTextos = async () => {
        const titulosCarregados = await textosServicos();
        const cardsCarregados = await cards();
        setTitulos(titulosCarregados);
        setDadosCards(cardsCarregados);
        setCarregando(false);
    };

    useEffect(() => {
        carregarTextos();

        // Verifica mudanças no idioma a cada 1s
        const interval = setInterval(carregarTextos, 1000);
        return () => clearInterval(interval);
    }, []);

    const scroll = (lado) => {
        if (lado === 'esquerda') setPagina(pagina === 0 ? 5 : pagina - 1);
        else if (lado === 'direita') setPagina(pagina === 5 ? 0 : pagina + 1);
    };

    const abrirModal = (card) => {
        setCardSelecionado(card);
        setModalVisible(true);
    };

    const fecharModal = () => {
        setModalVisible(false);
        setCardSelecionado(null);
    };

    const handleContatoPress = (contato) => {
        // Extrai telefones do texto de contato
        const telefones = contato.match(/\(\d{2}\)\s\d{4,5}-\d{4}/g);
        if (telefones && telefones.length > 0) {
            // Pega o primeiro telefone encontrado
            const telefone = telefones[0].replace(/\D/g, '');
            Linking.openURL(`tel:${telefone}`);
        }

        // Extrai URLs do texto de contato
        const urls = contato.match(/www\.\S+/g);
        if (urls && urls.length > 0) {
            const url = urls[0];
            Linking.openURL(`https://${url}`);
        }
    };

    if (carregando || titulos.length === 0 || dadosCards.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={isDarkMode ? "#fff" : "#000"} />
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        );
    }

    const cardsAtuais = dadosCards[pagina] || [];

    return (
        <GestureRecognizer
            onSwipeLeft={() => scroll('direita')}
            onSwipeRight={() => scroll('esquerda')}
            style={styles.container}
        >
            <View style={styles.nav}>
                <Text style={styles.navTitu}>{titulos[pagina]}</Text>

                <View style={styles.progressBar}>
                    <Pressable onPress={() => setPagina(0)} style={[styles.bar, { backgroundColor: pagina == 0 ? '#e5e5e5ff' : '#cdcdcd64' }]} />
                    <Pressable onPress={() => setPagina(1)} style={[styles.bar, { backgroundColor: pagina == 1 ? '#e5e5e5ff' : '#cdcdcd64' }]} />
                    <Pressable onPress={() => setPagina(2)} style={[styles.bar, { backgroundColor: pagina == 2 ? '#e5e5e5ff' : '#cdcdcd64' }]} />
                    <Pressable onPress={() => setPagina(3)} style={[styles.bar, { backgroundColor: pagina == 3 ? '#e5e5e5ff' : '#cdcdcd64' }]} />
                    <Pressable onPress={() => setPagina(3)} style={[styles.bar, { backgroundColor: pagina == 4 ? '#e5e5e5ff' : '#cdcdcd64' }]} />
                    <Pressable onPress={() => setPagina(3)} style={[styles.bar, { backgroundColor: pagina == 5 ? '#e5e5e5ff' : '#cdcdcd64' }]} />
                </View>
            </View>

            <ScrollView
                style={styles.cardsContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.cardsContent}
            >
                {cardsAtuais.map((card, index) => (
                    <Pressable
                        key={index}
                        style={styles.card}
                        onPress={() => abrirModal(card)}
                    >
                        <View style={styles.cardHeader}>
                            <Image
                                source={card.imagem_url}
                                style={styles.cardImage}
                            />
                            <View style={styles.cardTitleContainer}>
                                <Text style={styles.cardTitle} numberOfLines={2}>
                                    {card.nome}
                                </Text>
                            </View>
                        </View>

                        {/* Descrição compacta */}
                        <Text style={styles.cardDescricao} numberOfLines={3}>
                            {card.descricao}
                        </Text>

                    </Pressable>
                ))}
            </ScrollView>

            {/* Modal de informações completas */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={fecharModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        {cardSelecionado && (
                            <>
                                <View style={styles.modalHeader}>
                                    <Image
                                        source={cardSelecionado.imagem_url}
                                        style={styles.modalImage}
                                    />
                                    <View style={styles.modalTitleContainer}>
                                        <Text style={styles.modalTitle}>
                                            {cardSelecionado.nome}
                                        </Text>
                                        <Text style={styles.modalTipo}>
                                            {cardSelecionado.tipo}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.closeButton}
                                        onPress={fecharModal}
                                    >
                                        <Text style={styles.closeButtonText}>×</Text>
                                    </TouchableOpacity>
                                </View>

                                <ScrollView style={styles.modalContent}>
                                    <View style={styles.modalSection}>
                                        <Text style={styles.modalSectionTitle}>
                                            Descrição
                                        </Text>
                                        <Text style={styles.modalSectionText}>
                                            {cardSelecionado.descricao}
                                        </Text>
                                    </View>

                                    <View style={styles.modalSection}>
                                        <Text style={styles.modalSectionTitle}>
                                            Contato
                                        </Text>
                                        <Pressable
                                            style={styles.contatoButton}
                                            onPress={() => handleContatoPress(cardSelecionado.contato)}
                                        >
                                            <Text style={styles.contatoButtonText}>
                                                {cardSelecionado.contato}
                                            </Text>
                                        </Pressable>
                                    </View>

                                    {/* Botão de Localização - aparece apenas se tiver tipoFiltro */}
                                    {cardSelecionado.tipoFiltro && (
                                        <View style={styles.modalSection}>
                                            <Text style={styles.modalSectionTitle}>
                                                Localização
                                            </Text>
                                            <Pressable
                                                style={styles.locationButton}
                                                onPress={() => {
                                                    fecharModal();
                                                    navigation.navigate('Mapa', {
                                                        tipoFiltro: cardSelecionado.tipoFiltro
                                                    });
                                                }}
                                            >
                                                <Text style={styles.locationButtonText}>
                                                        Ver no Mapa
                                                </Text>
                                            </Pressable>
                                        </View>
                                    )}
                                </ScrollView>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </GestureRecognizer>
    );
}