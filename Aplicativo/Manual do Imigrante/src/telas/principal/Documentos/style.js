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
            height: height * 0.14,
            backgroundColor: Colors[temaCor],
            borderBottomEndRadius: 20,
            borderBottomStartRadius: 20,
            marginBottom: 5,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
        },
        navIcons: {
            marginTop: height * 0.04,
            height: '50%',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 20,
        },
        navMenu1: {
            width: width * 0.12,
            height: width * 0.12,
            borderRadius: width * 0.06,
            borderWidth: 2,
            borderColor: '#ffffff',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.2)',
        },
        navMenu2: {
            width: '15%',
            alignItems: 'center',
        },
        navMenu3: {
            flex: 1,
            marginLeft: 15,
        },
        navText: {
            fontSize: 22,
            color: '#fff',
            fontWeight: '600',
            letterSpacing: 0.5,
        },
        options: {
            marginTop: 15,
            width: width,
            height: height * 0.14,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: isDarkMode ? '#444' : '#e0e0e0',
            backgroundColor: background,
            alignItems: 'center',
            justifyContent: 'center',
        },
        camBot: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '90%',
            height: '80%',
            backgroundColor: cardBackground,
            borderRadius: 16,
            borderLeftWidth: 4,
            borderRightWidth: 4,
            borderRightColor: Colors[temaCor],
            borderLeftColor: Colors[temaCor],
        },
        camBotText:{
            marginLeft: 12,
            color: font,
            fontSize: 20,
            fontWeight: '600',
        },
        item: {
            width: width * 0.28,
            marginHorizontal: width * 0.02,
            marginTop: 10,
            height: '80%',
            backgroundColor: cardBackground,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 16,
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            paddingVertical: 10,
        },
        text: {
            marginTop: 8,
            color: font,
            fontSize: 12,
            textAlign: 'center',
            fontWeight: '600',
            lineHeight: 16,
        },
        geralOptionsArea: {
            marginTop: 20,
            paddingHorizontal: 16,
            paddingBottom: 30,
        },
        geralOptionsBtn: {
            width: '100%',
            height: height * 0.1,
            backgroundColor: cardBackground,
            borderRadius: 16,
            marginTop: 12,
            alignItems: 'center',
            flexDirection: 'row',
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            paddingHorizontal: 20,
            borderLeftWidth: 4,
            borderLeftColor: Colors[temaCor],
        },
        geralOptionsIcon: {
            marginRight: 16,
        },
        geralOptionsText: {
            flex: 1,
            fontSize: 18,
            fontWeight: '600',
            color: font,
            letterSpacing: 0.3,
        },
        // Novos estilos adicionados
        headerTitle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: font,
            textAlign: 'center',
            marginVertical: 20,
            letterSpacing: 0.5,
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: Colors[temaCor],
            marginLeft: 16,
            marginBottom: 12,
            marginTop: 20,
        },
        cardContainer: {
            paddingHorizontal: 16,
        },
        emptyState: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 60,
        },
        emptyStateText: {
            fontSize: 16,
            color: secondaryFont,
            textAlign: 'center',
            marginTop: 12,
            lineHeight: 22,
        },
    });
}