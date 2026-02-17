import { Camera, CameraView, CameraType, useCameraPermissions, CameraPictureOptions } from 'expo-camera';
import { useState, useRef } from 'react';
import * as ImagePicker from "expo-image-picker";
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, Modal, Pressable, ActivityIndicator, Alert } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import getStyles from './style';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function CameraScreen({ isDarkMode, navigation }) {
  const styles = getStyles(isDarkMode);
  const [permission, requestPermission] = useCameraPermissions();
  const [imagem, setImagem] = useState(null);
  const cameraRef = useRef(null);
  const [visivel, setVisivel] = useState(false);
  const [grau, setGrau] = useState(90);
  const [documento, setDocument] = useState('');
  const [flash2, setFlash2] = useState('off');
  const [loading, setLoading] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [fotoTemporaria, setFotoTemporaria] = useState(null);

  const palavrasChaveDocumentos = {
    "Identidade Brasil": [
      "CARTEIRA DE IDENTIDADE",
      "CÉDULA DE IDENTIDADE",
      "REPÚBLICA FEDERATIVA DO BRASIL",
      "SECRETARIA DA SEGURANÇA PÚBLICA",
      "REGISTRO GERAL",
      "RG"
    ],
    "Passaporte Brasil": [
      "PASSAPORTE",
      "REPÚBLICA FEDERATIVA DO BRASIL"
    ],
    "CNH Brasil": [
      "CARTEIRA NACIONAL DE HABILITAÇÃO",
      "CNH",
      "DEPARTAMENTO NACIONAL DE TRÂNSITO",
      "HABILITAÇÃO"
    ],
    "CPF": [
      "CADASTRO DE PESSOAS FÍSICAS",
      "CPF",
      "RECEITA FEDERAL"
    ],

    "Cédula Venezuela": [
      "REPÚBLICA BOLIVARIANA DE VENEZUELA",
      "CÉDULA DE IDENTIDAD"
    ],
    "Passaporte Venezuela": [
      "REPÚBLICA BOLIVARIANA DE VENEZUELA",
      "PASAPORTE"
    ],

    // Haiti
    "Passaporte Haiti": [
      "REPUBLIQUE D'HAITI",
      "PASPOR"
    ],
    "Carteira Identidade Haiti": [
      "CARTE D'IDENTITÉ NATIONALE",
      "CIN"
    ],

    // Bolívia
    "Cédula Bolívia": [
      "ESTADO PLURINACIONAL DE BOLIVIA",
      "CÉDULA DE IDENTIDAD"
    ],
    "Passaporte Bolívia": [
      "ESTADO PLURINACIONAL DE BOLIVIA",
      "PASAPORTE"
    ],

    // Colômbia
    "Cédula Colômbia": [
      "REPUBLICA DE COLOMBIA",
      "CÉDULA DE CIUDADANÍA"
    ],
    "Passaporte Colômbia": [
      "REPUBLICA DE COLOMBIA",
      "PASAPORTE"
    ],

    // Peru
    "Cédula Peru": [
      "REPUBLICA DEL PERU",
      "DOCUMENTO NACIONAL DE IDENTIDAD",
      "DNI"
    ],
    "Passaporte Peru": [
      "REPUBLICA DEL PERU",
      "PASAPORTE"
    ],

    // Paraguai
    "Cédula Paraguai": [
      "REPUBLICA DEL PARAGUAY",
      "CÉDULA DE IDENTIDAD"
    ],
    "Passaporte Paraguai": [
      "REPUBLICA DEL PARAGUAY",
      "PASAPORTE"
    ],

    // Argentina
    "DNI Argentina": [
      "REPUBLICA ARGENTINA",
      "DOCUMENTO NACIONAL DE IDENTIDAD",
      "DNI"
    ],
    "Passaporte Argentina": [
      "REPUBLICA ARGENTINA",
      "PASAPORTE"
    ],

    // Uruguai
    "Cédula Uruguai": [
      "REPUBLICA ORIENTAL DEL URUGUAY",
      "CÉDULA DE IDENTIDAD"
    ],
    "Passaporte Uruguai": [
      "REPUBLICA ORIENTAL DEL URUGUAY",
      "PASAPORTE"
    ],

    // China
    "Passaporte China": [
      "中华人民共和国",
      "PEOPLE'S REPUBLIC OF CHINA",
      "护照"
    ],

    // Bangladesh
    "Passaporte Bangladesh": [
      "PEOPLE'S REPUBLIC OF BANGLADESH",
      "পাসপোর্ট"
    ],

    // Síria
    "Passaporte Síria": [
      "الجمهورية العربية السورية",
      "SYRIAN ARAB REPUBLIC",
      "PASSPORT"
    ],

    // Congo
    "Passaporte Congo": [
      "REPUBLIQUE DEMOCRATIQUE DU CONGO",
      "PASSPORT"
    ],

    // Angola
    "Passaporte Angola": [
      "REPÚBLICA DE ANGOLA",
      "PASSAPORTE"
    ],

    // Moçambique
    "Passaporte Moçambique": [
      "REPÚBLICA DE MOÇAMBIQUE",
      "PASSAPORTE"
    ],

    // Portugal
    "Cartão Cidadão Portugal": [
      "CARTÃO DE CIDADÃO",
      "REPÚBLICA PORTUGUESA"
    ],
    "Passaporte Portugal": [
      "REPÚBLICA PORTUGUESA",
      "PASSAPORTE"
    ]
  };

  // 2. MAPEAMENTO CORRIGIDO - AGORA PASSA AMBOS OS PARÂMETROS
  const mapeamentoNavegacao = {
    // Documentos brasileiros
    "Identidade Brasil": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao', // CATEGORIA
        tipoDocumento: 'RG',   // DOCUMENTO ESPECÍFICO
        abrirModalAutomaticamente: true
      }
    },
    "Passaporte Brasil": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'Passaporte',
        abrirModalAutomaticamente: true
      }
    },
    "CNH Brasil": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'veiculos',
        tipoDocumento: 'CNH',
        abrirModalAutomaticamente: true
      }
    },
    "CPF": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'CPF',
        abrirModalAutomaticamente: true
      }
    },

    // Documentos de identificação internacional -> RG brasileiro
    "Cédula Venezuela": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'RG',
        abrirModalAutomaticamente: true
      }
    },
    "Carteira Identidade Haiti": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'RG',
        abrirModalAutomaticamente: true
      }
    },
    "Cédula Bolívia": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'RG',
        abrirModalAutomaticamente: true
      }
    },
    "Cédula Colômbia": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'RG',
        abrirModalAutomaticamente: true
      }
    },
    "Cédula Peru": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'RG',
        abrirModalAutomaticamente: true
      }
    },
    "Cédula Paraguai": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'RG',
        abrirModalAutomaticamente: true
      }
    },
    "DNI Argentina": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'RG',
        abrirModalAutomaticamente: true
      }
    },
    "Cédula Uruguai": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'RG',
        abrirModalAutomaticamente: true
      }
    },
    "Cartão Cidadão Portugal": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'RG',
        abrirModalAutomaticamente: true
      }
    },

    // Passaportes internacionais -> Passaporte brasileiro
    "Passaporte Venezuela": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'Passaporte',
        abrirModalAutomaticamente: true
      }
    },
    "Passaporte Haiti": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'Passaporte',
        abrirModalAutomaticamente: true
      }
    },
    "Passaporte Bolívia": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'Passaporte',
        abrirModalAutomaticamente: true
      }
    },
    "Passaporte Colômbia": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'Passaporte',
        abrirModalAutomaticamente: true
      }
    },
    "Passaporte Peru": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'Passaporte',
        abrirModalAutomaticamente: true
      }
    },
    "Passaporte Paraguai": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'Passaporte',
        abrirModalAutomaticamente: true
      }
    },
    "Passaporte Argentina": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'Passaporte',
        abrirModalAutomaticamente: true
      }
    },
    "Passaporte Uruguai": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'Passaporte',
        abrirModalAutomaticamente: true
      }
    },
    "Passaporte China": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'Passaporte',
        abrirModalAutomaticamente: true
      }
    },
    "Passaporte Bangladesh": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'Passaporte',
        abrirModalAutomaticamente: true
      }
    },
    "Passaporte Síria": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'Passaporte',
        abrirModalAutomaticamente: true
      }
    },
    "Passaporte Congo": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'Passaporte',
        abrirModalAutomaticamente: true
      }
    },
    "Passaporte Angola": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'Passaporte',
        abrirModalAutomaticamente: true
      }
    },
    "Passaporte Moçambique": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'Passaporte',
        abrirModalAutomaticamente: true
      }
    },
    "Passaporte Portugal": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'Passaporte',
        abrirModalAutomaticamente: true
      }
    },

    // Documentos adicionais baseados na sua estrutura de dados
    "Título Eleitor": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'TituloEleitor',
        abrirModalAutomaticamente: true
      }
    },
    "CRNM": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'CRNM',
        abrirModalAutomaticamente: true
      }
    },
    "Bilhete Único": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'transporteP',
        tipoDocumento: 'BilheteUnico',
        abrirModalAutomaticamente: true
      }
    },
    "Cartão SUS": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'saude',
        tipoDocumento: 'SUSCard',
        abrirModalAutomaticamente: true
      }
    },
    "Carteira Plano Saúde": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'saude',
        tipoDocumento: 'carteiraPlanoSaude',
        abrirModalAutomaticamente: true
      }
    },
    "Documento Mercosul": {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'Mercosul',
        abrirModalAutomaticamente: true
      }
    },

    // Documento não identificado
    "Documento não identificado": {
      tela: 'PDocumentos',
      parametros: {}
    }
  };

  // Função para identificar documento pelo texto
  function identificarDocumento(textoExtraido) {
    const texto = textoExtraido.toUpperCase();
    console.log("🔍 TEXTO COMPLETO PARA ANÁLISE:", texto);
    console.log("📝 PRIMEIROS 500 CARACTERES:", texto.substring(0, 500));

    let documentosEncontrados = [];

    for (let doc in palavrasChaveDocumentos) {
      for (let palavra of palavrasChaveDocumentos[doc]) {
        if (texto.includes(palavra.toUpperCase())) {
          console.log("✅ DOCUMENTO IDENTIFICADO:", doc, "| PALAVRA-CHAVE:", palavra);
          documentosEncontrados.push({ documento: doc, palavra: palavra });
        }
      }
    }

    if (documentosEncontrados.length > 0) {
      // Retorna o primeiro documento encontrado (ou você pode priorizar algum)
      console.log("📋 TODOS OS DOCUMENTOS ENCONTRADOS:", documentosEncontrados);
      return documentosEncontrados[0].documento;
    }

    console.log("❌ NENHUM DOCUMENTO IDENTIFICADO - Palavras-chave não encontradas");
    console.log("📋 PALAVRAS-CHAVE PROCURADAS:", Object.keys(palavrasChaveDocumentos));
    return "Documento não identificado";
  }

  // Função para obter destino da navegação
  const obterDestinoNavegacao = (documentoIdentificado) => {
    console.log("🗺️ OBTENDO DESTINO PARA:", documentoIdentificado);

    const destino = mapeamentoNavegacao[documentoIdentificado];
    if (destino) {
      console.log("📍 DESTINO ENCONTRADO:", destino);
      return destino;
    }

    // Fallback padrão
    console.log("⚠️ DESTINO NÃO ENCONTRADO, USANDO FALLBACK");
    return {
      tela: 'PDocumentos',
      parametros: {
        tipo: 'identificacao',
        tipoDocumento: 'RG',
        abrirModalAutomaticamente: true
      }
    };
  };

  const processarImagemComOCR = async (uri, tipo = 'camera') => {
    console.log("🚀 INICIANDO PROCESSAMENTO DA IMAGEM");
    setLoading(true);
    setProgresso(0);
    setFotoTemporaria(uri);

    let grauAtual = 0;
    let imagemMelhorada = null;
    let textoExtraido = "";
    let documentoIdentificado = "Documento não identificado";

    try {
      while (grauAtual < 360) {
        console.log(`🔄 PROCESSANDO ROTAÇÃO ${grauAtual}°`);
        setProgresso(Math.round((grauAtual / 360) * 100));

        imagemMelhorada = await ImageManipulator.manipulateAsync(
          uri,
          [
            { resize: { width: 1100 } },
            { rotate: grauAtual }
          ],
          {
            compress: 1,
            format: ImageManipulator.SaveFormat.JPEG,
          }
        );

        const formData = new FormData();
        formData.append("apikey", "K83806429288957");
        formData.append("language", "por");
        formData.append("isOverlayRequired", "false");
        formData.append("file", {
          uri: imagemMelhorada.uri,
          type: "image/jpeg",
          name: "imagem.jpg",
        });

        const response = await fetch("https://api.ocr.space/parse/image", {
          method: "POST",
          body: formData,
        });

        const json = await response.json();

        if (!json.IsErroredOnProcessing) {
          textoExtraido = json.ParsedResults?.[0]?.ParsedText || "";
          console.log(`📖 TEXTO EXTRAÍDO:`, textoExtraido.substring(0, 100) + '...');
        }

        documentoIdentificado = identificarDocumento(textoExtraido);
        if (documentoIdentificado !== "Documento não identificado") {
          console.log("🎯 DOCUMENTO IDENTIFICADO:", documentoIdentificado);
          break;
        }

        grauAtual += 90;
      }

      // Obter destino da navegação
      const destino = obterDestinoNavegacao(documentoIdentificado);
      
      console.log("🧭 NAVEGANDO PARA:", destino.tela, "com parâmetros:", destino.parametros);
      
      // Navegar para a tela de destino
      navigation.navigate(destino.tela, destino.parametros);

    } catch (error) {
      console.error('💥 ERRO NO PROCESSAMENTO:', error);
      Alert.alert("Erro", "Não foi possível processar a imagem");
    } finally {
      setLoading(false);
      setProgresso(0);
      setFotoTemporaria(null);
    }
  };

  // Resto do código permanece igual...
  const abrirGaleria = async () => {
    console.log("🖼️ ABRINDO GALERIA...");
    if (loading) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("📋 RESULTADO DA GALERIA:", result);
    if (!result.canceled) {
      await processarImagemComOCR(result.assets[0].uri, 'galeria');
    }
  };

  const tirarFoto = async () => {
    console.log("📸 TIRANDO FOTO...");
    if (loading || !cameraRef.current) return;

    try {
      const photoData = await cameraRef.current.takePictureAsync({
        skipProcessing: false,
        quality: 1,
      });

      console.log("✅ FOTO TIRADA:", photoData);
      await processarImagemComOCR(photoData.uri, 'camera');
    } catch (error) {
      console.error('❌ ERRO AO TIRAR FOTO:', error);
      Alert.alert("Erro", "Não foi possível capturar a foto");
    }
  };

  const toggleFlash = () => {
    console.log("⚡ ALTERNANDO FLASH:", flash2);
    setFlash2(flash2 === "on" ? "off" : "on");
  };

  const cancelarProcessamento = () => {
    console.log("🚫 CANCELANDO PROCESSAMENTO");
    setLoading(false);
    setProgresso(0);
    setFotoTemporaria(null);
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Precisamos da sua permissão para acessar a câmera</Text>
        <Button onPress={requestPermission} title="Conceder Permissão" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Overlay de Loading com Preview da Foto */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContainer}>
            {/* Preview da foto tirada */}
            {fotoTemporaria && (
              <View style={styles.previewContainer}>
                <Text style={styles.previewTitle}>Foto Capturada</Text>
                <Image
                  source={{ uri: fotoTemporaria }}
                  style={styles.previewImage}
                  resizeMode="contain"
                />
              </View>
            )}

            <ActivityIndicator size="large" color="#FFFFFF" />
            <Text style={styles.loadingText}>Processando imagem...</Text>
            <Text style={styles.progressText}>{progresso}%</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progresso}%` }]} />
            </View>
            <Text style={styles.loadingSubtext}>
              Analisando em diferentes rotações...
            </Text>

            {/* Botão de cancelar */}
            <Pressable
              style={styles.cancelButton}
              onPress={cancelarProcessamento}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      )}

      <CameraView
        zoom={0.0}
        ref={cameraRef}
        style={styles.camera}
        focusable={true}
        flash={flash2}
      >
        {/* Overlay da Câmera */}
        <View style={styles.cameraOverlay}>

          {/* Header com Controles */}
          <View style={styles.header}>

            <Pressable
              style={styles.iconButton}
              onPress={() => { navigation.goBack(); }}
              disabled={loading}
            >
              <Ionicons name="arrow-back" size={28} color="#fff" />
            </Pressable>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Scanner de Documentos</Text>
            </View>
            <Pressable
              style={styles.iconButton}
              onPress={abrirGaleria}
              disabled={loading}
            >
              <FontAwesome name="image" size={24} color="white" />
            </Pressable>
          </View>

          {/* Área de Preview com Guias */}
          <View style={styles.previewArea}>
            <View style={styles.guideFrame}>
              <View style={styles.cornerTopLeft} />
              <View style={styles.cornerTopRight} />
              <View style={styles.cornerBottomLeft} />
              <View style={styles.cornerBottomRight} />
            </View>
            <Text style={styles.guideText}>
              Posicione o documento dentro do quadro
            </Text>
          </View>

          {/* Footer com Botão Principal */}
          <View style={styles.footer}>
            <Pressable
              style={styles.iconButton2}
              onPress={toggleFlash}
              disabled={loading}
            >
              {flash2 === "on" ? (
                <Ionicons name="flash" size={24} color="white" />
              ) : (
                <Ionicons name="flash-off" size={24} color="white" />
              )}
            </Pressable>
            <Pressable
              style={[styles.captureButton, loading && styles.captureButtonDisabled]}
              onPress={tirarFoto}
              disabled={loading}
            >
              <View style={styles.captureButtonInner}>
                {loading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <FontAwesome name="camera" size={24} color="white" />
                )}
              </View>
            </Pressable>
          </View>
        </View>
      </CameraView>
    </View>
  );
}