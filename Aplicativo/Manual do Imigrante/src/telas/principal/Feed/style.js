import { StyleSheet, Dimensions } from 'react-native'
import { useTheme, Colors } from '../../../../themeContext';

export default function getStyles(isDarkMode) {
    const { temaCor } = useTheme();
    const { width, height } = Dimensions.get('window');

    const background = isDarkMode ? '#313131ff' : '#ffffffff'
    const tituloBack = isDarkMode ? "#1E1E1E" : '#ebebebff'
    const font = isDarkMode ? '#ffffffff' : "#000000ff"

    return StyleSheet.create({
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isDarkMode ? '#000' : '#fff',
        },
        loadingText: {
            marginTop: 20,
            fontSize: 16,
            color: isDarkMode ? '#fff' : '#000',
        },
        container: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: background,
        },
        postArea: {
            width: '100%',
            marginVertical: 10,
        },
        imgArea: {
            width: '100%',
        },
        textArea: {
            width: '100%',
            minHeight: height * 0.10,
            justifyContent: 'center',
            alignItems: 'center',
            color: font,
        },
        text: {
            marginHorizontal: '2.5%',
            color: font,
        },
        modalOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            justifyContent: 'flex-end',
        },
        modalContainer: {
            height: '90%',
            backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflow: 'hidden',
            elevation: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.25,
            shadowRadius: 10,
        },
        modalHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: isDarkMode ? '#333' : '#f0f0f0',
        },
        headerLeft: {
            flex: 1,
        },
        modalSource: {
            fontSize: 16,
            fontWeight: '600',
            color: isDarkMode ? '#fff' : '#000',
        },
        closeButton: {
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalScrollView: {
            flex: 1,
        },
        modalScrollContent: {
            paddingBottom: 20,
        },
        imageContainer: {
            position: 'relative',
            height: 250,
        },
        modalImage: {
            width: '100%',
            height: '100%',
        },
        imageOverlay: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
            background: isDarkMode
                ? 'linear-gradient(transparent, #1a1a1a)'
                : 'linear-gradient(transparent, #fff)',
        },
        modalContent: {
            padding: 20,
        },
        modalTitle: {
            fontSize: 22,
            fontWeight: 'bold',
            color: isDarkMode ? '#fff' : '#000',
            marginBottom: 15,
            lineHeight: 28,
        },
        metaContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
            gap: 15,
        },
        metaItem: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
        },
        metaText: {
            fontSize: 14,
            color: isDarkMode ? '#ccc' : '#666',
        },
        descriptionContainer: {
            marginBottom: 20,
        },
        modalDescription: {
            fontSize: 16,
            color: isDarkMode ? '#e0e0e0' : '#444',
            lineHeight: 24,
            textAlign: 'justify',
        },
        readMoreButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors[temaCor] + '20',
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 12,
            marginBottom: 20,
            gap: 8,
        },
        readMoreText: {
            fontSize: 16,
            fontWeight: '600',
            color: Colors[temaCor],
        },
        tagsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 10,
        },
        tag: {
            backgroundColor: isDarkMode ? '#333' : '#f0f0f0',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 16,
        },
        tagText: {
            fontSize: 12,
            color: isDarkMode ? '#ccc' : '#666',
            fontWeight: '500',
        },
        modalFooter: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: 15,
            paddingHorizontal: 20,
            borderTopWidth: 1,
            borderTopColor: isDarkMode ? '#333' : '#f0f0f0',
            backgroundColor: isDarkMode ? '#1a1a1a' : '#fafafa',
        },
        footerButton: {
            alignItems: 'center',
            gap: 5,
            paddingVertical: 8,
            paddingHorizontal: 15,
            borderRadius: 10,
        },
        footerButtonText: {
            fontSize: 12,
            color: isDarkMode ? '#ccc' : '#666',
            fontWeight: '500',
        },
        searchContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
            height: height * 0.05,
            borderRadius: 25,
            marginHorizontal: 15,
            marginVertical: 10,
            elevation: 3,
            borderWidth: 1,
            borderColor: isDarkMode ? '#444' : '#e0e0e0',
            marginTop: height * 0.045,
        },
        searchIcon: {
            left: 10,
        },
        searchInput: {
            flex: 1,
            fontSize: 16,
            color: isDarkMode ? '#fff' : '#333',

            padding: 0,
            left: 15,
        },
        clearButton: {
            padding: 5,
            right: 10,
        },
        searchResultsInfo: {
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: isDarkMode ? '#2a2a2a' : '#f0f0f0',
        },
        searchResultsText: {
            fontSize: 14,
            color: isDarkMode ? '#ccc' : '#666',
            fontStyle: 'italic',
        },
        noResultsContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            padding: 40,
        },
        noResultsText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: isDarkMode ? '#ccc' : '#666',
            marginTop: 15,
            textAlign: 'center',
        },
        noResultsSubText: {
            fontSize: 14,
            color: isDarkMode ? '#999' : '#888',
            marginTop: 5,
            textAlign: 'center',
        },
        compactoArea: {
            paddingVertical: 6,
            paddingHorizontal: 10,
            borderBottomWidth: 0.5,
            borderBottomColor: "#ccc",
        },
        compactoPress: {
            flexDirection: "row",
            alignItems: "center",
        },
        compactoThumb: {
            width: height * 0.11,
            height: height * 0.11,
            borderRadius: 8,
            marginRight: 10,
        },
        compactoTextArea: {
            flex: 1,
            justifyContent: "center",
        },
        swithArea: {
            marginTop: 5,
            width: '100%',
            height: height * 0.04,
            display: 'flex',
            flexDirection: 'row',
            left: '6%',
        },
        trilho: {
            display: 'flex',
            flexDirection: 'row',
        },
        layoutPicker: {
            position: 'absolute',
            top: 40,
            left: 0,
            backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
            borderRadius: 8,
            padding: 10,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            zIndex: 1000,
            minWidth: 180,
        },
        layoutOption: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderRadius: 6,
            marginVertical: 2,
        },
        layoutOptionSelected: {
            backgroundColor: isDarkMode ? '#3a3a3a' : '#f0f0f0',
        },
        layoutOptionText: {
            color: isDarkMode ? '#fff' : '#000',
            fontSize: 14,
        },
        layoutOptionTextSelected: {
            fontWeight: 'bold',
            color: Colors[temaCor],
        },
        divider: {
            height: 2,
            backgroundColor: isDarkMode ? '#444' : '#e0e0e0',
            marginVertical: -15,
            display: 'block',
        },
    });
}