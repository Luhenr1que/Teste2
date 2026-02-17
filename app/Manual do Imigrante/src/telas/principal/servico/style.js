// style.js (estilos atualizados)
import { StyleSheet, Dimensions } from 'react-native'
import { useTheme, Colors } from '../../../../themeContext';

export default function getStyles(isDarkMode) {
    const { temaCor } = useTheme();
    const { width, height } = Dimensions.get('window');

    const background = isDarkMode ? '#313131ff' : '#ffffffff'
    const cardBackground = isDarkMode ? '#1E1E1E' : '#ebebebff'
    const font = isDarkMode ? '#ffffffff' : "#000000ff"
    const secondaryFont = isDarkMode ? '#cccccc' : "#666666"

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: background,
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: background,
        },
        loadingText: {
            marginTop: 20,
            fontSize: 16,
            color: font,
        },
        nav: {
            width: '100%',
            height: height * 0.13,
            backgroundColor: Colors[temaCor],
            borderBottomEndRadius: 20,
            borderBottomStartRadius: 20,
            marginBottom: 5,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        navTitu: {
            fontSize: 35,
            fontWeight: 'bold',
            color: '#ffffff',
            top: '-15%',
        },
        progressBar: {
            flexDirection: 'row',
            display: 'flex',
            alignItems: 'center',
            width: '95%',
            top: '-5%',
            height: '6%',
        },
        bar: {
            width: '14%',
            height: '100%',
            marginHorizontal: 5,
            borderRadius: 3,
        },
        // Novos estilos para os cards compactos
        cardsContainer: {
            flex: 1,
            paddingHorizontal: 15,
        },
        cardsContent: {
            paddingVertical: 15,
            paddingBottom: 30,
        },
        card: {
            backgroundColor: cardBackground,
            borderRadius: 12,
            padding: 12,
            marginBottom: 12,
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
        },
        cardHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
        },
        cardImage: {
            width: width * 0.30,
            height: width * 0.20,
            borderRadius: 8,
            marginRight: 12,
            backgroundColor: isDarkMode ? '#444' : '#ddd',
        },
        cardTitleContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        cardTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: font,
            flex: 1,
            marginRight: 8,
        },
        tipoContainer: {
            backgroundColor: Colors[temaCor] + '20',
            paddingHorizontal: 6,
            paddingVertical: 3,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: Colors[temaCor] + '40',
        },
        cardTipo: {
            fontSize: 9,
            fontWeight: '600',
            color: Colors[temaCor],
        },
        cardDescricao: {
            fontSize: 15,
            color: font,
            lineHeight: 16,
            marginBottom: 8,
        },
        modalOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        },
        modalContainer: {
            backgroundColor: isDarkMode ? '#2d3748' : '#fff',
            borderRadius: 20,
            width: '100%',
            maxHeight: '80%',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        modalHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: isDarkMode ? '#4a5568' : '#e2e8f0',
        },
        modalImage: {
            width: 60,
            height: 60,
            borderRadius: 10,
            marginRight: 15,
        },
        modalTitleContainer: {
            flex: 1,
        },
        modalTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: isDarkMode ? '#fff' : '#000',
            marginBottom: 4,
        },
        modalTipo: {
            fontSize: 14,
            color: isDarkMode ? '#cbd5e0' : '#718096',
            fontStyle: 'italic',
        },
        closeButton: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: isDarkMode ? '#4a5568' : '#e2e8f0',
            justifyContent: 'center',
            alignItems: 'center',
        },
        closeButtonText: {
            fontSize: 24,
            color: isDarkMode ? '#fff' : '#000',
            fontWeight: 'bold',
            lineHeight: 24,
        },
        modalContent: {
            padding: 20,
        },
        modalSection: {
            marginBottom: 25,
        },
        modalSectionTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: isDarkMode ? '#fff' : '#000',
            marginBottom: 10,
        },
        modalSectionText: {
            fontSize: 16,
            lineHeight: 22,
            color: isDarkMode ? '#e2e8f0' : '#4a5568',
            textAlign: 'justify',
        },
        contatoButton: {
            backgroundColor: isDarkMode ? '#3182ce' : '#2b6cb0',
            padding: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: isDarkMode ? '#2c5282' : '#2b6cb0',
        },
        contatoButtonText: {
            color: '#fff',
            fontSize: 16,
            textAlign: 'center',
            fontWeight: '500',
        },
        locationButton: {
            backgroundColor: isDarkMode ? '#38a169' : '#2f855a',
            padding: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: isDarkMode ? '#2d784d' : '#2f855a',
            alignItems: 'center',
        },
        locationButtonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
        },
    });
}