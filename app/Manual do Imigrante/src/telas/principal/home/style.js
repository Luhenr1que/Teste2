import { StyleSheet, Dimensions } from 'react-native'
import { useTheme, Colors } from '../../../../themeContext';


export default function getStyles(isDarkMode) {

    const { temaCor } = useTheme();
    const { width, height } = Dimensions.get('window');


    const background = isDarkMode ? '#313131ff' : '#ffffffff'
    const tituloBack = isDarkMode ? '#ebebebff' : "#1E1E1E"
    const font = isDarkMode ? '#ffffffff' : "#000000ff"

    return StyleSheet.create({

        container: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: background,
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isDarkMode ? '#313131ff' : '#fff',
        },
        loadingText: {
            marginTop: 20,
            fontSize: 16,
            color: isDarkMode ? '#fff' : '#000',
        },
        nav: {
            width: '100%',
            height: height * 0.14,
            backgroundColor: Colors[temaCor],
            display: 'flex',
            flexDirection: 'row',
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
            marginBottom: 5,
        },
        navIcons: {
            marginTop: height * 0.04,
            height: '50%',
            justifyContent: 'space-between',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
        },
        navMenu1: {
            width: '10%',
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            width: width * 0.12,
            height: width * 0.12,
            borderRadius: '50%',
            marginBottom: 1,
            marginRight: 1,
            borderColor: '#ffffff',
            marginLeft: 10,
        },
        navMenu2: {
            width: '15%',
        },
        navMenu3: {
            width: '70%',
            marginLeft: '18%',
        },
        navText: {
            fontSize: 25,
            color: '#fff',
            right: width * 0.18,
        },
        carrosel: {
            width: width,
            height: height * 0.31,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
            
        },
        indicatorsContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: 20,
            borderBottomWidth:2,
            borderRadius:10,
            borderColor: Colors[temaCor],
        },
        indicator: {
            width: 20,
            height: 8,
            borderRadius: 4,
            backgroundColor:isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(123, 123, 123, 0.5)',
            marginHorizontal: 4,
        },
        activeIndicator: {
            backgroundColor: isDarkMode ? '#fff' : '#555555ff',
            width: 20,
        },
        prevButton: {
            position: 'absolute',
            left: 10,
            top: '50%',
            transform: [{ translateY: -12 }],
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 20,
            padding: 8,
        },
        nextButton: {
            position: 'absolute',
            right: 10,
            top: '50%',
            transform: [{ translateY: -12 }],
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 20,
            padding: 8,
        },
        scrollContent: {
            alignItems: 'center',
        },
        noticiaCard: {
            width: width * 0.96,
            marginHorizontal: width * 0.02,
            height: '100%',
            backgroundColor: isDarkMode ? "#1E1E1E" : '#ebebebff',
            borderRadius: 15,
            overflow: 'hidden',
        },
        noticiaImage: {
            width: width,
            height: height * 0.21,
        },
        noticiaContent: {
            padding: 5,
            flex: 1,
            justifyContent: 'center',
        },
        noticiaTitulo: {
            fontSize: 16,
            fontWeight: 'bold',
            color: tituloBack,
            marginBottom: 2,
            textAlign: 'center',
        },
        options: {
            marginTop: 2,
            width: width,
            height: height * 0.12,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#6e6e6e3d',
        },
        item: {
            width: width * 0.20,
            marginHorizontal: width * 0.025,
            marginTop: '5%',
            height: '90%',
            backgroundColor: isDarkMode ? "#1E1E1E" : '#ebebebff',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
        },
        text: {
            top: 5,
            color: font,
            fontSize: 11,
            textAlign: 'center',
            fontWeight: '600',
        },
        geralOptionsArea: {
            marginTop: 10,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        geralOptionsBtn: {
            width: '92%',
            height: height * 0.08,
            backgroundColor: isDarkMode ? "#1E1E1E" : '#ebebebff',
            borderRadius: 10,

            borderColor: '#6e6e6e3d',
            marginTop: 10,
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
        },
        geralOptionsIcon: {
            left: '5%',
        },
        geralOptionsText: {
            left: '8%',
            fontSize: 18,
            color: font,
        },
        modalMapa: {
            height: height,
            width: width,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalMapaMoldura: {
            height: height,
            width: width,
            backgroundColor: isDarkMode ? '#000000cc' : '#ffffffcc',
            alignItems: 'center',
        },
        mapaImg: {
            marginTop: height * 0.0999,
            width: width * 0.87,
            height: height * 0.7,
            resizeMode: 'contain',
            borderWidth: 2,
            borderRadius: 20,
            borderColor: '#ffffff4a'
        },
        mapaText: {
            marginTop: 15,
            width: width * 0.8,
            textAlign: 'center',
            color: '#000',
            fontSize: 32,
            position: 'absolute',
            top: height * 0.22,
            maxWidth: width * 0.7,
            backgroundColor: '#ffffffaa',
            borderRadius: 50,
            padding: 15,
        },
        botCont: {
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: height * 0.02,
            width: width * 0.7,
            height: height * 0.07,
            backgroundColor: isDarkMode ? '#1e1e1ef2' : '#ebebebf5',
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'row',
            borderRadius: 20,
            gap: 15,
            elevation: 10,
        },
        modalClose: {
            position: 'absolute',
            top: width * 0.15,
            left: width * 0.005,
            zIndex: 10,
        },
    })
}