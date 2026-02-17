import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function getStyles(isDarkMode) {

    const backgroundColor = isDarkMode ? '#313131ff' : '#ffffffff';
    const backgroundColorBotoes = isDarkMode ? '#186858ff' : '#186858ff';
    const textColor = isDarkMode ? "#fff" : "#131F3C";
    const textLoginColor1 = isDarkMode ? "#fff" : '#40666B';
    const textLoginColor2 = isDarkMode ? "#1b6abdff" : '#1812cdff';
    return StyleSheet.create({
        botoes: {
            marginTop: 25,
            display: 'flex',
            flexDirection: 'row',
            height: height * 0.1,
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            backgroundColor: backgroundColorBotoes,
            marginBottom: '1%',
            paddingHorizontal: 20,
        },
        backButton: {
            width: 50,
            height: 50,
            backgroundColor: 'rgba(255,255,255,0.2)',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 25,
        },
        languageButton: {
            width: 50,
            height: 50,
            backgroundColor: 'rgba(255,255,255,0.2)',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 25,
        },
        container: {
            minHeight: '85%',
            width: '98%',
            backgroundColor: backgroundColor,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
        },
        titulo: {
            marginTop: 20,
            textAlign: 'center',
            width: '90%',
            borderRadius: 15,
            paddingHorizontal: 10,
            fontSize: 20,
            color: textColor,
            textAlign: 'center',
            fontFamily: 'inter',
            fontWeight: 600,
        },
        textInput: {
            marginTop: 5,
            width: '80%',
            height: 70,
            borderBottomWidth: 2,
            borderColor: isDarkMode ? "#fff" : "#000",
            borderRadius: 0,
            paddingHorizontal: 10,
            fontSize: 20,
            color: isDarkMode ? "#fff" : "#000",
            fontWeight: '600',
        },
        textBtn: {
            color: '#fff',
            fontSize: 28,
            textAlignVertical: 'center',
            textAlign: 'center',
            fontWeight: 600,
        },
        btn: {
            marginTop: 20,
            width: '70%',
            padding: 10,
            borderRadius: 25,

        },
        gradient: {
            width: '100%',
            paddingVertical: 12,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
        },
        ModalConatiner: {
            width: '100%',
            height: '100%',
            backgroundColor: '#454545d8',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

        },
        ModalBox: {
            width: '80%',
            height: '25%',
            backgroundColor: '#fff',
            top: '24%',
            borderRadius: 50,
            justifyContent: 'center',
            left: '10%',
        },

        tituMIni: {
            fontWeight: '600',
            fontSize: 45,
            color: '#fff',
            top: '15%',
            textAlign: 'center',
        },

        textMIni: {
            lineHeight: 28,
            fontWeight: '500',
            fontSize: 22,
            color: '#000',
            lineHeight: 24,
            textAlign: 'center',
            paddingHorizontal: 10,
            marginBottom: 20,
        },
        imgMIni: {
            width: width,
            height: height * 0.44,
            top: '29%',
        },
        scrollContainer: {
            width: '100%',
            flex: 1,
        },
        pickerContainer: {
            marginTop: 5,
            width: '80%',
            height: 70,
            borderBottomWidth: 2,
            borderColor: isDarkMode ? "#fff" : "#000",
            borderRadius: 0,
            paddingHorizontal: 10,
            fontSize: 20,
            color: isDarkMode ? "#fff" : "#000",
            fontWeight: '600',
        },
        picker: {
            width: '100%',
            color: '#40666B',
            height: '100%',
        },
        pickerText: {
            fontSize: 22,
            fontWeight: '600',
        }
    })
}
