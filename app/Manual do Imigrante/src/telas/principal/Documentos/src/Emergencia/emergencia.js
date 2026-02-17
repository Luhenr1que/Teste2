import React, { useState, useEffect } from "react";
import { Pressable, View, Text, FlatList, Dimensions, Linking, ScrollView } from "react-native";
import { useIdioma } from "../../../../../../idiomaContext";
import { useTheme, Colors } from "../../../../../../themeContext";
import getStyles from "./style";
import { FontAwesome6, AntDesign, Octicons, Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';
import numerosEmergencia from "../../dados/emergenciaDados";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Emergencia({ navigation }) {
    const { temaCor, isDarkMode } = useTheme();
    const styles = getStyles(isDarkMode);

    const { height } = Dimensions.get('window');

    const { textos } = useIdioma();
    const [idiomaNum, setIdiomaNum] = useState(0);

    const idiomaSelecionado = async () => {
        try {
            const idioma = await AsyncStorage.getItem('idioma');
            if (idioma === 'Portugues') {
                setIdiomaNum(0);
            } else if (idioma === 'Inglês') {
                setIdiomaNum(1);
            } else if (idioma === 'Espanhol') {
                setIdiomaNum(2);
            }
        } catch (error) {
            console.log("Erro ao obter o idioma:", error);
        }
    };

    useEffect(() => {
        idiomaSelecionado();
    }, []);

    // Função para fazer ligação
    const fazerLigacao = (numero) => {
        const url = `tel:${numero}`;
        Linking.openURL(url).catch(err => console.log('Erro ao abrir ligação:', err));
    };

    // Adicionar ícones diferentes para cada tipo de emergência
    const getIcon = (id) => {
        switch(id) {
            case 1: // Polícia
                return <MaterialIcons name="local-police" size={height * 0.05} color={Colors[temaCor]} />;
            case 2: // Bombeiros
                return <FontAwesome6 name="fire-extinguisher" size={height * 0.05} color={Colors[temaCor]} />;
            case 3: // Ambulância
                return <FontAwesome6 name="truck-medical" size={height * 0.05} color={Colors[temaCor]} />;
            case 4: // Defesa Civil
                return <Feather name="tool" size={height * 0.05} color={Colors[temaCor]} />;
            case 5: // SAMU
                return <FontAwesome6 name="heart-pulse" size={height * 0.05} color={Colors[temaCor]} />;
            case 6: // Centro Toxicológico
                return <MaterialIcons name="science" size={height * 0.05} color={Colors[temaCor]} />;
            default:
                return <Octicons name="alert" size={height * 0.05} color={Colors[temaCor]} />;
        }
    };

    // Renderizar cada item do FlatList
    const renderItem = ({ item }) => (
        <Pressable
            style={styles.geralOptionsBtn}
            onPress={() => Linking.openURL(`tel:${item.numero}`)}  
        >
            <View style={styles.geralOptionsIcon}>
                {getIcon(item.id)}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.geralOptionsText}>
                    {item.nome[idiomaNum]}
                </Text>
                <Text style={styles.numeroText}>
                    {item.numero}
                </Text>
            </View>
            <MaterialIcons style={styles.phoneIcon} name="phone" size={height * 0.035} color={Colors[temaCor]} />
        </Pressable>
    );

    // Separador entre os itens
    const ItemSeparator = () => (
        <View style={styles.separator} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={height * 0.035} color={Colors[temaCor]} />
                </Pressable>
                <Text style={styles.headerTitle}>Números de Emergência</Text>
            </View>

            {/* Conteúdo principal com margem superior */}
            <View style={styles.content}>
                <FlatList
                    data={numerosEmergencia}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={ItemSeparator}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContent}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Nenhum item disponível</Text>
                        </View>
                    }
                />
            </View>
        </View>
    );
}