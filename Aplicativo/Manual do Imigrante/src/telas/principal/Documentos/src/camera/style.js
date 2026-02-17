import { StyleSheet, Dimensions } from 'react-native'
import { useTheme, Colors } from '../../../../../../themeContext'

export default function getStyles(isDarkMode) {
    const { width, height } = Dimensions.get('window');

    const { temaCor } = useTheme();
    const background = isDarkMode ? '#1a1a1a' : '#ffffff'
    const cardBackground = isDarkMode ? '#2d2d2d' : '#f8f8f8'
    const font = isDarkMode ? '#ffffff' : "#000000"
    const secondaryFont = isDarkMode ? '#b0b0b0' : "#666666"
    const modalBackground = isDarkMode ? '#2d2d2d' : '#ffffff'
    const borderColor = isDarkMode ? '#404040' : '#e0e0e0'

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'black',
        },
        message: {
            textAlign: 'center',
            paddingBottom: 10,
            color: font,
        },
        camera: {
            flex: 1,
        },
        cameraOverlay: {
            flex: 1,
            backgroundColor: 'transparent',
        },

        // Header
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingTop: 60,
            paddingBottom: 20,
        },
        iconButton: {
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: 'rgba(0,0,0,0.3)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        iconButton2: {
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: 'rgba(0,0,0,0.3)',
            justifyContent: 'center',
            alignItems: 'center',
            left: width * 0.1,
            bottom: 10,
        },
        titleContainer: {
            alignItems: 'center',
        },
        title: {
            color: 'white',
            fontSize: 18,
            fontWeight: '600',
        },

        // Área de Preview
        previewArea: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 40,
        },
        guideFrame: {
            width: width - 80,
            height: (width - 80) * 0.7,
            borderWidth: 2,
            borderColor: 'rgba(255,255,255,0.6)',
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.18)',
        },
        cornerTopLeft: {
            position: 'absolute',
            top: -2,
            left: -2,
            width: 30,
            height: 30,
            borderTopWidth: 4,
            borderLeftWidth: 4,
            borderColor: Colors[temaCor],
            borderTopLeftRadius: 12,
        },
        cornerTopRight: {
            position: 'absolute',
            top: -2,
            right: -2,
            width: 30,
            height: 30,
            borderTopWidth: 4,
            borderRightWidth: 4,
            borderColor: Colors[temaCor],
            borderTopRightRadius: 12,
        },
        cornerBottomLeft: {
            position: 'absolute',
            bottom: -2,
            left: -2,
            width: 30,
            height: 30,
            borderBottomWidth: 4,
            borderLeftWidth: 4,
            borderColor: Colors[temaCor],
            borderBottomLeftRadius: 12,
        },
        cornerBottomRight: {
            position: 'absolute',
            bottom: -2,
            right: -2,
            width: 30,
            height: 30,
            borderBottomWidth: 4,
            borderRightWidth: 4,
            borderColor: Colors[temaCor],
            borderBottomRightRadius: 12,
        },
        guideText: {
            color: 'white',
            fontSize: 14,
            marginTop: 20,
            textAlign: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
        },

        // Footer
        footer: {
            paddingBottom: 40,
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
        },
        captureButton: {
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 8,
            position: 'absolute',
            left: (width / 2) - 35,
            bottom: 40,
        },
        captureButtonDisabled: {
            opacity: 0.6,
        },
        captureButtonInner: {
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: Colors[temaCor],
            justifyContent: 'center',
            alignItems: 'center',
        },

        // Loading
        loadingOverlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.9)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        },
        loadingContainer: {
            alignItems: 'center',
            padding: 30,
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: 20,
            minWidth: 200,
        },
        loadingText: {
            color: 'white',
            fontSize: 18,
            fontWeight: '600',
            marginTop: 20,
            marginBottom: 10,
        },
        progressText: {
            color: Colors[temaCor],
            fontSize: 24,
            fontWeight: 'bold',
            marginVertical: 10,
        },
        progressBar: {
            width: 200,
            height: 6,
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: 3,
            overflow: 'hidden',
            marginVertical: 10,
        },
        progressFill: {
            height: '100%',
            backgroundColor: Colors[temaCor],
            borderRadius: 3,
        },
        loadingSubtext: {
            color: 'rgba(255,255,255,0.7)',
            fontSize: 12,
            marginTop: 10,
            textAlign: 'center',
        },

        // Modal
        modalContainer: {
            flex: 1,
            backgroundColor: modalBackground,
        },
        modalHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingTop: 60,
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: borderColor,
        },
        modalTitle: {
            fontSize: 18,
            fontWeight: '600',
            color: font,
        },
        closeButton: {
            padding: 8,
        },
        imageContainer: {
            flex: 1,
            padding: 20,
        },
        previewImage: {
            width: '100%',
            height: '100%',
            borderRadius: 12,
        },
        resultContainer: {
            padding: 20,
            borderTopWidth: 1,
            borderTopColor: borderColor,
        },
        resultTitle: {
            fontSize: 16,
            fontWeight: '600',
            color: font,
            marginBottom: 10,
        },
        textContainer: {
            maxHeight: 150,
            backgroundColor: cardBackground,
            borderRadius: 8,
            padding: 12,
            marginBottom: 20,
        },
        resultText: {
            color: secondaryFont,
            fontSize: 14,
            lineHeight: 20,
        },
        buttonRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 10,
        },
        primaryButton: {
            flex: 1,
            backgroundColor: '#007AFF',
            paddingVertical: 15,
            borderRadius: 10,
            alignItems: 'center',
        },
        primaryButtonText: {
            color: 'white',
            fontSize: 16,
            fontWeight: '600',
        },
        secondaryButton: {
            flex: 1,
            backgroundColor: cardBackground,
            paddingVertical: 15,
            borderRadius: 10,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: borderColor,
        },
        secondaryButtonText: {
            color: font,
            fontSize: 16,
            fontWeight: '600',
        },
        // Adicione estilos para o preview da foto e botão de cancelar
        previewContainer: {
            alignItems: 'center',
            marginBottom: 20,
        },
        previewTitle: {
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        previewImage: {
            width: 200,
            height: 150,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#FFFFFF',
        },
        cancelButton: {
            backgroundColor: 'rgba(255, 59, 48, 0.8)',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
            marginTop: 15,
        },
        cancelButtonText: {
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: 16,
        },
    });
}