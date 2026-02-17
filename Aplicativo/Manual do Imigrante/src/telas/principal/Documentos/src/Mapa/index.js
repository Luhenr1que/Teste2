import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {StyleSheet,Text,View,ActivityIndicator,Modal,TouchableOpacity,FlatList,Pressable,ScrollView,Alert,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { useRoute, useNavigation } from "@react-navigation/native";
import markers from "../../dados/locais";
import getStyles from "./style";
import { Colors, useTheme } from "../../../../../../themeContext";
import {Ionicons} from '@expo/vector-icons';


const GOOGLE_MAPS_API_KEY = "SuaChaveAPI"; // Substitua pela sua chave de API do Google Maps

const TYPE_MAPPING = {
  'unidadesaude': 'unidadesaude',
  'poupatempo': 'poupatempo',
  'sptrans': 'sptrans',
  'cartoriocivil': 'cartoriocivil',
  'receitafederal': 'receitafederal',
  'zonaeleitoral': 'zonaeleitoral',
  'secretariaseguranca': 'secretariaseguranca',
  'policiafederal': 'policiafederal',
  'detran': 'detran',
  'cfc': 'cfc',
  'bomprato': 'bomprato',
  'bolívia': 'bolivia',
  'venezuela': 'venezuela',
  'nigéria': 'nigeria',
  'haiti': 'haiti',
  'angola': 'angola'
};

export default function Mapa() {
  const navigation = useNavigation();
  const {
    themeMode,
    setThemeMode,
    temaCor,
    toggleTheme,
    isDarkMode,
    setTemaCor,
  } = useTheme();
  const styles = getStyles(isDarkMode);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [nearestLocations, setNearestLocations] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [markerModalVisible, setMarkerModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [modalFilterType, setModalFilterType] = useState("all");
  const [routeModalVisible, setRouteModalVisible] = useState(false);
  const [transportModalVisible, setTransportModalVisible] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);
  const [showRoute, setShowRoute] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [busRoutes, setBusRoutes] = useState([]);
  const [busModalVisible, setBusModalVisible] = useState(false);
  const [routeSegments, setRouteSegments] = useState([]);
  const [selectedTransitModes, setSelectedTransitModes] = useState({
    bus: true,
    subway: true,
    train: true
  });

  const route = useRoute();
  const { local: locais, tipoFiltro } = route.params || {};

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  
  // Função para mapear tipos recebidos para filtros internos
  const mapToFilterType = (typesArray) => {
    if (!typesArray || typesArray.length === 0) return "all";

    const mappedTypes = typesArray.map(type => TYPE_MAPPING[type] || type.toLowerCase());

    // Se há apenas um tipo, usa ele diretamente
    if (mappedTypes.length === 1) {
      return mappedTypes[0];
    }

    
    return "custom";
  };

  // Aplicar filtro personalizado com mapeamento
  const aplicarFiltroPersonalizado = (locaisArray) => {
    if (!locaisArray || locaisArray.length === 0) {
      setFilteredMarkers([]);
      setFilterType("all");
      setModalFilterType("all");
      return;
    }

    const marcadoresFiltrados = [];
    const tiposMapeados = locaisArray.map(local => TYPE_MAPPING[local] || local.toLowerCase());

    tiposMapeados.forEach((tipo) => {
      if (markers[tipo]) {
        marcadoresFiltrados.push(...markers[tipo]);
      }
    });

    const marcadoresUnicos = marcadoresFiltrados.filter(
      (marker, index, self) =>
        index === self.findIndex((m) => m.id === marker.id)
    );

    console.log("Locais recebidos:", locaisArray);
    console.log("Tipos mapeados:", tiposMapeados);
    console.log("Marcadores encontrados:", marcadoresUnicos.length);

    if (marcadoresUnicos.length === 0) {
      setFilteredMarkers([]);
      setFilterType("custom");
      setModalFilterType("custom");
      return;
    }

    setFilteredMarkers(marcadoresUnicos);
    setFilterType("custom");
    setModalFilterType("custom");
  };

  useEffect(() => {
    if (locais && locais.length > 0) {
      aplicarFiltroPersonalizado(locais);

      // Define o filtro modal baseado nos tipos recebidos
      const filterTypeFromParams = mapToFilterType(locais);
      setModalFilterType(filterTypeFromParams);
    }
  }, [locais]);

  useEffect(() => {
    if (tipoFiltro) {
      const mappedFilter = TYPE_MAPPING[tipoFiltro] || tipoFiltro.toLowerCase();
      setFilterType(mappedFilter);
      setModalFilterType(mappedFilter);
    }
  }, [tipoFiltro]);

  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0,
      len = encoded.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }
    return points;
  };

  
  const fetchDetailedRoute = async (transportMode) => {
    if (!location || !selectedMarker) return null;

    try {
      const origin = `${location.coords.latitude},${location.coords.longitude}`;
      const destination = `${selectedMarker.latitude},${selectedMarker.longitude}`;

      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${transportMode}&key=${GOOGLE_MAPS_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK') {
        const route = data.routes[0];
        const leg = route.legs[0];

        const allSteps = leg.steps.map((step, stepIndex) => {
          const stepPolyline = step.polyline?.points ? decodePolyline(step.polyline.points) : [];

          let stepColor = '#007AFF';
          let stepType = transportMode;
          let isWalking = false;

          if (step.travel_mode === 'WALKING') {
            stepColor = '#34C759';
            stepType = 'walking';
            isWalking = true;
          } else if (transportMode === 'bicycling') {
            stepColor = '#FF3B30';
          } else if (transportMode === 'transit') {
            stepColor = '#FF9500';
          }

          return {
            stepIndex,
            travel_mode: step.travel_mode,
            duration: step.duration?.text || 'N/A',
            distance: step.distance?.text || 'N/A',
            instructions: step.html_instructions || '',
            polyline: stepPolyline,
            stepType,
            stepColor,
            isWalking,
          };
        });

        const coloredSegments = [];
        allSteps.forEach((step, index) => {
          if (step.polyline.length > 0) {
            coloredSegments.push({
              coordinates: step.polyline,
              color: step.stepColor,
              type: step.stepType,
              travel_mode: step.travel_mode,
              stepIndex: index,
              isWalking: step.isWalking,
            });
          }
        });

        return {
          distance: leg.distance?.text || 'N/A',
          duration: leg.duration?.text || 'N/A',
          polyline: decodePolyline(route.overview_polyline?.points || ''),
          coloredSegments: coloredSegments,
          allSteps: allSteps
        };
      }
    } catch (error) {
      console.error("Erro ao buscar rota detalhada:", error);
    }
    return null;
  };

  // Buscar rotas de transporte público com modos específicos
  const fetchTransitRoutes = async () => {
    if (
      !location?.coords?.latitude ||
      !location?.coords?.longitude ||
      !selectedMarker?.latitude ||
      !selectedMarker?.longitude
    ) {
      return;
    }

    setIsCalculatingRoute(true);

    try {
      const origin = `${location.coords.latitude},${location.coords.longitude}`;
      const destination = `${selectedMarker.latitude},${selectedMarker.longitude}`;

      const transitModes = [];
      if (selectedTransitModes.bus) transitModes.push("bus");
      if (selectedTransitModes.subway) transitModes.push("subway");
      if (selectedTransitModes.train) transitModes.push("train");

      if (transitModes.length === 0) {
        Alert.alert("Aviso", "Selecione pelo menos um modo de transporte.");
        setIsCalculatingRoute(false);
        return;
      }

      const transitModeString = transitModes.join("|");
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=transit&transit_mode=${transitModeString}&key=${GOOGLE_MAPS_API_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "OK" && data.routes && data.routes.length > 0) {
        const routes = data.routes
          .map((route, index) => {
            const leg = route.legs[0];

            const allSteps = leg.steps.map((step, stepIndex) => {
              const stepPolyline = step.polyline?.points
                ? decodePolyline(step.polyline.points)
                : [];

              let stepType = "walking";
              let stepColor = "#34C759";
              let isWalking = false;
              let transportIcon = "walk";

              if (step.travel_mode === "TRANSIT") {
                const vehicleType = step.transit_details?.line?.vehicle?.type;
                switch (vehicleType) {
                  case "BUS":
                    stepType = "bus";
                    stepColor = "#FF9500";
                    transportIcon = "bus";
                    break;
                  case "SUBWAY":
                    stepType = "subway";
                    stepColor = "#007AFF";
                    transportIcon = "subway";
                    break;
                  case "TRAIN":
                    stepType = "train";
                    stepColor = "#FF3B30";
                    transportIcon = "train";
                    break;
                  case "TRAM":
                    stepType = "tram";
                    stepColor = "#34C759";
                    transportIcon = "train";
                    break;
                  default:
                    stepType = "bus";
                    stepColor = "#FF9500";
                    transportIcon = "bus";
                }
                isWalking = false;
              } else if (step.travel_mode === "WALKING") {
                stepType = "walking";
                stepColor = "#34C759";
                transportIcon = "walk";
                isWalking = true;
              }

              return {
                stepIndex,
                travel_mode: step.travel_mode,
                duration: step.duration?.text || "N/A",
                distance: step.distance?.text || "N/A",
                instructions: step.html_instructions || "",
                polyline: stepPolyline,
                stepType,
                stepColor,
                transportIcon,
                isWalking,
                transit_details: step.transit_details
                  ? {
                    vehicleType: step.transit_details.line?.vehicle?.type || "BUS",
                    lineName: step.transit_details.line?.short_name ||
                      step.transit_details.line?.name ||
                      "Linha não especificada",
                    lineColor: step.transit_details.line?.color || "#666666",
                    departure:
                      step.transit_details.departure_stop?.name ||
                      "Parada não especificada",
                    arrival:
                      step.transit_details.arrival_stop?.name ||
                      "Parada não especificada",
                    headsign:
                      step.transit_details.headsign ||
                      "Destino não especificado",
                    departureTime:
                      step.transit_details.departure_time?.text ||
                      "Horário não disponível",
                    arrivalTime:
                      step.transit_details.arrival_time?.text ||
                      "Horário não disponível",
                    numStops: step.transit_details.num_stops || "N/A",
                  }
                  : null,
              };
            });

            const coloredSegments = [];
            allSteps.forEach((step, index) => {
              if (step.polyline.length > 0) {
                coloredSegments.push({
                  coordinates: step.polyline,
                  color: step.stepColor,
                  type: step.stepType,
                  transportIcon: step.transportIcon,
                  travel_mode: step.travel_mode,
                  stepIndex: index,
                  isWalking: step.isWalking,
                });
              }
            });

            const transitSteps = leg.steps
              .filter((step) => step.travel_mode === "TRANSIT")
              .map((step) => {
                const vehicleType = step.transit_details?.line?.vehicle?.type || "BUS";
                let transportType = "Ônibus";
                let transportColor = "#FF9500";
                let transportIcon = "bus";

                switch (vehicleType) {
                  case "BUS":
                    transportType = "Ônibus";
                    transportColor = "#FF9500";
                    transportIcon = "bus";
                    break;
                  case "SUBWAY":
                    transportType = "Metrô";
                    transportColor = "#007AFF";
                    transportIcon = "subway";
                    break;
                  case "TRAIN":
                    transportType = "Trem";
                    transportColor = "#FF3B30";
                    transportIcon = "train";
                    break;
                  case "TRAM":
                    transportType = "VLT/Bonde";
                    transportColor = "#34C759";
                    transportIcon = "train";
                    break;
                }

                return {
                  transportType,
                  transportColor,
                  transportIcon,
                  lineName: step.transit_details?.line?.short_name ||
                    step.transit_details?.line?.name ||
                    "Linha não especificada",
                  lineColor: step.transit_details?.line?.color || "#666666",
                  departure:
                    step.transit_details?.departure_stop?.name ||
                    "Parada não especificada",
                  arrival:
                    step.transit_details?.arrival_stop?.name ||
                    "Parada não especificada",
                  duration: step.duration?.text || "N/A",
                  distance: step.distance?.text || "N/A",
                  headsign:
                    step.transit_details?.headsign || "Destino não especificado",
                  departureTime:
                    step.transit_details?.departure_time?.text ||
                    "Horário não disponível",
                  arrivalTime:
                    step.transit_details?.arrival_time?.text ||
                    "Horário não disponível",
                  numStops: step.transit_details?.num_stops || "N/A",
                };
              });

            return {
              id: index,
              distance: leg.distance?.text || "N/A",
              duration: leg.duration?.text || "N/A",
              polyline: decodePolyline(route.overview_polyline?.points || ""),
              steps: transitSteps,
              coloredSegments: coloredSegments,
              allSteps: allSteps,
            };
          })
          .filter((route) => route !== null);

        if (routes.length > 0) {
          setBusRoutes(routes);
          setBusModalVisible(true);
          setTransportModalVisible(false);
        } else {
          Alert.alert(
            "Aviso",
            `Não foram encontradas rotas de ${transitModes.map(mode => {
              switch (mode) {
                case 'bus': return 'ônibus';
                case 'subway': return 'metrô';
                case 'train': return 'trem';
                default: return mode;
              }
            }).join(', ')} para este trajeto.`
          );
        }
      } else {
        Alert.alert(
          "Erro",
          data.error_message ||
          "Não foi possível encontrar rotas de transporte público para este trajeto."
        );
      }
    } catch (error) {
      console.error("Erro ao buscar rotas:", error);
      Alert.alert(
        "Erro",
        error.message || "Não foi possível buscar as rotas de transporte público."
      );
    } finally {
      setIsCalculatingRoute(false);
    }
  };

  // Função para renderizar rotas coloridas
  const renderColoredRoute = () => {
    if (!showRoute || !routeSegments || routeSegments.length === 0) return null;

    return routeSegments.map((segment, index) => (
      <Polyline
        key={`segment-${index}`}
        coordinates={segment.coordinates}
        strokeColor={segment.color}
        strokeWidth={segment.isWalking ? 3 : 5}
        lineDashPattern={segment.isWalking ? [5, 5] : undefined}
      />
    ));
  };

  // Função para renderizar paradas de transporte público
  const renderTransportStops = () => {
    if (!showRoute || !routeInfo || routeInfo.mode !== "transit") return null;

    const selectedRoute = busRoutes.find(
      (route) =>
        route.distance === routeInfo.distance &&
        route.duration === routeInfo.duration
    );

    if (!selectedRoute?.allSteps) return null;

    const transportStops = [];

    selectedRoute.allSteps.forEach((step, stepIndex) => {
      if (step.travel_mode === "TRANSIT" && step.transit_details) {
        if (step.polyline.length > 0) {
          transportStops.push({
            id: `departure-${stepIndex}`,
            coordinate: step.polyline[0],
            type: "departure",
            title: `Embarque: ${step.transit_details.departure}`,
            description: `${step.transportIcon === 'bus' ? 'Ônibus' : step.transportIcon === 'subway' ? 'Metrô' : 'Trem'} ${step.transit_details.lineName}`,
            color: step.stepColor,
          });
        }

        if (step.polyline.length > 0) {
          transportStops.push({
            id: `arrival-${stepIndex}`,
            coordinate: step.polyline[step.polyline.length - 1],
            type: "arrival",
            title: `Desembarque: ${step.transit_details.arrival}`,
            description: `${step.transportIcon === 'bus' ? 'Ônibus' : step.transportIcon === 'subway' ? 'Metrô' : 'Trem'} ${step.transit_details.lineName}`,
            color: step.stepColor,
          });
        }
      }
    });

    return transportStops.map((stop) => (
      <Marker
        key={stop.id}
        coordinate={stop.coordinate}
        title={stop.title}
        description={stop.description}
        pinColor={stop.color}
      >
        <View style={styles.busStopMarker}>
          <Ionicons
            name={stop.type === "departure" ? "play-circle" : "flag"}
            size={20}
            color="#FFFFFF"
          />
        </View>
      </Marker>
    ));
  };

  // Calcular rota usando Google Directions API
  const calculateRoute = async (transportMode) => {
    if (!location || !selectedMarker) return;

    setIsCalculatingRoute(true);

    try {
      if (transportMode === "transit") {
        setTransportModalVisible(true);
        setIsCalculatingRoute(false);
        return;
      }

      const detailedRoute = await fetchDetailedRoute(transportMode);

      if (detailedRoute) {
        setRouteCoordinates(detailedRoute.polyline);
        setRouteSegments(detailedRoute.coloredSegments);

        setRouteInfo({
          distance: detailedRoute.distance,
          duration: detailedRoute.duration,
          mode: transportMode,
        });

        setSelectedTransport(transportMode);
        setShowRoute(true);

        if (detailedRoute.polyline.length > 0) {
          let minLat = detailedRoute.polyline[0].latitude;
          let maxLat = detailedRoute.polyline[0].latitude;
          let minLng = detailedRoute.polyline[0].longitude;
          let maxLng = detailedRoute.polyline[0].longitude;

          detailedRoute.polyline.forEach((coord) => {
            minLat = Math.min(minLat, coord.latitude);
            maxLat = Math.max(maxLat, coord.latitude);
            minLng = Math.min(minLng, coord.longitude);
            maxLng = Math.max(maxLng, coord.longitude);
          });

          const latDelta = (maxLat - minLat) * 1.5;
          const lngDelta = (maxLng - minLng) * 1.5;

          setRegion({
            latitude: (minLat + maxLat) / 2,
            longitude: (minLng + maxLng) / 2,
            latitudeDelta: Math.max(latDelta, 0.01),
            longitudeDelta: Math.max(lngDelta, 0.01),
          });
        }
      } else {
        calculateStraightRoute(transportMode);
      }
    } catch (error) {
      console.error("Erro ao calcular rota:", error);
      calculateStraightRoute(transportMode);
    } finally {
      setIsCalculatingRoute(false);
      if (transportMode !== "transit") {
        setRouteModalVisible(false);
        setMarkerModalVisible(false);
      }
    }
  };

  // Fallback: calcular rota em linha reta
  const calculateStraightRoute = (transportMode) => {
    const start = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    const end = {
      latitude: selectedMarker.latitude,
      longitude: selectedMarker.longitude,
    };

    const coordinates = [start, end];
    setRouteCoordinates(coordinates);

    const straightSegment = {
      coordinates: coordinates,
      color: getTransportColor(transportMode),
      type: transportMode,
      travel_mode: transportMode,
      stepIndex: 0,
      isWalking: transportMode === 'walking'
    };
    setRouteSegments([straightSegment]);

    const distance = calculateDistance(
      start.latitude,
      start.longitude,
      end.latitude,
      end.longitude
    );

    let speed;
    switch (transportMode) {
      case "driving":
        speed = 40;
        break;
      case "transit":
        speed = 25;
        break;
      case "walking":
        speed = 5;
        break;
      case "bicycling":
        speed = 15;
        break;
      default:
        speed = 5;
    }

    const timeInMinutes = Math.round((distance / speed) * 60);

    setRouteInfo({
      distance: `${distance.toFixed(1)} km`,
      duration: `${timeInMinutes} min`,
      mode: transportMode,
    });

    setSelectedTransport(transportMode);
    setShowRoute(true);
    setRouteModalVisible(false);
    setMarkerModalVisible(false);
  };

  // Função auxiliar para obter cor do transporte
  const getTransportColor = (transportMode) => {
    switch (transportMode) {
      case "driving":
        return "#007AFF";
      case "walking":
        return "#34C759";
      case "bicycling":
        return "#FF3B30";
      case "transit":
        return "#FF9500";
      default:
        return "#007AFF";
    }
  };

  // Limpar rota
  const clearRoute = () => {
    setShowRoute(false);
    setRouteCoordinates([]);
    setRouteSegments([]);
    setRouteInfo(null);
    setSelectedTransport(null);
    setBusRoutes([]);
  };

  // Modal principal para seleção do tipo de rota
  const renderRouteModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={routeModalVisible}
        onRequestClose={() => setRouteModalVisible(false)}
      >
        <View style={styles.routeModalContainer}>
          <View style={styles.routeModalContent}>
            <View style={styles.routeModalHeader}>
              <Text style={styles.routeModalTitle}>Como chegar?</Text>
              <Pressable
                style={styles.routeCloseButton}
                onPress={() => setRouteModalVisible(false)}
              >
                <Ionicons name="close" size={24} color={isDarkMode ? '#FFF' : '#333'} />
              </Pressable>
            </View>

            <View style={styles.routeOptionsContainer}>
              <Text style={styles.routeDestination}>
                Para: {selectedMarker?.title}
              </Text>

              <Pressable
                style={styles.routeOption}
                onPress={() => calculateRoute("driving")}
                disabled={isCalculatingRoute}
              >
                <View style={styles.routeOptionIcon}>
                  <Ionicons name="car-sport" size={24} color="#007AFF" />
                </View>
                <View style={styles.routeOptionTextContainer}>
                  <Text style={styles.routeOptionTitle}>Carro</Text>
                  <Text style={styles.routeOptionDescription}>
                    Rotas para veículo
                  </Text>
                </View>
              </Pressable>

              <Pressable
                style={styles.routeOption}
                onPress={() => calculateRoute("transit")}
                disabled={isCalculatingRoute}
              >
                <View style={styles.routeOptionIcon}>
                  <Ionicons name="bus" size={24} color="#FF9500" />
                </View>
                <View style={styles.routeOptionTextContainer}>
                  <Text style={styles.routeOptionTitle}>
                    Transporte Público
                  </Text>
                  <Text style={styles.routeOptionDescription}>
                    Ônibus, trem, metrô
                  </Text>
                </View>
              </Pressable>

              <Pressable
                style={styles.routeOption}
                onPress={() => calculateRoute("walking")}
                disabled={isCalculatingRoute}
              >
                <View style={styles.routeOptionIcon}>
                  <Ionicons name="walk" size={24} color="#34C759" />
                </View>
                <View style={styles.routeOptionTextContainer}>
                  <Text style={styles.routeOptionTitle}>A pé</Text>
                  <Text style={styles.routeOptionDescription}>
                    Rotas para caminhada
                  </Text>
                </View>
              </Pressable>

              <Pressable
                style={styles.routeOption}
                onPress={() => calculateRoute("bicycling")}
                disabled={isCalculatingRoute}
              >
                <View style={styles.routeOptionIcon}>
                  <Ionicons name="bicycle" size={24} color="#FF3B30" />
                </View>
                <View style={styles.routeOptionTextContainer}>
                  <Text style={styles.routeOptionTitle}>Bicicleta</Text>
                  <Text style={styles.routeOptionDescription}>
                    Rotas cicláveis
                  </Text>
                </View>
              </Pressable>
            </View>

            {isCalculatingRoute && (
              <View style={styles.calculatingRouteContainer}>
                <ActivityIndicator size="small" color={Colors[temaCor]} />
                <Text style={styles.calculatingRouteText}>
                  Calculando rota...
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  };

  // Modal para seleção de modos de transporte público
  const renderTransitModeModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={transportModalVisible}
        onRequestClose={() => setTransportModalVisible(false)}
      >
        <View style={styles.routeModalContainer}>
          <View style={styles.routeModalContent}>
            <View style={styles.routeModalHeader}>
              <Text style={styles.routeModalTitle}>Transporte Público</Text>
              <Pressable
                style={styles.routeCloseButton}
                onPress={() => setTransportModalVisible(false)}
              >
                <Ionicons name="close" size={24} color={isDarkMode ? '#FFF' : '#333'} />
              </Pressable>
            </View>

            <View style={styles.routeOptionsContainer}>
              <Text style={styles.routeDestination}>
                Para: {selectedMarker?.title}
              </Text>

              <Text style={styles.transitModeTitle}>
                Selecione os modos de transporte:
              </Text>

              <View style={styles.transitModeOptions}>
                <Pressable
                  style={[
                    styles.transitModeOption,
                    selectedTransitModes.bus && styles.transitModeOptionSelected
                  ]}
                  onPress={() => setSelectedTransitModes(prev => ({
                    ...prev,
                    bus: !prev.bus
                  }))}
                >
                  <View style={styles.transitModeIconContainer}>
                    <Ionicons name="bus" size={24} color="#FF9500" />
                  </View>
                  <View style={styles.transitModeTextContainer}>
                    <Text style={styles.transitModeOptionTitle}>Ônibus</Text>
                    <Text style={styles.transitModeOptionDescription}>
                      Rotas de ônibus urbano
                    </Text>
                  </View>
                  <View style={styles.checkboxContainer}>
                    {selectedTransitModes.bus && (
                      <Ionicons name="checkmark-circle" size={24} color="#34C759" />
                    )}
                  </View>
                </Pressable>

                <Pressable
                  style={[
                    styles.transitModeOption,
                    selectedTransitModes.subway && styles.transitModeOptionSelected
                  ]}
                  onPress={() => setSelectedTransitModes(prev => ({
                    ...prev,
                    subway: !prev.subway
                  }))}
                >
                  <View style={styles.transitModeIconContainer}>
                    <Ionicons name="subway" size={24} color="#007AFF" />
                  </View>
                  <View style={styles.transitModeTextContainer}>
                    <Text style={styles.transitModeOptionTitle}>Metrô</Text>
                    <Text style={styles.transitModeOptionDescription}>
                      Linhas de metrô
                    </Text>
                  </View>
                  <View style={styles.checkboxContainer}>
                    {selectedTransitModes.subway && (
                      <Ionicons name="checkmark-circle" size={24} color="#34C759" />
                    )}
                  </View>
                </Pressable>

                <Pressable
                  style={[
                    styles.transitModeOption,
                    selectedTransitModes.train && styles.transitModeOptionSelected
                  ]}
                  onPress={() => setSelectedTransitModes(prev => ({
                    ...prev,
                    train: !prev.train
                  }))}
                >
                  <View style={styles.transitModeIconContainer}>
                    <Ionicons name="train" size={24} color="#FF3B30" />
                  </View>
                  <View style={styles.transitModeTextContainer}>
                    <Text style={styles.transitModeOptionTitle}>Trem</Text>
                    <Text style={styles.transitModeOptionDescription}>
                      Linhas de trem e CPTM
                    </Text>
                  </View>
                  <View style={styles.checkboxContainer}>
                    {selectedTransitModes.train && (
                      <Ionicons name="checkmark-circle" size={24} color="#34C759" />
                    )}
                  </View>
                </Pressable>
              </View>

              <View style={styles.selectedModesSummary}>
                <Text style={styles.selectedModesText}>
                  Modos selecionados: {
                    Object.entries(selectedTransitModes)
                      .filter(([_, selected]) => selected)
                      .map(([mode]) => {
                        switch (mode) {
                          case 'bus': return 'Ônibus';
                          case 'subway': return 'Metrô';
                          case 'train': return 'Trem';
                          default: return mode;
                        }
                      })
                      .join(', ')
                  }
                </Text>
              </View>

              <View style={styles.transitModalButtons}>
                <Pressable
                  style={styles.backToTransportButton}
                  onPress={() => {
                    setTransportModalVisible(false);
                    setRouteModalVisible(true);
                  }}
                >
                  <Ionicons name="arrow-back" size={20} color="#007AFF" />
                  <Text style={styles.backToTransportButtonText}>
                    Voltar
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.searchRoutesButton,
                    (!selectedTransitModes.bus && !selectedTransitModes.subway && !selectedTransitModes.train) &&
                    styles.searchRoutesButtonDisabled
                  ]}
                  onPress={fetchTransitRoutes}
                  disabled={!selectedTransitModes.bus && !selectedTransitModes.subway && !selectedTransitModes.train}
                >
                  <Text style={styles.searchRoutesButtonText}>
                    Buscar Rotas
                  </Text>
                </Pressable>
              </View>
            </View>

            {isCalculatingRoute && (
              <View style={styles.calculatingRouteContainer}>
                <ActivityIndicator size="small" color={Colors[temaCor]} />
                <Text style={styles.calculatingRouteText}>
                  Buscando rotas de transporte público...
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  };

  // Modal de rotas de transporte público
  const renderBusModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={busModalVisible}
        onRequestClose={() => setBusModalVisible(false)}
      >
        <View style={styles.busModalContainer}>
          <View style={styles.busModalContent}>
            <View style={styles.busModalHeader}>
              <View style={styles.busModalTitleContainer}>
                <Ionicons name="bus" size={24} color="#FF9500" />
                <Text style={styles.busModalTitle}>Rotas de Transporte</Text>
              </View>
              <Pressable
                style={styles.busCloseButton}
                onPress={() => setBusModalVisible(false)}
              >
                <Ionicons name="close" size={24} color={isDarkMode ? '#FFF' : '#333'} />
              </Pressable>
            </View>

            <View style={styles.busRouteSummary}>
              <Text style={styles.busRouteDestination}>
                Para: {selectedMarker?.title}
              </Text>
              <Text style={styles.busRouteCount}>
                {busRoutes.length} rotas encontradas
              </Text>
            </View>

            <ScrollView
              style={styles.busRoutesList}
              showsVerticalScrollIndicator={false}
            >
              {busRoutes.map((route, routeIndex) => (
                <View key={route.id} style={styles.busRouteCard}>
                  <View style={styles.busRouteHeader}>
                    <View style={styles.routeNumberContainer}>
                      <Text style={styles.routeNumber}>
                        Rota {routeIndex + 1}
                      </Text>
                    </View>
                    <View style={styles.routeStats}>
                      <View style={styles.routeStat}>
                        <Ionicons name="time-outline" size={14} color="#666" />
                        <Text style={styles.routeStatText}>
                          {route.duration}
                        </Text>
                      </View>
                      <View style={styles.routeStat}>
                        <Ionicons
                          name="location-outline"
                          size={14}
                          color="#666"
                        />
                        <Text style={styles.routeStatText}>
                          {route.distance}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.routeTimeline}>
                    {route.allSteps.map((step, stepIndex) => (
                      <View key={stepIndex} style={styles.timelineItem}>
                        <View
                          style={[
                            styles.timelineDot,
                            { backgroundColor: step.stepColor }
                          ]}
                        />
                        <View style={styles.timelineContent}>
                          {step.travel_mode === "WALKING" ? (
                            <>
                              <Text style={styles.timelineTitle}>
                                Caminhada
                              </Text>
                              <Text style={styles.timelineDescription}>
                                {step.instructions.replace(/<[^>]*>/g, '')}
                              </Text>
                              <Text style={styles.timelineTime}>
                                {step.duration} • {step.distance}
                              </Text>
                            </>
                          ) : step.travel_mode === "TRANSIT" ? (
                            <>
                              <View style={styles.transportLineHeader}>
                                <View style={styles.transportLineInfo}>
                                  <View
                                    style={[
                                      styles.transportNumberBadge,
                                      { backgroundColor: step.transit_details?.lineColor || step.stepColor }
                                    ]}
                                  >
                                    <Ionicons
                                      name={step.transportIcon}
                                      size={16}
                                      color="#FFFFFF"
                                    />
                                    <Text style={styles.transportNumberText}>
                                      {step.transit_details?.lineName || "Linha"}
                                    </Text>
                                  </View>
                                </View>
                              </View>

                              <View style={styles.transportStopsInfo}>
                                <View style={styles.transportStopItem}>
                                  <Ionicons
                                    name="play-circle"
                                    size={12}
                                    color="#34C759"
                                  />
                                  <Text style={styles.transportStopText}>
                                    Embarque: {step.transit_details?.departure}
                                  </Text>
                                </View>
                                <View style={styles.transportStopItem}>
                                  <Ionicons
                                    name="flag"
                                    size={12}
                                    color="#FF3B30"
                                  />
                                  <Text style={styles.transportStopText}>
                                    Desembarque: {step.transit_details?.arrival}
                                  </Text>
                                </View>
                              </View>

                              <View style={styles.transportJourneyDetails}>
                                <Text style={styles.transportJourneyText}>
                                  {step.duration} • {step.distance}
                                </Text>
                              </View>
                            </>
                          ) : null}
                        </View>
                      </View>
                    ))}
                  </View>

                  <Pressable
                    style={styles.selectRouteButton}
                    onPress={() => {
                      setRouteCoordinates(route.polyline);
                      setRouteSegments(route.coloredSegments);
                      setRouteInfo({
                        distance: route.distance,
                        duration: route.duration,
                        mode: "transit",
                        steps: route.steps,
                        coloredSegments: route.coloredSegments,
                      });
                      setSelectedTransport("transit");
                      setShowRoute(true);
                      setBusModalVisible(false);
                    }}
                  >
                    <Text style={styles.selectRouteButtonText}>
                      Usar esta rota
                    </Text>
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  // Componente de informações da rota
  const renderRouteInfo = () => {
    if (!routeInfo || !showRoute) return null;

    const getTransportIcon = () => {
      switch (routeInfo.mode) {
        case "driving":
          return "car-sport";
        case "transit":
          return "bus";
        case "walking":
          return "walk";
        case "bicycling":
          return "bicycle";
        default:
          return "navigate";
      }
    };

    const getTransportColor = () => {
      switch (routeInfo.mode) {
        case "driving":
          return "#007AFF";
        case "transit":
          return "#FF9500";
        case "walking":
          return "#34C759";
        case "bicycling":
          return "#FF3B30";
        default:
          return "#666";
      }
    };

    return (
      <View style={styles.routeInfoContainer}>
        <View style={styles.routeInfoHeader}>
          <View style={styles.routeInfoTransport}>
            <Ionicons
              name={getTransportIcon()}
              size={20}
              color={getTransportColor()}
            />
            <Text style={styles.routeInfoTitle}>
              {routeInfo.mode === "driving"
                ? "Carro"
                : routeInfo.mode === "transit"
                  ? "Transporte Público"
                  : routeInfo.mode === "walking"
                    ? "A pé"
                    : "Bicicleta"}
            </Text>
          </View>
          <Pressable onPress={clearRoute}>
            <Ionicons name="close" size={20} color="#666" />
          </Pressable>
        </View>

        <View style={styles.routeInfoDetails}>
          <View style={styles.routeInfoItem}>
            <Ionicons name="time" size={16} color="#666" />
            <Text style={styles.routeInfoText}>{routeInfo.duration}</Text>
          </View>
          <View style={styles.routeInfoItem}>
            <Ionicons name="location" size={16} color="#666" />
            <Text style={styles.routeInfoText}>{routeInfo.distance}</Text>
          </View>
        </View>

        {routeInfo.mode === "transit" && (
          <Pressable
            style={styles.busDetailsButton}
            onPress={() => setBusModalVisible(true)}
          >
            <Text style={styles.busDetailsButtonText}>
              Ver detalhes do transporte
            </Text>
          </Pressable>
        )}
      </View>
    );
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const findNearestLocations = (currentLat, currentLng, markersArray) => {
    const locationsWithDistance = markersArray.map((marker) => ({
      ...marker,
      distance: calculateDistance(
        currentLat,
        currentLng,
        marker.latitude,
        marker.longitude
      ),
    }));

    const sortedLocations = locationsWithDistance.sort(
      (a, b) => a.distance - b.distance
    );

    return sortedLocations;
  };

  const getFilteredMarkers = () => {
    if (filterType === "custom") {
      if (filteredMarkers.length > 0) {
        return filteredMarkers;
      }
      return [];
    }

    if (filterType === "all") {
      return Object.values(markers).flat();
    }

    const tipo = filterType.toLowerCase();
    return markers[tipo] || [];
  };

  const getFilteredData = () => {
    const currentMarkers = getFilteredMarkers();

    if (location && currentMarkers.length > 0) {
      return findNearestLocations(
        location.coords.latitude,
        location.coords.longitude,
        currentMarkers
      );
    }

    return currentMarkers;
  };

  const getModalFilteredData = () => {
    let markersToUse = [];

    if (modalFilterType === "custom") {
      markersToUse = filteredMarkers;
    } else if (modalFilterType === "all") {
      markersToUse = Object.values(markers).flat();
    } else {
      markersToUse = markers[modalFilterType] || [];
    }

    if (location && markersToUse.length > 0) {
      return findNearestLocations(
        location.coords.latitude,
        location.coords.longitude,
        markersToUse
      );
    }

    return markersToUse;
  };

  const getMarkerColor = (markerType) => {
    switch (markerType) {
      case "Cartório Civil":
        return "purple";
      case "Poupatempo":
        return "blue";
      case "SPTrans":
        return "red";
      case "Receita Federal":
        return "green";
      case "Zona Eleitoral":
        return "orange";
      case "secretariaSeguranca":
        return "darkblue";
      case "policiaFederal":
        return "navy";
      case "detran":
        return "darkgreen";
      case "cfc":
        return "teal";
      case "bomPrato":
        return "brown";
      case "Bolívia":
        return "yellow";
      case "Venezuela":
        return "gold";
      case "Nigéria":
        return "green";
      case "Haiti":
        return "red";
      case "Angola":
        return "red";
      default:
        return "green";
    }
  };

  const getBadgeColor = (markerType) => {
    switch (markerType) {
      case "Cartório Civil":
        return styles.cartorioBadge;
      case "Poupatempo":
        return styles.poupatempoBadge;
      case "SPTrans":
        return styles.sptransBadge;
      case "Receita Federal":
        return styles.receitaBadge;
      case "Zona Eleitoral":
        return styles.zonaFederalBadge;
      case "secretariaSeguranca":
        return styles.segurancaBadge;
      case "policiaFederal":
        return styles.pfBadge;
      case "detran":
        return styles.detranBadge;
      case "cfc":
        return styles.cfcBadge;
      case "bomPrato":
        return styles.bompratoBadge;
      case "Bolívia":
        return styles.consuladoBadge;
      case "Venezuela":
        return styles.consuladoBadge;
      case "Nigéria":
        return styles.consuladoBadge;
      case "Haiti":
        return styles.consuladoBadge;
      case "Angola":
        return styles.consuladoBadge;
      default:
        return styles.poupatempoBadge;
    }
  };

  const getItemColor = (markerType) => {
    switch (markerType) {
      case "Cartório Civil":
        return styles.cartorioItem;
      case "Poupatempo":
        return styles.poupatempoItem;
      case "SPTrans":
        return styles.sptransItem;
      case "Receita Federal":
        return styles.receitaItem;
      case "Zona Eleitoral":
        return styles.zonaFederalItem;
      case "secretariaSeguranca":
        return styles.segurancaItem;
      case "policiaFederal":
        return styles.pfItem;
      case "detran":
        return styles.detranItem;
      case "cfc":
        return styles.cfcItem;
      case "bomPrato":
        return styles.bompratoItem;
      case "Bolívia":
        return styles.consuladoItem;
      case "Venezuela":
        return styles.consuladoItem;
      case "Nigéria":
        return styles.consuladoItem;
      case "Haiti":
        return styles.consuladoItem;
      case "Angola":
        return styles.consuladoItem;
      default:
        return styles.poupatempoItem;
    }
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setModalVisible(false);
    setMarkerModalVisible(true);

    setRegion({
      latitude: marker.latitude,
      longitude: marker.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const renderMarkerModal = () => {
    if (!selectedMarker) return null;
    const distanceFromUser =
      selectedMarker.distance?.toFixed(2) || "Calculando...";

    const descriptionLines = selectedMarker.description.split("\n");
    const contactInfo =
      descriptionLines.find((line) =>
        line.toLowerCase().includes("telefone:")
      ) ||
      descriptionLines.find((line) => line.toLowerCase().includes("cep:")) ||
      "Detalhes não especificados";
    const cityState = descriptionLines[0] || "";
    const streetAndDetails =
      descriptionLines.slice(1).join("\n") ||
      "Detalhes adicionais não especificados";

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={markerModalVisible}
        onRequestClose={() => setMarkerModalVisible(false)}
      >
        <View style={styles.markerModalContainer}>
          <View style={styles.markerModalContent}>
            <View style={styles.markerModalHeader}>
              <View
                style={[
                  styles.markerTypeBadge,
                  getBadgeColor(selectedMarker.type),
                ]}
              >
                <Text style={styles.markerTypeBadgeText}>
                  {selectedMarker.type.toUpperCase()}
                </Text>
              </View>
              <Pressable
                style={styles.markerCloseButton}
                onPress={() => setMarkerModalVisible(false)}
              >
                <Ionicons name="close" size={24} color={isDarkMode ? '#FFF' : '#333'} />
              </Pressable>
            </View>

            <ScrollView style={styles.markerModalBody}>
              <Text style={styles.markerModalTitle}>
                {selectedMarker.title}
              </Text>

              <View style={styles.markerInfoSection}>
                <Text style={styles.markerInfoLabel}>
                  Distância da sua localização:
                </Text>
                <Text style={styles.markerInfoValue}>
                  {distanceFromUser} km
                </Text>
              </View>

              <View style={styles.markerInfoSection}>
                <Text style={styles.markerInfoLabel}>Localidade:</Text>
                <Text style={styles.markerInfoValue}>{cityState}</Text>
              </View>

              <View style={styles.markerInfoSection}>
                <Text style={styles.markerInfoLabel}>Detalhes e Contato:</Text>
                <Text style={styles.markerInfoValue}>{streetAndDetails}</Text>
              </View>
            </ScrollView>

            <View style={styles.markerModalFooter}>
              <Pressable
                style={[styles.markerActionButton, styles.directionsButton]}
                onPress={() => {
                  setMarkerModalVisible(false);
                  setRouteModalVisible(true);
                }}
              >
                <Text style={styles.directionsButtonText}>Como Chegar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const getModalTitle = () => {
    if (modalFilterType === "custom" && locais && locais.length > 0) {
      const tiposFormatados = locais.map(local => {
        switch (local) {
          case 'unidadeSaude': return 'Unidades de Saúde';
          case 'poupaTempo': return 'Poupatempo';
          case 'sptrans': return 'SPTrans';
          case 'cartorioCivil': return 'Cartórios Civis';
          case 'receitaFederal': return 'Receita Federal';
          case 'zonaEleitoral': return 'Zonas Eleitorais';
          case 'secretariaSeguranca': return 'Secretaria Segurança';
          case 'policiafederal': return 'Polícia Federal';
          case 'detran': return 'Detran';
          case 'cfc': return 'CFC';
          case 'bomPrato': return 'Bom Prato';
          case 'Bolívia': return 'Consulado Bolívia';
          case 'Venezuela': return 'Consulado Venezuela';
          case 'Nigéria': return 'Consulado Nigéria';
          case 'Haiti': return 'Consulado Haiti';
          case 'Angola': return 'Consulado Angola';
          default: return local;
        }
      }).join(' + ');
      return `Locais: ${tiposFormatados}`;
    }
    switch (modalFilterType) {
      case "all":
        return "Todos os Locais Próximos";
      case "poupatempo":
        return "Poupatempo Próximos";
      case "sptrans":
        return "SPTrans Próximos";
      case "cartoriocivil":
        return "Cartórios Civis Próximos";
      case "receitafederal":
        return "Receita Federal Próximos";
      case "zonaeleitoral":
        return "Zonas Eleitorais Próximos";
      case "secretariaseguranca":
        return "Secretaria de Segurança";
      case "policiafederal":
        return "Polícia Federal";
      case "detran":
        return "Detran";
      case "cfc":
        return "Centros de Formação de Condutores";
      case "bomprato":
        return "Restaurantes Bom Prato";
      case "bolivia":
        return "Consulado da Bolívia";
      case "venezuela":
        return "Consulado da Venezuela";
      case "nigeria":
        return "Consulado da Nigéria";
      case "haiti":
        return "Consulado do Haiti";
      case "angola":
        return "Consulado de Angola";
      default:
        return "Locais Próximos";
    }
  };

  const renderFilterButtons = () => {
    const filterOptions = [
      { key: "all", label: "Todos", icon: "location" },
      { key: "poupatempo", label: "Poupatempo", icon: "business" },
      { key: "sptrans", label: "SPTrans", icon: "bus" },
      { key: "cartoriocivil", label: "Cartórios", icon: "document" },
      { key: "receitafederal", label: "Receita", icon: "card" },
      { key: "zonaeleitoral", label: "Zonas", icon: "people" },
      { key: "secretariaseguranca", label: "Segurança", icon: "shield" },
      { key: "policiafederal", label: "PF", icon: "shield-checkmark" },
      { key: "detran", label: "Detran", icon: "car" },
      { key: "cfc", label: "CFC", icon: "school" },
      { key: "bomprato", label: "Bom Prato", icon: "restaurant" },
      { key: "bolivia", label: "Bolívia", icon: "flag" },
      { key: "venezuela", label: "Venezuela", icon: "flag" },
      { key: "nigeria", label: "Nigéria", icon: "flag" },
      { key: "haiti", label: "Haiti", icon: "flag" },
      { key: "angola", label: "Angola", icon: "flag" },
    ];

    // Adiciona opção customizada se houver locais específicos
    if (locais && locais.length > 0) {
      const customLabel = locais.map(local => {
        switch (local) {
          case 'unidadeSaude': return 'Saúde';
          case 'poupaTempo': return 'Poupatempo';
          case 'sptrans': return 'SPTrans';
          case 'cartorioCivil': return 'Cartório';
          case 'receitaFederal': return 'Receita';
          case 'zonaEleitoral': return 'Zona';
          case 'secretariaSeguranca': return 'Segurança';
          case 'policiaFederal': return 'PF';
          case 'detran': return 'Detran';
          case 'cfc': return 'CFC';
          case 'bomPrato': return 'Bom Prato';
          case 'Bolívia': return 'Bolívia';
          case 'Venezuela': return 'Venezuela';
          case 'Nigéria': return 'Nigéria';
          case 'Haiti': return 'Haiti';
          case 'Angola': return 'Angola';
          default: return local;
        }
      }).join(' + ');

      filterOptions.unshift({
        key: "custom",
        label: customLabel,
        icon: "star"
      });
    }

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContentContainer}
      >
        {filterOptions.map((option) => (
          <Pressable
            key={option.key}
            style={[
              styles.filterButton,
              modalFilterType === option.key && styles.filterButtonActive,
            ]}
            onPress={() => {
              setModalFilterType(option.key);
              if (option.key !== "custom") {
                setFilterType(option.key);
              }
            }}
          >
            <Ionicons
              name={option.icon}
              size={16}
              color={modalFilterType === option.key ? '#fff' : (isDarkMode ? '#ccc' : '#666')}
              style={styles.filterIcon}
            />
            <Text
              style={[
                styles.filterButtonText,
                modalFilterType === option.key && styles.filterButtonTextActive,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    );
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permissão de localização negada!");
          setIsLoading(false);
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setLocation(currentLocation);

        setRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });

        let addressResponse = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

        if (addressResponse.length > 0) {
          const addr = addressResponse[0];
          setAddress(`${addr.street}, ${addr.city} - ${addr.region}`);
        }

        const currentMarkers = getFilteredMarkers();
        if (currentMarkers.length > 0) {
          const nearestWithDistance = findNearestLocations(
            currentLocation.coords.latitude,
            currentLocation.coords.longitude,
            currentMarkers
          );
          setNearestLocations(nearestWithDistance);
        }
      } catch (error) {
        setErrorMsg("Erro ao obter localização: " + error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [filterType]);

  const renderLocationItem = ({ item }) => {
    const mainDescription = item.description.split("\n")[0];

    return (
      <TouchableOpacity
        style={[styles.locationItem, getItemColor(item.type)]}
        onPress={() => handleMarkerPress(item)}
      >
        <View style={styles.locationInfo}>
          <Text style={styles.locationTitle}>{item.title}</Text>
          <Text style={styles.locationDescription}>{mainDescription}</Text>
          <Text style={styles.locationDistance}>
            {item.distance?.toFixed(2)} km de distância
          </Text>
          <View style={[styles.typeBadge, getBadgeColor(item.type)]}>
            <Text style={styles.typeBadgeText}>{item.type}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors[temaCor]} />
        <Text style={styles.loadingText}>Obtendo sua localização...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  const currentFilteredData = getFilteredData();
  const currentFilteredMarkers = getFilteredMarkers();
  const modalFilteredData = getModalFilteredData();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFF' : '#333'} />
        </Pressable>

        {address ? (
          <View style={styles.addressContainer}>
            <Ionicons name="location" size={16} color={Colors[temaCor]} />
            <Text style={styles.addressText}>{address}</Text>
          </View>
        ) : null}
      </View>

      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onRegionChangeComplete={setRegion}
      >
        {renderColoredRoute()}
        {renderTransportStops()}

        {currentFilteredMarkers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description.split("\n")[0]}
            onPress={() => handleMarkerPress(marker)}
            pinColor={getMarkerColor(marker.type)}
          />
        ))}
      </MapView>

      {renderRouteInfo()}

      <Pressable
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="list" size={20} color="#FFF" />
        <Text style={styles.floatingButtonText}>Locais Próximos</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{getModalTitle()}</Text>
              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={24} color={isDarkMode ? '#FFF' : '#333'} />
              </Pressable>
            </View>

            {renderFilterButtons()}

            <FlatList
              data={modalFilteredData}
              renderItem={renderLocationItem}
              keyExtractor={(item) => item.id.toString()}
              style={styles.locationsList}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <View style={styles.emptyListContainer}>
                  <Ionicons name="location-off" size={48} color={isDarkMode ? '#666' : '#CCC'} />
                  <Text style={styles.emptyListText}>
                    Nenhum local encontrado para este filtro.
                  </Text>
                </View>
              )}
            />

            <Text style={styles.modalFooter}>
              {modalFilteredData.length}{" "}
              {modalFilteredData.length === 1
                ? "local encontrado"
                : "locais encontrados"}
            </Text>
          </View>
        </View>
      </Modal>

      {renderMarkerModal()}
      {renderRouteModal()}
      {renderTransitModeModal()}
      {renderBusModal()}
    </View>
  );
}