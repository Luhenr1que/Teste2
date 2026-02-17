import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function getStyles(isDarkMode) {

  const backgroundColor = isDarkMode ? '#313131ff' : '#ffffffff';
  const backgroundColorBotoes = isDarkMode ? '#186858ff' : '#186858ff';
  const textColor = isDarkMode ? "#fff" : "#131F3C";
  const textLoginColor1 = isDarkMode ? "#fff" : '#40666B';
  const textLoginColor2 = isDarkMode ? "#1b6abdff" : '#1812cdff';

  console.log(isDarkMode)

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
      borderRadius: 20,
    },
    titulo: {
      marginTop: '10%',
      marginBottom: 20,
      width: '80%',
      borderRadius: 15,
      paddingHorizontal: 10,
      fontSize: 30,
      color: textColor,
      textAlign: 'center',
      fontFamily: 'inter',
      fontWeight: 600,
    },
    logo: {
      width: width * 0.408,
      height: width * 0.458,
      alignSelf: 'center',
    },
    tituloM: {
      width: '80%',
      borderRadius: 15,
      paddingHorizontal: 10,
      fontSize: 18,
      color: '#131F3C',
      textAlign: 'center',
      fontFamily: 'inter',
      fontWeight: 600,
    },
    text: {
      marginTop: 20,
      width: '80%',
      height: 70,
      borderBottomWidth: 3,
      borderColor: isDarkMode ? "#fff" : "#162955ff",
      borderRadius: 0,
      paddingHorizontal: 10,
      fontSize: 20,
      color: isDarkMode ? "#fff" : "#162955ff",
      fontWeight: '600',
    },
    textInput: {
      flex: 1,
      fontSize: 18,
      color: textColor,
    },
    textPicker: {
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
      borderRadius: 15,
      fontSize: 20,
      color: textColor,
      fontWeight: 600,
      borderWidth: 0,
    },

    senhaContainer: {
      flexDirection: 'row',
      height: 60,
      width: '80%',
      borderBottomWidth: 3,
      borderRadius: 0,
      paddingHorizontal: 10,
      marginBottom: 20,
    },

    senhaInput: {
      height: 60,
      flex: 1,
      fontSize: 18,
      color: textColor,
    },

    olhoBotao: {
      padding: 5,
    },

    olhoIcone: {
      width: 34,
      height: 27,
      tintColor: isDarkMode ? '#fff' : '#000000ff',
    },
    textBtn: {
      color: '#fff',
      fontSize: 28,
      textAlignVertical: 'center',
      textAlign: 'center',
      fontWeight: 600,
    },
    btn: {
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
    loginText: {
      display: 'flex',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 19,
      marginBottom: 3,
      color: textLoginColor1,
    },
    loginbtn: {
      textAlign: 'center',
      fontSize: 18,
      marginLeft: 6,
      color: textLoginColor2,
    },
    login: {
      marginBottom: 20,
      display: 'flex',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    ModalConatiner: {
      width: '100%',
      height: '100%',
      backgroundColor: '#454545d8',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    ModalBox: {
      display: 'flex',
      alignItems: 'center',
      width: '80%',
      height: '80%',
      borderRadius: 15,
      backgroundColor: '#f8f4ecff',
      position: 'relative',
      padding: 20,
      elevation: 10,
    },
    modalContent: {
      width: '100%',
      height: '100%',
      paddingTop: 30,
    },
    close: {
      width: 40,
      height: 40,
      backgroundColor: '#e4e4e4ff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      top: -15,
      left: -15,
      position: 'absolute',
    },
    closeImg: {
      width: 20,
      height: 20,
      tintColor: '#2c2c2cff',
    },
    countryPickerButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: 60,
      borderWidth: 1,
      borderColor: '#40666B',
      borderRadius: 10,
      paddingHorizontal: 15,
      backgroundColor: 'transparent',
      marginTop: 10,
    },
    countrySelected: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    flagContainer: {
      marginRight: 10,
    },
    countryName: {
      fontSize: 16,
      fontWeight: '600',
    },
    countryPlaceholder: {
      fontSize: 16,
      fontWeight: '600',
      opacity: 0.7,
    },
    dropdownArrow: {
      width: 20,
      height: 20,
    },
    countryLabel: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 5,
    },
  });
}




