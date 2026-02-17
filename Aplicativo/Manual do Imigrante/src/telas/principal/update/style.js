import { StyleSheet, Dimensions } from 'react-native';
import { useTheme, Colors } from '../../../../themeContext';

const { width, height } = Dimensions.get('window');

export default function getStyles(isDarkMode) {
  const { temaCor } = useTheme();
  
  const background = isDarkMode ? '#313131ff' : '#ffffffff';
  const cardBackground = isDarkMode ? '#1E1E1E' : '#ebebebff';
  const font = isDarkMode ? '#ffffffff' : "#000000ff";
  const secondaryFont = isDarkMode ? '#cccccc' : "#666666";
  const borderColor = isDarkMode ? '#444' : '#e0e0e0';
  const inputBackground = isDarkMode ? '#2a2a2a' : '#f8f8f8';

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

    // Header
    header: {
      width: '100%',
      height: height * 0.12,
      backgroundColor: Colors[temaCor],
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: height * 0.05,
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    backButton: {
      width: 45,
      height: 45,
      backgroundColor: 'rgba(255,255,255,0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 22.5,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.3)',
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#ffffff',
      textAlign: 'center',
      flex: 1,
      marginHorizontal: 10,
    },
    languageButton: {
      width: 45,
      height: 45,
      backgroundColor: 'rgba(255,255,255,0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 22.5,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.3)',
    },

    // Scroll Content
    scrollContent: {
      flexGrow: 1,
      paddingBottom: 40,
    },
    formContainer: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 30,
      alignItems: 'center',
    },

    // Input Containers
    inputContainer: {
      width: '100%',
      height: 80,
      marginBottom: 20,
      borderBottomWidth: 2,
      borderColor: borderColor,
      justifyContent: 'flex-end',
      paddingHorizontal: 0,
    },

    // Labels and Inputs
    inputLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: font,
      marginBottom: 8,
    },
    textInput: {
      flex: 1,
      fontSize: 18,
      color: font,
      backgroundColor: inputBackground,
      borderRadius: 12,
      paddingHorizontal: 15,
      paddingVertical: 12,
      
    },

    // Save Button
    saveButton: {
      width: '100%',
      marginTop: 40,
      borderRadius: 15,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
    },
    gradient: {
      width: '100%',
      paddingVertical: 16,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
      marginLeft: 10,
    },
  });
}