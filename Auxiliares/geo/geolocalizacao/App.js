import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  FlatList,
  Pressable,
    ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState("");
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [nearestLocations, setNearestLocations] = useState([]);
  const [filterType, setFilterType] = useState("all"); 
  const [markerModalVisible, setMarkerModalVisible] = useState(false); 
  const [selectedMarker, setSelectedMarker] = useState(null); 

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markers, setMarkers] = useState({
    // ====================================================================================
    // UNIDADES POUPATEMPO
    // ====================================================================================
    poupatempo: [
      // CAPITAL
      {
        id: 1,
        type: "Poupatempo",
        latitude: -23.6669,
        longitude: -46.6644,
        title: "Poupatempo Cidade Ademar",
        description:
          "Av. Cupecê, 5497 - Jardim Miriam\nHorário: Seg a Sex, 7h às 19h; Sáb, 7h às 13h",
      },
      {
        id: 2,
        type: "Poupatempo",
        latitude: -23.5413,
        longitude: -46.5901,
        title: "Poupatempo Itaquera",
        description:
          "Av. do Contorno, 60\nHorário: Seg a Sex, 7h às 19h; Sáb, 7h às 13h",
      },
      {
        id: 3,
        type: "Poupatempo",
        latitude: -23.5186,
        longitude: -46.6974,
        title: "Poupatempo Lapa",
        description:
          "Rua do Curtume s/nº\nHorário: Seg a Sex, 7h às 19h; Sáb, 7h às 13h",
      },
      {
        id: 4,
        type: "Poupatempo",
        latitude: -23.535,
        longitude: -46.6335,
        title: "Poupatempo Sé",
        description:
          "Praça do Carmo, s/nº\nHorário: Seg a Sex, 7h às 19h; Sáb, 7h às 13h",
      },
      {
        id: 5,
        type: "Poupatempo",
        latitude: -23.5359,
        longitude: -46.6393,
        title: "Poupatempo Luz",
        description:
          "Praça Alfredo Issa, 57 (Exclusivo RG)\nHorário: Seg a Sex, 7h às 19h; Sáb, 7h às 13h",
      },
      {
        id: 6,
        type: "Poupatempo",
        latitude: -23.6591,
        longitude: -46.6853,
        title: "Poupatempo Santo Amaro",
        description:
          "Rua Amador Bueno, 176 / 258\nHorário: Seg a Sex, 7h às 19h; Sáb, 7h às 13h",
      },
  
      // GRANDE SÃO PAULO E INTERIOR
      {
        id: 7,
        type: "Poupatempo",
        latitude: -23.4687,
        longitude: -46.533,
        title: "Poupatempo Guarulhos",
        description:
          "Rua José Campanella, 189\nHorário: Seg a Sex, 7h às 19h; Sáb, 7h às 13h",
      },
      {
        id: 8,
        type: "Poupatempo",
        latitude: -23.5284,
        longitude: -46.1866,
        title: "Poupatempo Mogi das Cruzes",
        description:
          "Av. Ver. Narciso Yague Guimarães, 1.000\nHorário: Seg a Sex, 8h às 18h; Sáb, 8h às 13h",
      },
      {
        id: 9,
        type: "Poupatempo",
        latitude: -23.5323,
        longitude: -46.7797,
        title: "Poupatempo Osasco",
        description:
          "Av. Hilário Pereira de Souza, 664\nHorário: Seg a Sex, 8h às 18h; Sáb, 8h às 14h",
      },
      {
        id: 10,
        type: "Poupatempo",
        latitude: -23.6934,
        longitude: -46.5621,
        title: "Poupatempo São Bernardo do Campo",
        description:
          "Rua Nicolau Filizola, 100\nHorário: Seg a Sex, 7h às 19h; Sáb, 7h às 13h",
      },
      {
        id: 11,
        type: "Poupatempo",
        latitude: -23.9056,
        longitude: -46.3023,
        title: "Poupatempo Suzano",
        description:
          "Rua Sete de Setembro, 555\nHorário: Seg a Sex, 8h às 18h; Sáb, 8h às 13h",
      },
      {
        id: 12,
        type: "Poupatempo",
        latitude: -23.9351,
        longitude: -46.3312,
        title: "Poupatempo Santos",
        description:
          "Rua João Pessoa, 246\nHorário: Seg a Sex, 9h às 18h; Sáb, 9h às 14h",
      },
      {
        id: 13,
        type: "Poupatempo",
        latitude: -23.63,
        longitude: -45.4215,
        title: "Poupatempo Caraguatatuba",
        description:
          "Av. Rio Branco, 955\nHorário: Seg a Sex, 9h às 17h; Sáb, 9h às 13h",
      },
      {
        id: 14,
        type: "Poupatempo",
        latitude: -24.4996,
        longitude: -47.8427,
        title: "Poupatempo Registro",
        description:
          "Rua Antonio Policarpo de Souza, 50\nHorário: Seg a Sex, 8h às 17h; Sáb, 8h às 12h",
      },
      {
        id: 15,
        type: "Poupatempo",
        latitude: -22.7483,
        longitude: -47.3323,
        title: "Poupatempo Americana",
        description:
          "Rua Carioba, 331\nHorário: Seg a Sex, 8h às 17h; Sáb, 8h às 12h",
      },
      {
        id: 16,
        type: "Poupatempo",
        latitude: -21.2131,
        longitude: -50.4328,
        title: "Poupatempo Araçatuba",
        description:
          "Rua Tenente Alcides Theodoro Santos, 70\nHorário: Seg a Sex, 9h às 17h; Sáb, 9h às 13h",
      },
      {
        id: 17,
        type: "Poupatempo",
        latitude: -22.3606,
        longitude: -47.3857,
        title: "Poupatempo Araras",
        description:
          "Rua da Consolação, 79\nHorário: Seg a Sex, 8h às 17h; Sáb, 8h às 12h",
      },
      {
        id: 18,
        type: "Poupatempo",
        latitude: -21.7946,
        longitude: -48.1742,
        title: "Poupatempo Araraquara",
        description:
          "Av. Maria Antonia Camargo Oliveira, 261\nHorário: Seg a Sex, 9h às 17h; Sáb, 9h às 13h",
      },
      {
        id: 19,
        type: "Poupatempo",
        latitude: -22.3274,
        longitude: -49.0664,
        title: "Poupatempo Bauru",
        description:
          "Av. Nações Unidas, 4-44\nHorário: Seg a Sex, 8h às 17h; Sáb, 8h às 13h",
      },
      {
        id: 20,
        type: "Poupatempo",
        latitude: -23.0131,
        longitude: -48.4414,
        title: "Poupatempo Botucatu",
        description:
          "Av. Marechal Floriano Peixoto, 461\nHorário: Seg a Sex, 9h às 17h; Sáb, 9h às 13h",
      },
      {
        id: 21,
        type: "Poupatempo",
        latitude: -22.9068,
        longitude: -47.0628,
        title: "Poupatempo Campinas Centro",
        description:
          "Av. Francisco Glicério, 935\nHorário: Seg a Sex, 8h às 18h; Sáb, 7h às 13h",
      },
      {
        id: 22,
        type: "Poupatempo",
        latitude: -22.9221,
        longitude: -47.07,
        title: "Poupatempo Campinas Shopping",
        description:
          "Rua Jacy Teixeira de Camargo, 940\nHorário: Seg a Sex, 9h às 19h; Sáb, 8h às 14h",
      },
      {
        id: 23,
        type: "Poupatempo",
        latitude: -20.5367,
        longitude: -47.3916,
        title: "Poupatempo Franca",
        description:
          "Rua Ouvidor Freire, 1.986 / 1.996\nHorário: Seg a Sex, 9h às 17h; Sáb, 9h às 13h",
      },
      {
        id: 24,
        type: "Poupatempo",
        latitude: -23.9788,
        longitude: -48.8688,
        title: "Poupatempo Itapeva",
        description:
          "Avenida Mario Covas, 269\nHorário: Seg a Sex, 8h às 17h; Sáb, 8h às 12h",
      },
      {
        id: 25,
        type: "Poupatempo",
        latitude: -23.1895,
        longitude: -46.8837,
        title: "Poupatempo Jundiaí",
        description:
          "Av. União dos Ferroviários, 1.760\nHorário: Seg a Sex, 9h às 18h; Sáb, 9h às 13h",
      },
      {
        id: 26,
        type: "Poupatempo",
        latitude: -22.2155,
        longitude: -49.9517,
        title: "Poupatempo Marília",
        description:
          "Av. das Indústrias, 430\nHorário: Seg a Sex, 9h às 17h; Sáb, 9h às 13h",
      },
      {
        id: 27,
        type: "Poupatempo",
        latitude: -22.3789,
        longitude: -46.9404,
        title: "Poupatempo Mogi Guaçu",
        description:
          "Rua Princesa Isabel, 102\nHorário: Seg a Sex, 8h às 17h; Sáb, 8h às 12h",
      },
      {
        id: 28,
        type: "Poupatempo",
        latitude: -22.9835,
        longitude: -49.8703,
        title: "Poupatempo Ourinhos",
        description:
          "Rua Paraná, 514\nHorário: Seg a Sex, 8h às 17h; Sáb, 8h às 12h",
      },
      {
        id: 29,
        type: "Poupatempo",
        latitude: -22.7303,
        longitude: -47.6436,
        title: "Poupatempo Piracicaba",
        description:
          "Praça José Bonifácio, 700\nHorário: Seg a Sex, 8h às 17h; Sáb, 9h às 13h",
      },
      {
        id: 30,
        type: "Poupatempo",
        latitude: -22.1224,
        longitude: -51.3934,
        title: "Poupatempo Presidente Prudente",
        description:
          "Av. Brasil, 1383\nHorário: Seg a Sex, 8h às 17h; Sáb, 9h às 13h",
      },
      {
        id: 31,
        type: "Poupatempo",
        latitude: -21.1979,
        longitude: -47.8188,
        title: "Poupatempo Ribeirão Preto",
        description:
          "Av. Presidente Kennedy, 1500\nHorário: Seg a Sex, 9h às 19h; Sáb, 9h às 15h",
      },
      {
        id: 32,
        type: "Poupatempo",
        latitude: -22.4087,
        longitude: -47.5684,
        title: "Poupatempo Rio Claro",
        description:
          "Av. Conde Francisco Matarazzo Júnior, 205\nHorário: Seg a Sex, 9h às 17h; Sáb, 9h às 13h",
      },
      {
        id: 33,
        type: "Poupatempo",
        latitude: -22.0227,
        longitude: -47.8879,
        title: "Poupatempo São Carlos",
        description:
          "Rua Roberto Simonsen, 51\nHorário: Seg a Sex, 9h às 17h; Sáb, 9h às 13h",
      },
      {
        id: 34,
        type: "Poupatempo",
        latitude: -21.9774,
        longitude: -46.8041,
        title: "Poupatempo São João da Boa Vista",
        description:
          "Avenida Brasília, 1.885\nHorário: Seg a Sex, 8h às 17h; Sáb, 8h às 12h",
      },
      {
        id: 35,
        type: "Poupatempo",
        latitude: -20.8173,
        longitude: -49.3807,
        title: "Poupatempo São José do Rio Preto",
        description:
          "Rua Antônio de Godoy, 3.033\nHorário: Seg a Sex, 8h às 17h; Sáb, 8h às 13h",
      },
      {
        id: 36,
        type: "Poupatempo",
        latitude: -23.2104,
        longitude: -45.903,
        title: "Poupatempo São José dos Campos",
        description:
          "Av. São João, 2.200\nHorário: Seg a Sex, 10h às 20h; Sáb, 9h às 15h",
      },
      {
        id: 37,
        type: "Poupatempo",
        latitude: -23.4983,
        longitude: -47.4524,
        title: "Poupatempo Sorocaba",
        description:
          "Rua Leopoldo Machado, 525\nHorário: Seg a Sex, 9h às 18h; Sáb, 9h às 13h",
      },
      {
        id: 38,
        type: "Poupatempo",
        latitude: -23.3592,
        longitude: -47.854,
        title: "Poupatempo Tatuí",
        description:
          "Av. Cel. Firmo Vieira de Camargo, 135\nHorário: Seg a Sex, 9h às 17h; Sáb, 9h às 13h",
      },
      {
        id: 39,
        type: "Poupatempo",
        latitude: -23.0189,
        longitude: -45.5786,
        title: "Poupatempo Taubaté",
        description:
          "Av. Bandeirantes, 808\nHorário: Seg a Sex, 9h às 18h; Sáb, 9h às 13h",
      },
    ],
  
    // ====================================================================================
    // UNIDADES SPTRANS
    // ====================================================================================
    sptrans: [
      
      {
        id: 40,
        type: "SPTrans",
        latitude: -23.5855,
        longitude: -46.6115,
        title: "Estação Alberto Lion (SPTrans)",
        description: "AV. DO ESTADO, 0\nHorário: 06:00 - 22:00",
      },
      {
        id: 41,
        type: "SPTrans",
        latitude: -23.5683,
        longitude: -46.6027,
        title: "Estação Ana Nery (SPTrans)",
        description: "R. DA. ANA NERY, 459\nHorário: 06:00 - 22:00",
      },
      {
        id: 42,
        type: "SPTrans",
        latitude: -23.5866,
        longitude: -46.6053,
        title: "Estação C. A. Ypiranga (SPTrans)",
        description: "R. DO MANIFESTO, 151\nHorário: 06:00 - 22:00",
      },
      {
        id: 43,
        type: "SPTrans",
        latitude: -23.6019,
        longitude: -46.6021,
        title: "Estação do Grito (SPTrans)",
        description: "R. DAS JUNTAS PROVISÓRIAS, 1290\nHorário: 06:00 - 22:00",
      },
      {
        id: 44,
        type: "SPTrans",
        latitude: -23.6117,
        longitude: -46.6018,
        title: "Estação N. S. Aparecida (SPTrans)",
        description:
          "AC. A ESTAÇÃO N. SRA. APARECIDA, 450\nHorário: 06:00 - 22:00",
      },
      {
        id: 45,
        type: "SPTrans",
        latitude: -23.7745,
        longitude: -46.6975,
        title: "Posto Cantinho do Céu (SPTrans)",
        description:
          "R. NSA. SRA. DE FATIMA, 82\nHorário: 06:00 - 21:00 (Seg a Sex)",
      },
      {
        id: 46,
        type: "SPTrans",
        latitude: -23.6558,
        longitude: -46.6433,
        title: "Posto Metrô Jabaquara (SPTrans)",
        description:
          "AV. ENG. ARMANDO DE ARRUDA PEREIRA, 0\nHorário: 07:00 - 17:00 (Seg a Sex)",
      },
      {
        id: 47,
        type: "SPTrans",
        latitude: -23.4982,
        longitude: -46.621,
        title: "Posto Santana (SPTrans)",
        description: "R. OLAVO EGÍDIO, 157\nHorário: 07:00 - 20:00 (Seg a Sex)",
      },
  
      // TERMINAIS
      {
        id: 48,
        type: "SPTrans",
        latitude: -23.5226,
        longitude: -46.452,
        title: "Term. A E Carvalho (SPTrans)",
        description: "ESTR. DO IMPERADOR, 1401\nHorário: 06:00 - 22:00",
      },
      {
        id: 49,
        type: "SPTrans",
        latitude: -23.6094,
        longitude: -46.6892,
        title: "Term. Água Espraiada (SPTrans)",
        description: "AV. JORN. ROBERTO MARINHO, 700\nHorário: 06:00 - 22:00",
      },
      {
        id: 50,
        type: "SPTrans",
        latitude: -23.5385,
        longitude: -46.6385,
        title: "Term. Amaral Gurgel (SPTrans)",
        description: "R. DR. FREDERICO STEIDEL, 107\nHorário: 06:00 - 22:00",
      },
      {
        id: 51,
        type: "SPTrans",
        latitude: -23.522,
        longitude: -46.541,
        title: "Term. Aricanduva (SPTrans)",
        description: "AV. AIRTON PRETINI, 86\nHorário: 06:00 - 22:00",
      },
      {
        id: 52,
        type: "SPTrans",
        latitude: -23.5491,
        longitude: -46.6401,
        title: "Term. Bandeira (SPTrans)",
        description: "PÇA. DA BANDEIRA, 0\nHorário: 06:00 - 22:00",
      },
      {
        id: 53,
        type: "SPTrans",
        latitude: -23.6267,
        longitude: -46.7725,
        title: "Term. Campo Limpo (SPTrans)",
        description: "ESTR. DO CAMPO LIMPO, 3465\nHorário: 06:00 - 22:00",
      },
      {
        id: 54,
        type: "SPTrans",
        latitude: -23.6669,
        longitude: -46.7583,
        title: "Term. Capelinha (SPTrans)",
        description: "ESTR. DE ITAPECERICA, 3222\nHorário: 06:00 - 22:00",
      },
      {
        id: 55,
        type: "SPTrans",
        latitude: -23.5015,
        longitude: -46.6575,
        title: "Term. Casa Verde (SPTrans)",
        description: "R. BAHIA FORMOSA, 80\nHorário: 06:00 - 22:00",
      },
      {
        id: 56,
        type: "SPTrans",
        latitude: -23.6231,
        longitude: -46.4025,
        title: "Term. Cidade Tiradentes (SPTrans)",
        description: "R. SARA KUBITSCHECK, 165\nHorário: 06:00 - 22:00",
      },
      {
        id: 57,
        type: "SPTrans",
        latitude: -23.7548,
        longitude: -46.6912,
        title: "Term. Grajaú (SPTrans)",
        description: "R. GIOVANNI BONONCINI, 77\nHorário: 06:00 - 22:00",
      },
      {
        id: 58,
        type: "SPTrans",
        latitude: -23.6896,
        longitude: -46.7262,
        title: "Term. Guarapiranga (SPTrans)",
        description: "ESTR. DO M BOI MIRIM, 150\nHorário: 06:00 - 22:00",
      },
      {
        id: 59,
        type: "SPTrans",
        latitude: -23.7388,
        longitude: -46.7865,
        title: "Term. Jardim Angela (SPTrans)",
        description: "ESTR. DO M BOI MIRIM, 4901\nHorário: 06:00 - 22:00",
      },
      {
        id: 60,
        type: "SPTrans",
        latitude: -23.6405,
        longitude: -46.7028,
        title: "Term. João Dias (SPTrans)",
        description: "AV. JOÃO DIAS, 3589\nHorário: 06:00 - 22:00",
      },
      {
        id: 61,
        type: "SPTrans",
        latitude: -23.5287,
        longitude: -46.6917,
        title: "Term. Lapa (SPTrans)",
        description: "PÇA. MIGUEL DELL´ERBA, 50\nHorário: 06:00 - 22:00",
      },
      {
        id: 62,
        type: "SPTrans",
        latitude: -23.5412,
        longitude: -46.62,
        title: "Term. Mercado (SPTrans)",
        description: "AV. DO ESTADO, 3350\nHorário: 06:00 - 22:00",
      },
      {
        id: 63,
        type: "SPTrans",
        latitude: -23.8967,
        longitude: -46.7118,
        title: "Term. Parelheiros (SPTrans)",
        description: "ESTR. DA COLÔNIA, 300\nHorário: 06:00 - 22:00",
      },
      {
        id: 64,
        type: "SPTrans",
        latitude: -23.5303,
        longitude: -46.5491,
        title: "Term. Penha (SPTrans)",
        description: "AV. CANGAIBA, 31\nHorário: 06:00 - 22:00",
      },
      {
        id: 65,
        type: "SPTrans",
        latitude: -23.5658,
        longitude: -46.7022,
        title: "Term. Pinheiros (SPTrans)",
        description: "R. GILBERTO SABINO, 130\nHorário: 06:00 - 22:00",
      },
      {
        id: 66,
        type: "SPTrans",
        latitude: -23.4862,
        longitude: -46.7214,
        title: "Term. Pirituba (SPTrans)",
        description: "AV. DR. FELIPE PINEL, 60\nHorário: 06:00 - 22:00",
      },
      {
        id: 67,
        type: "SPTrans",
        latitude: -23.5513,
        longitude: -46.6335,
        title: "Term. Pq. Dom Pedro (SPTrans)",
        description: "PQ. D. PEDRO II, 0\nHorário: 06:00 - 22:00",
      },
      {
        id: 68,
        type: "SPTrans",
        latitude: -23.5401,
        longitude: -46.6433,
        title: "Term. Princesa Isabel (SPTrans)",
        description: "AL. GLETE, 433\nHorário: 06:00 - 22:00",
      },
      {
        id: 69,
        type: "SPTrans",
        latitude: -23.6009,
        longitude: -46.6067,
        title: "Term. Sacomã (SPTrans)",
        description: "R. BOM PASTOR, 3000\nHorário: 06:00 - 22:00",
      },
      {
        id: 70,
        type: "SPTrans",
        latitude: -23.6534,
        longitude: -46.7032,
        title: "Term. Santo Amaro (SPTrans)",
        description: "AV. PE. JOSÉ MARIA, 400\nHorário: 06:00 - 22:00",
      },
      {
        id: 71,
        type: "SPTrans",
        latitude: -23.5042,
        longitude: -46.4678,
        title: "Term. São Miguel (SPTrans)",
        description: "R. TARDE DE MAIO, 0\nHorário: 06:00 - 22:00",
      },
      {
        id: 72,
        type: "SPTrans",
        latitude: -23.6068,
        longitude: -46.495,
        title: "Term. Sapopemba (SPTrans)",
        description: "AV. ARQ. VILANOVA ARTIGAS, 0\nHorário: 06:00 - 22:00",
      },
      {
        id: 73,
        type: "SPTrans",
        latitude: -23.565,
        longitude: -46.5298,
        title: "Term. V. Carrão (SPTrans)",
        description: "AV. DEZENOVE DE JANEIRO, 884\nHorário: 06:00 - 22:00",
      },
      {
        id: 74,
        type: "SPTrans",
        latitude: -23.4735,
        longitude: -46.6698,
        title: "Term. V. Nova Cachoeirinha (SPTrans)",
        description: "AV. INAJAR DE SOUZA, 0\nHorário: 06:00 - 22:00",
      },
      {
        id: 75,
        type: "SPTrans",
        latitude: -23.5855,
        longitude: -46.5891,
        title: "TERM. V. Prudente (SPTrans)",
        description:
          "AV. PROF. LUIZ IGNÁCIO ANHAIA MELLO, 1359\nHorário: 06:00 - 22:00",
      },
      {
        id: 76,
        type: "SPTrans",
        latitude: -23.7745,
        longitude: -46.7289,
        title: "Term. Varginha (SPTrans)",
        description: "AV. PAULO GUILGUER REIMBERG, 247\nHorário: 06:00 - 22:00",
      },
    ],
  });

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Raio da Terra em km
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

  const findNearestLocations = (currentLat, currentLng) => {
    const allMarkers = [...markers.poupatempo, ...markers.sptrans];
    
    const locationsWithDistance = allMarkers.map((marker) => ({
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

  // Função para lidar com o pressionar do marcador
  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setMarkerModalVisible(true);
    
    // Centraliza o mapa no marcador selecionado
    setRegion({
      latitude: marker.latitude,
      longitude: marker.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  // Função para renderizar o modal de detalhes do marcador
  const renderMarkerModal = () => {
    if (!selectedMarker) return null;

    const isPoupatempo = selectedMarker.type === "Poupatempo";
    const distanceFromUser = selectedMarker.distance?.toFixed(2) || "Calculando...";

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={markerModalVisible}
        onRequestClose={() => setMarkerModalVisible(false)}
      >
        <View style={styles.markerModalContainer}>
          <View style={styles.markerModalContent}>
            {/* Header do modal */}
            <View style={styles.markerModalHeader}>
              <View style={[
                styles.markerTypeBadge,
                isPoupatempo ? styles.poupatempoBadge : styles.sptransBadge
              ]}>
                <Text style={styles.markerTypeBadgeText}>
                  {isPoupatempo ? "POUPATEMPO" : "SPTRANS"}
                </Text>
              </View>
              <Pressable
                style={styles.markerCloseButton}
                onPress={() => setMarkerModalVisible(false)}
              >
                <Text style={styles.markerCloseButtonText}>✕</Text>
              </Pressable>
            </View>

            {/* Conteúdo do modal */}
            <ScrollView style={styles.markerModalBody}>
              <Text style={styles.markerModalTitle}>{selectedMarker.title}</Text>
              
              <View style={styles.markerInfoSection}>
                <Text style={styles.markerInfoLabel}>Distância da sua localização:</Text>
                <Text style={styles.markerInfoValue}>{distanceFromUser} km</Text>
              </View>

              <View style={styles.markerInfoSection}>
                <Text style={styles.markerInfoLabel}>Endereço:</Text>
                <Text style={styles.markerInfoValue}>
                  {selectedMarker.description.split('\n')[0]}
                </Text>
              </View>

              <View style={styles.markerInfoSection}>
                <Text style={styles.markerInfoLabel}>Horário de Funcionamento:</Text>
                <Text style={styles.markerInfoValue}>
                  {selectedMarker.description.split('\n')[1] || "Horário não especificado"}
                </Text>
              </View>

              <View style={styles.markerInfoSection}>
                <Text style={styles.markerInfoLabel}>Coordenadas:</Text>
                <Text style={styles.markerInfoValue}>
                  Lat: {selectedMarker.latitude.toFixed(6)}, Long: {selectedMarker.longitude.toFixed(6)}
                </Text>
              </View>

              {/* Informações específicas por tipo */}
              {isPoupatempo ? (
                <View style={styles.markerInfoSection}>
                  <Text style={styles.markerInfoLabel}>Serviços Disponíveis:</Text>
                  <Text style={styles.markerInfoValue}>
                    • Emissão de RG{'\n'}
                    • Carteira de Trabalho{'\n'}
                    • Serviços do Detran{'\n'}
                    • Outros serviços governamentais
                  </Text>
                </View>
              ) : (
                <View style={styles.markerInfoSection}>
                  <Text style={styles.markerInfoLabel}>Serviços Disponíveis:</Text>
                  <Text style={styles.markerInfoValue}>
                    • Recarga de Bilhete Único{'\n'}
                    • Emissão de cartões{'\n'}
                    • Informações sobre linhas{'\n'}
                    • Outros serviços de transporte
                  </Text>
                </View>
              )}
            </ScrollView>

            {/* Footer do modal com botões de ação */}
            <View style={styles.markerModalFooter}>
              <Pressable 
                style={[
                  styles.markerActionButton,
                  styles.directionsButton
                ]}
                onPress={() => {
                  // Aqui você pode implementar a navegação para o local
                  alert(`Navegar para: ${selectedMarker.title}`);
                }}
              >
                <Text style={styles.directionsButtonText}> Como Chegar</Text>
              </Pressable>
              
             
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const getFilteredData = () => {
    switch (filterType) {
      case "poupatempo":
        return nearestLocations.filter(item => item.type === "Poupatempo");
      case "sptrans":
        return nearestLocations.filter(item => item.type === "SPTrans");
      case "all":
      default:
        return nearestLocations;
    }
  };

  const getFilteredMarkers = () => {
    switch (filterType) {
      case "poupatempo":
        return markers.poupatempo;
      case "sptrans":
        return markers.sptrans;
      case "all":
      default:
        return [...markers.poupatempo, ...markers.sptrans];
    }
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

        const nearest = findNearestLocations(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude
        );
        setNearestLocations(nearest);
      } catch (error) {
        setErrorMsg("Erro ao obter localização: " + error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const renderLocationItem = ({ item }) => {
    const isPoupatempo = item.type === "Poupatempo";
    
    return (
      <TouchableOpacity
        style={[
          styles.locationItem,
          isPoupatempo ? styles.poupatempoItem : styles.sptransItem
        ]}
        onPress={() => handleMarkerPress(item)}
      >
        <View style={styles.locationInfo}>
          <Text style={styles.locationTitle}>{item.title}</Text>
          <Text style={styles.locationDescription}>{item.description}</Text>
          <Text style={styles.locationDistance}>
            {item.distance?.toFixed(2)} km de distância
          </Text>
          <View style={[
            styles.typeBadge,
            isPoupatempo ? styles.poupatempoBadge : styles.sptransBadge
          ]}>
            <Text style={styles.typeBadgeText}>
              {isPoupatempo ? "Poupatempo" : "SPTrans"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00e81bff" />
        <Text>Obtendo sua localização...</Text>
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

  const filteredData = getFilteredData();
  const filteredMarkers = getFilteredMarkers();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {address ? (
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{address}</Text>
        </View>
      ) : null}

      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {/* Marcador da localização atual */}
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title="Sua Localização"
          description={address || "Localização atual"}
          pinColor="green"
        />

        {/* Marcadores filtrados */}
        {filteredMarkers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
            onPress={() => handleMarkerPress(marker)}
            pinColor={marker.type === "Poupatempo" ? "blue" : "red"}
          />
        ))}
      </MapView>

      {/* Botão para abrir o modal de locais próximos */}
      <Pressable
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.floatingButtonText}>Locais Próximos</Text>
      </Pressable>

      {/* Modal de locais próximos (existente) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {filterType === "all" && "Todos os Locais Próximos"}
                {filterType === "poupatempo" && "Poupatempo Próximos"}
                {filterType === "sptrans" && "SPTrans Próximos"}
              </Text>
              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>X</Text>
              </Pressable>
            </View>

            {/* Filtros dentro do modal */}
            <View style={styles.modalFilterContainer}>
              <Pressable
                style={[
                  styles.modalFilterButton,
                  filterType === "all" && styles.modalFilterButtonActive
                ]}
                onPress={() => setFilterType("all")}
              >
                <Text style={[
                  styles.modalFilterButtonText,
                  filterType === "all" && styles.modalFilterButtonTextActive
                ]}>
                  Todos
                </Text>
              </Pressable>
              
              <Pressable
                style={[
                  styles.modalFilterButton,
                  filterType === "poupatempo" && styles.modalFilterButtonActive
                ]}
                onPress={() => setFilterType("poupatempo")}
              >
                <Text style={[
                  styles.modalFilterButtonText,
                  filterType === "poupatempo" && styles.modalFilterButtonTextActive
                ]}>
                  Poupatempo
                </Text>
              </Pressable>
              
              <Pressable
                style={[
                  styles.modalFilterButton,
                  filterType === "sptrans" && styles.modalFilterButtonActive
                ]}
                onPress={() => setFilterType("sptrans")}
              >
                <Text style={[
                  styles.modalFilterButtonText,
                  filterType === "sptrans" && styles.modalFilterButtonTextActive
                ]}>
                  SPTrans
                </Text>
              </Pressable>
            </View>

            <FlatList
              data={filteredData}
              renderItem={renderLocationItem}
              keyExtractor={(item) => item.id.toString()}
              style={styles.locationsList}
              showsVerticalScrollIndicator={false}
            />

            <Text style={styles.modalFooter}>
              {filteredData.length} {filteredData.length === 1 ? 'local encontrado' : 'locais encontrados'}
            </Text>
          </View>
        </View>
      </Modal>

      {/* Modal de detalhes do marcador (NOVO) */}
      {renderMarkerModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  addressContainer: {
    position: "absolute",
    top: 40,
    left: 10,
    right: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1,
  },
  addressText: {
    fontSize: 14,
    textAlign: "center",
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  floatingButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Estilos para o NOVO modal do marcador
  markerModalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  markerModalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
    minHeight: "50%",
  },
  markerModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
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
  markerTypeBadgeText: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
  markerCloseButton: {
    padding: 5,
  },
  markerCloseButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
  },
  markerModalBody: {
    padding: 20,
  },
  markerModalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  markerInfoSection: {
    marginBottom: 20,
  },
  markerInfoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 5,
  },
  markerInfoValue: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  markerModalFooter: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
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
    backgroundColor: "#007AFF",
  },
  shareButton: {
    backgroundColor: "#34C759",
  },
  directionsButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  shareButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Mantenha todos os outros estilos existentes...
  filterContainer: {
    position: "absolute",
    top: 80,
    left: 10,
    right: 10,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 25,
    padding: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 20,
    alignItems: "center",
  },
  filterButtonActive: {
    backgroundColor: "#007AFF",
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
  },
  filterButtonTextActive: {
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "70%",
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
    color: "#333",
  },
  modalFilterContainer: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 5,
  },
  modalFilterButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  modalFilterButtonActive: {
    backgroundColor: "white",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  modalFilterButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
  },
  modalFilterButtonTextActive: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
  },
  locationsList: {
    flex: 1,
  },
  locationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 8,
  },
  poupatempoItem: {
    backgroundColor: "#e6f2ff",
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  sptransItem: {
    backgroundColor: "#ffe6e6",
    borderLeftWidth: 4,
    borderLeftColor: "#FF3B30",
  },
  locationInfo: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  locationDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  locationDistance: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "500",
    marginBottom: 4,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeBadgeText: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
  },
  modalFooter: {
    marginTop: 15,
    textAlign: "center",
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
});