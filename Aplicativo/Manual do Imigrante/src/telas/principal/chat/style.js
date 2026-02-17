import { StyleSheet, Dimensions, Platform } from "react-native";
import { useTheme, Colors } from "../../../../themeContext";


export default function getStyles(isDarkMode) {
  const { temaCor } = useTheme();
  const { width, height } = Dimensions.get("window");

  const background = isDarkMode ? "#313131" : "#FFFFFF";
  const font = isDarkMode ? "#FFFFFF" : "#000000";

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: background,
    },

    // Header styles
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: isDarkMode ? "#1E1E1E" : "#FFFFFF",
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? "#333" : "#E0E0E0",
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
    headerInfo: {
      marginLeft: 12,
      flex: 1,
    },
    headerTitle: {
      color: font,
      fontSize: 18,
      fontWeight: "bold",
    },
    headerSubtitle: {
      color: isDarkMode ? "#CCCCCC" : "#666666",
      fontSize: 13,
    },

    // Bot Icon
    botIcon: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDarkMode ? "#333" : '#F0F0F0',
      borderRadius: 20,
    },
    botIconText: {
      fontSize: 20,
    },
    eyesBot: {
      backgroundColor: Colors[temaCor],
      width: width * 0.06,
      height: 10,
      position: 'absolute',
      top: '50%',
      left: '15%',
      borderRadius: 3,
      zIndex: 1
    },

    // Back Button
    backButton: {
      padding: 8,
      marginRight: 8,
    },
    backButtonText: {
      fontSize: 24,
      color: font,
      fontWeight: "bold",
    },

    // Chat Container
    chatContainer: {
      flex: 1,
    },

    // Scroll Area
    scrollArea: {
      flex: 1,
    },
    listContent: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    optionsContainer: {
      marginTop: 8,
    },

    // Message Bubbles
    msgContainer: {
      borderRadius: 16,
      marginVertical: 4,
      paddingVertical: 10,
      paddingHorizontal: 14,
      maxWidth: "85%",
    },
    msgBot: {
      alignSelf: "flex-start",
      backgroundColor: Colors[temaCor],
    },
    msgUsuario: {
      alignSelf: "flex-end",
      backgroundColor: isDarkMode ? "#2D2D2D" : "#E5E5E5",
    },
    msgTextoBot: {
      color: "#FFFFFF",
      fontSize: 16,
      lineHeight: 20,
    },
    msgTextoUsuario: {
      color: font,
      fontSize: 16,
      lineHeight: 20,
    },

    pendingMsg: {
      opacity: 0.7,
    },
    failedMsg: {
      backgroundColor: isDarkMode ? "#D32F2F" : "#FF6B6B",
    },
    failedMsgText: {
      color: "#FFFFFF",
    },

    botao: {
      backgroundColor: isDarkMode ? "#2D2D2D" : "#F0F0F0",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 20,
      marginVertical: 4,
      borderWidth: 1,
      maxWidth: '80%',
      borderColor: Colors[temaCor],
    },
    botaoPressed: {
      backgroundColor: isDarkMode ? "#3D3D3D" : "#E0E0E0",
    },
    botaoTexto: {
      color: font,
      fontSize: 15,
      fontWeight: "500",
      textAlign: "center",
    },

    // Input Area
    inputRow: {
      flexDirection: "row",
      padding: 16,
      backgroundColor: isDarkMode ? "#2D2D2D" : "#F8F8F8",
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? "#444" : "#E0E0E0",
      alignItems: "center",
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: isDarkMode ? "#555" : "#DDD",
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginRight: 8,
      backgroundColor: isDarkMode ? "#1E1E1E" : "#FFFFFF",
      color: font,
      fontSize: 16,
      maxHeight: 100,
    },
    sendBtn: {
      backgroundColor: Colors[temaCor],
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    sendBtnDisabled: {
      opacity: 0.6,
    },
    sendText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
    },

    // Loading States
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: background,
    },
    loadingText: {
      marginTop: 12,
      fontSize: 16,
      color: isDarkMode ? "#CCCCCC" : "#666666",
    },
    boxInvi: {
      width: width,
      height: height * 0.3,
      display: 'flex'
    },
    connectingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      backgroundColor: '#f0f0f0',
    },
    connectingText: {
      marginLeft: 8,
      fontSize: 14,
      color: '#666',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 40,
    },
    emptyText: {
      textAlign: 'center',
      color: '#888',
      fontSize: 16,
    },
    timestamp: {
      fontSize: 10,
      color: '#999',
      marginTop: 4,
      alignSelf: 'flex-end',
    },
    refreshButton: {
      padding: 8,
      marginLeft: 'auto',
    },
  });
}