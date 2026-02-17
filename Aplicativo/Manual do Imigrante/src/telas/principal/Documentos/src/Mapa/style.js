import { StyleSheet, Dimensions } from 'react-native'
import { useTheme, Colors } from '../../../../../../themeContext'

export default function getStyles(isDarkMode) {
    const { temaCor } = useTheme();
    const { width, height } = Dimensions.get('window');

    const background = isDarkMode ? '#1a1a1a' : '#ffffff'
    const cardBackground = isDarkMode ? '#2d2d2d' : '#f8f8f8'
    const font = isDarkMode ? '#ffffff' : "#000000"
    const secondaryFont = isDarkMode ? '#b0b0b0' : "#666666"
    const modalBackground = isDarkMode ? '#2d2d2d' : '#ffffff'
    const borderColor = isDarkMode ? '#404040' : '#e0e0e0'
    const shadowColor = isDarkMode ? '#000000' : '#000000'

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: background,
        },
        header: {
            width: width * 0.95,
            display: 'flex',
            flexDirection: 'row',
        },
        filterContainer: {
            maxHeight: 60,
            marginBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: borderColor,
        },
        filterContentContainer: {
            paddingHorizontal: 12,
            alignItems: 'center',
            paddingVertical: 8,
            gap: 8,
        },
        filterButton: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 10,
            marginHorizontal: 4,
            borderRadius: 25,
            backgroundColor: isDarkMode ? '#3d3d3d' : '#f0f0f0',
            borderWidth: 1,
            borderColor: isDarkMode ? '#555' : '#ddd',
            gap: 6,
        },
        filterButtonActive: {
            backgroundColor: Colors[temaCor],
            borderColor: Colors[temaCor],
        },
        filterIcon: {
            marginRight: 2,
        },
        filterButtonText: {
            fontSize: 13,
            color: isDarkMode ? '#ccc' : '#666',
            fontWeight: '500',
        },
        filterButtonTextActive: {
            color: '#fff',
            fontWeight: 'bold',
        },
        map: {
            width: "100%",
            height: "100%",
        },
        loadingContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: background,
            gap: 16,
        },
        loadingText: {
            fontSize: 16,
            color: font,
        },
        errorContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            backgroundColor: background,
        },
        errorText: {
            fontSize: 16,
            color: "#ff4444",
            textAlign: "center",
        },
        addressContainer: {
            width: width * 0.75,
            maxWidth: width * 0.75,
            top: 50,
            left: 10,
            right: 20,
            backgroundColor: modalBackground,
            padding: 12,
            borderRadius: 12,
            elevation: 3,
            shadowColor: shadowColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            zIndex: 1,
            borderWidth: 1,
            borderColor: borderColor,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
        },
        addressText: {
            fontSize: 14,
            color: font,
            flex: 1,
        },
        floatingButton: {
            position: "absolute",
            bottom: 30,
            alignSelf: "center",
            backgroundColor: Colors[temaCor],
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 25,
            elevation: 5,
            shadowColor: shadowColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
        },
        floatingButtonText: {
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
        },
        markerModalContainer: {
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        markerModalContent: {
            backgroundColor: modalBackground,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: "80%",
            minHeight: "50%",
            borderWidth: 1,
            borderColor: borderColor,
        },
        markerModalHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: borderColor,
        },
        markerTypeBadge: {
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 15,
        },
        poupatempoBadge: {
            backgroundColor: "#007AFF",
        },
        sptransBadge: {
            backgroundColor: "#FF3B30",
        },
        cartorioBadge: {
            backgroundColor: "#8A2BE2",
        },
        receitaBadge: {
            backgroundColor: "#006400",
        },
        zonaFederalBadge: {
            backgroundColor: "#FF8C00",
        },
        segurancaBadge: {
            backgroundColor: "#8B008B",
        },
        pfBadge: {
            backgroundColor: "#000080",
        },
        detranBadge: {
            backgroundColor: "#228B22",
        },
        cfcBadge: {
            backgroundColor: "#D2691E",
        },
        bompratoBadge: {
            backgroundColor: "#B22222",
        },
        consuladoBadge: {
            backgroundColor: "#8B0000",
        },
        markerTypeBadgeText: {
            fontSize: 12,
            color: "white",
            fontWeight: "bold",
        },
        markerCloseButton: {
            padding: 5,
        },
        markerModalBody: {
            padding: 20,
        },
        markerModalTitle: {
            fontSize: 22,
            fontWeight: "bold",
            color: font,
            marginBottom: 20,
            textAlign: "center",
        },
        markerInfoSection: {
            marginBottom: 20,
        },
        markerInfoLabel: {
            fontSize: 14,
            fontWeight: "600",
            color: secondaryFont,
            marginBottom: 5,
        },
        markerInfoValue: {
            fontSize: 16,
            color: font,
            lineHeight: 22,
        },
        markerModalFooter: {
            flexDirection: "row",
            padding: 20,
            borderTopWidth: 1,
            borderTopColor: borderColor,
            gap: 10,
        },
        markerActionButton: {
            flex: 1,
            paddingVertical: 15,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
        },
        directionsButton: {
            backgroundColor: Colors[temaCor],
        },
        directionsButtonText: {
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
        },
        locationItem: {
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: borderColor,
            borderRadius: 12,
            marginBottom: 8,
            backgroundColor: cardBackground,
        },
        poupatempoItem: {
            backgroundColor: isDarkMode ? '#1a3a5f' : '#e6f2ff',
            borderLeftWidth: 4,
            borderLeftColor: "#007AFF",
        },
        sptransItem: {
            backgroundColor: isDarkMode ? '#5f2a1a' : '#ffe6e6',
            borderLeftWidth: 4,
            borderLeftColor: "#FF3B30",
        },
        cartorioItem: {
            backgroundColor: isDarkMode ? '#3a1a5f' : '#f3e6ff',
            borderLeftWidth: 4,
            borderLeftColor: "#8A2BE2",
        },
        receitaItem: {
            backgroundColor: isDarkMode ? '#1a5f1a' : '#e6ffe6',
            borderLeftWidth: 4,
            borderLeftColor: "#006400",
        },
        zonaFederalItem: {
            backgroundColor: isDarkMode ? '#5f3a00' : '#fff4e6',
            borderLeftWidth: 4,
            borderLeftColor: "#FF8C00",
        },
        segurancaItem: {
            backgroundColor: isDarkMode ? '#2a1a3a' : '#f0e6ff',
            borderLeftWidth: 4,
            borderLeftColor: "#8B008B",
        },
        pfItem: {
            backgroundColor: isDarkMode ? '#1a2a3a' : '#e6f0ff',
            borderLeftWidth: 4,
            borderLeftColor: "#000080",
        },
        detranItem: {
            backgroundColor: isDarkMode ? '#1a3a2a' : '#e6fff0',
            borderLeftWidth: 4,
            borderLeftColor: "#228B22",
        },
        cfcItem: {
            backgroundColor: isDarkMode ? '#3a2a1a' : '#fff8e6',
            borderLeftWidth: 4,
            borderLeftColor: "#D2691E",
        },
        bompratoItem: {
            backgroundColor: isDarkMode ? '#5f1a1a' : '#ffe6e6',
            borderLeftWidth: 4,
            borderLeftColor: "#B22222",
        },
        consuladoItem: {
            backgroundColor: isDarkMode ? '#3a1a1a' : '#ffe6e6',
            borderLeftWidth: 4,
            borderLeftColor: "#8B0000",
        },
        locationInfo: {
            flex: 1,
        },
        locationTitle: {
            fontSize: 16,
            fontWeight: "bold",
            color: font,
            marginBottom: 6,
        },
        locationDescription: {
            fontSize: 14,
            color: secondaryFont,
            marginBottom: 6,
            lineHeight: 18,
        },
        locationDistance: {
            fontSize: 13,
            color: Colors[temaCor],
            fontWeight: "500",
            marginBottom: 8,
        },
        typeBadge: {
            alignSelf: 'flex-start',
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 12,
        },
        typeBadgeText: {
            fontSize: 11,
            color: "white",
            fontWeight: "bold",
        },
        modalContainer: {
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        modalContent: {
            backgroundColor: modalBackground,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            height: "80%",
            borderWidth: 1,
            borderColor: borderColor,
        },
        modalHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 15,
        },
        modalTitle: {
            fontSize: 18,
            fontWeight: "bold",
            color: font,
            flex: 1,
            marginRight: 10,
        },
        closeButton: {
            padding: 4,
        },
        locationsList: {
            flex: 1,
        },
        modalFooter: {
            marginTop: 15,
            textAlign: "center",
            fontSize: 12,
            color: secondaryFont,
            fontStyle: "italic",
        },
        emptyListContainer: {
            padding: 40,
            alignItems: 'center',
            justifyContent: 'center',
        },
        emptyListText: {
            fontSize: 16,
            color: secondaryFont,
            textAlign: 'center',
            marginTop: 16,
        },
        backButton: {
            top: 50,
            left: 10,
            zIndex: 1000,
            backgroundColor: isDarkMode ? 'rgba(45,45,45,0.9)' : 'rgba(255,255,255,0.9)',
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        routeModalContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        routeModalContent: {
            backgroundColor: modalBackground,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            maxHeight: '70%',
        },
        routeModalHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
        },
        routeModalTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: font,
        },
        routeCloseButton: {
            padding: 4,
        },
        routeOptionsContainer: {
            marginBottom: 20,
        },
        routeDestination: {
            fontSize: 14,
            color: secondaryFont,
            marginBottom: 20,
            textAlign: 'center',
        },
        routeOption: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            backgroundColor: isDarkMode ? '#3d3d3d' : '#f5f5f5',
            borderRadius: 12,
            marginBottom: 12,
        },
        routeOptionIcon: {
            marginRight: 15,
        },
        routeOptionTextContainer: {
            flex: 1,
        },
        routeOptionTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: font,
            marginBottom: 2,
        },
        routeOptionDescription: {
            fontSize: 13,
            color: secondaryFont,
        },
        calculatingRouteContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
        },
        calculatingRouteText: {
            marginLeft: 10,
            color: font,
        },
        routeInfoContainer: {
            position: 'absolute',
            top: 100,
            left: 20,
            right: 20,
            backgroundColor: modalBackground,
            borderRadius: 15,
            padding: 16,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            borderWidth: 1,
            borderColor: borderColor,
        },
        routeInfoHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
        },
        routeInfoTransport: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        routeInfoTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 8,
            color: font,
        },
        routeInfoDetails: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 12,
        },
        routeInfoItem: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        routeInfoText: {
            marginLeft: 6,
            fontSize: 14,
            color: secondaryFont,
            fontWeight: '500',
        },
        busDetailsButton: {
            backgroundColor: '#FF9500',
            padding: 12,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 8,
        },
        busDetailsButtonText: {
            color: '#FFF',
            fontWeight: 'bold',
            fontSize: 14,
        },
        transitModeTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: font,
            marginBottom: 16,
            textAlign: 'center',
        },
        transitModeOptions: {
            marginBottom: 20,
        },
        transitModeOption: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            backgroundColor: isDarkMode ? '#3d3d3d' : '#f5f5f5',
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 2,
            borderColor: 'transparent',
        },
        transitModeOptionSelected: {
            borderColor: Colors[temaCor],
            backgroundColor: isDarkMode ? '#2a4d6d' : '#e8f4fd',
        },
        transitModeIconContainer: {
            marginRight: 15,
        },
        transitModeTextContainer: {
            flex: 1,
        },
        transitModeOptionTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: font,
            marginBottom: 2,
        },
        transitModeOptionDescription: {
            fontSize: 13,
            color: secondaryFont,
        },
        checkboxContainer: {
            marginLeft: 10,
        },
        selectedModesSummary: {
            backgroundColor: isDarkMode ? '#3d3d3d' : '#f5f5f5',
            padding: 12,
            borderRadius: 8,
            marginBottom: 20,
        },
        selectedModesText: {
            fontSize: 14,
            color: secondaryFont,
            textAlign: 'center',
        },
        transitModalButtons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        backToTransportButton: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 12,
        },
        backToTransportButtonText: {
            marginLeft: 6,
            color: '#007AFF',
            fontWeight: '500',
            fontSize: 14,
        },
        searchRoutesButton: {
            backgroundColor: '#FF9500',
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 8,
        },
        searchRoutesButtonDisabled: {
            backgroundColor: isDarkMode ? '#555' : '#CCC',
        },
        searchRoutesButtonText: {
            color: '#FFF',
            fontWeight: 'bold',
            fontSize: 14,
        },
        busModalContainer: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'flex-end',
        },
        busModalContent: {
            backgroundColor: modalBackground,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: '85%',
            minHeight: '60%',
        },
        busModalHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: borderColor,
        },
        busModalTitleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
        },
        busModalTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: font,
        },
        busCloseButton: {
            padding: 4,
        },
        busRouteSummary: {
            padding: 16,
            backgroundColor: isDarkMode ? '#3d3d3d' : '#f2f2f7',
            marginHorizontal: 16,
            marginTop: 8,
            borderRadius: 12,
        },
        busRouteDestination: {
            fontSize: 16,
            fontWeight: '600',
            color: font,
            marginBottom: 4,
        },
        busRouteCount: {
            fontSize: 14,
            color: secondaryFont,
        },
        busRoutesList: {
            padding: 16,
        },
        busRouteCard: {
            backgroundColor: isDarkMode ? '#3d3d3d' : '#FFFFFF',
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: borderColor,
        },
        busRouteHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
        },
        routeNumberContainer: {
            backgroundColor: '#FF9500',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 8,
        },
        routeNumber: {
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: 14,
        },
        routeStats: {
            flexDirection: 'row',
            gap: 12,
        },
        routeStat: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
        },
        routeStatText: {
            fontSize: 12,
            color: secondaryFont,
        },
        routeTimeline: {
            marginBottom: 16,
        },
        timelineItem: {
            flexDirection: 'row',
            marginBottom: 16,
        },
        timelineDot: {
            width: 12,
            height: 12,
            borderRadius: 6,
            marginRight: 12,
            marginTop: 4,
        },
        timelineContent: {
            flex: 1,
        },
        timelineTitle: {
            fontSize: 14,
            fontWeight: '600',
            color: font,
            marginBottom: 2,
        },
        timelineDescription: {
            fontSize: 12,
            color: secondaryFont,
            marginBottom: 4,
            lineHeight: 16,
        },
        timelineTime: {
            fontSize: 11,
            color: secondaryFont,
        },
        transportLineHeader: {
            marginBottom: 8,
        },
        transportLineInfo: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
        },
        transportNumberBadge: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
            gap: 4,
        },
        transportNumberText: {
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: 12,
        },
        transportStopsInfo: {
            marginBottom: 8,
        },
        transportStopItem: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            marginBottom: 4,
        },
        transportStopText: {
            fontSize: 12,
            color: secondaryFont,
        },
        transportJourneyDetails: {
            marginBottom: 8,
        },
        transportJourneyText: {
            fontSize: 11,
            color: secondaryFont,
        },
        selectRouteButton: {
            backgroundColor: '#FF9500',
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 8,
            alignItems: 'center',
        },
        selectRouteButtonText: {
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: 16,
        },
        busStopMarker: {
            backgroundColor: '#FF9500',
            borderRadius: 15,
            padding: 6,
            borderWidth: 2,
            borderColor: '#FFFFFF',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
    });
}