import { StyleSheet, Dimensions } from 'react-native'
import { useTheme, Colors } from '../../../../../../themeContext'

export default function getStyles(isDarkMode){
    const { temaCor } = useTheme();
    const { width, height } = Dimensions.get('window');

    const background = isDarkMode ? '#313131ff' : '#ffffffff'
    const font = isDarkMode ? '#ffffffff' : "#000000ff" 

    return StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: background,
        },
        // Header com botão de voltar
        header: {
            width: '100%',
            height: height * 0.12,
            backgroundColor: isDarkMode ? '#2A2A2A' : '#F8F8F8',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: width * 0.04,
            borderBottomWidth: 1,
            borderBottomColor: isDarkMode ? '#444' : '#E0E0E0',
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
        },
        backButton: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 8,
            backgroundColor: isDarkMode ? '#3A3A3A' : '#F0F0F0',
        },
        backButtonText: {
            fontSize: width * 0.04,
            color: Colors[temaCor],
            fontWeight: '600',
            marginLeft: 8,
        },
        headerTitle: {
            fontSize: width * 0.05,
            fontWeight: 'bold',
            color: font,
            marginLeft: width * 0.05,
            flex: 1,
        },
        // Conteúdo principal com margem
        content: {
            flex: 1,
            marginTop: height * 0.02, // Margem para abaixar a tela
        },
        flatListContent: {
            paddingVertical: 10,
            paddingHorizontal: width * 0.04,
        },
        geralOptionsBtn: {
            width: '100%',
            height: height * 0.13,
            backgroundColor: isDarkMode ? "#1E1E1E" : '#ebebebff',
            borderRadius: 10,
            borderColor: '#6e6e6e3d',
            marginVertical: 5,
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: width * 0.04,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
        },
        geralOptionsIcon: {
            marginRight: width * 0.04,
            justifyContent: 'center',
            alignItems: 'center',
            width: width * 0.15,
        },
        textContainer: {
            flex: 1,
        },
        geralOptionsText: {
            fontSize: width * 0.045,
            color: font,
            fontWeight: '500',
            marginBottom: 4,
        },
        numeroText: {
            fontSize: width * 0.04,
            color: isDarkMode ? '#cccccc' : '#666666',
            fontWeight: '400',
        },
        phoneIcon: {
            marginRight: width * 0.02,
        },
        separator: {
            height: 8,
        },
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 50,
        },
        emptyText: {
            fontSize: 16,
            color: font,
            textAlign: 'center',
        },
    });
}