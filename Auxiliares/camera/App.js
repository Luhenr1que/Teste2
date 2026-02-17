import { Camera, CameraView, CameraType, useCameraPermissions, CameraPictureOptions } from 'expo-camera';
import { useState, useRef } from 'react';
import * as ImagePicker from "expo-image-picker";
import { Button, StyleSheet, Text, TouchableNativeFeedbackComponent, TouchableOpacity, View, Image, Modal, Pressable } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';

export default function App() {

  const [permission, requestPermission] = useCameraPermissions();
  const [imagem, setImagem] = useState(null);
  const cameraRef = useRef(null);
  const [visivel, setVisivel] = useState(false);
  const [grau, setGrau] = useState(90);
  const [documet, setDocument] = useState('');
  const [flash2, setFlash2] = useState('of')
  // Lista de documentos e suas palavras-chave
  const documentos = {
    // Brasil (para referência e cruzamento)
    "Identidade Brasil": [
      "CARTEIRA DE IDENTIDADE",
      "CÉDULA DE IDENTIDADE",
      "REPÚBLICA FEDERATIVA DO BRASIL",
      "SECRETARIA DA SEGURANÇA PÚBLICA"
    ],
    "Passaporte Brasil": [
      "PASSAPORTE",
      "REPÚBLICA FEDERATIVA DO BRASIL"
    ],
    "CNH Brasil": [
      "CARTEIRA NACIONAL DE HABILITAÇÃO",
      "CNH",
      "DEPARTAMENTO NACIONAL DE TRÂNSITO"
    ],

    // Venezuela
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
      "护照" // hùzhào (passaporte)
    ],

    // Bangladesh
    "Passaporte Bangladesh": [
      "PEOPLE'S REPUBLIC OF BANGLADESH",
      "পাসপোর্ট" // "passport" em bengali
    ],

    // Síria
    "Passaporte Síria": [
      "الجمهورية العربية السورية", // República Árabe da Síria
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


  // Função que identifica
  function identificarDocumento(textoExtraido) {
    const texto = textoExtraido.toUpperCase();

    for (let doc in documentos) {
      for (let palavra of documentos[doc]) {
        if (texto.includes(palavra.toUpperCase())) {
          return doc; // retorna o nome do documento
        }
      }
    }
    return "Documento não identificado";
  }





  if (!permission) {
    //quando não foi pedido a acesso a camera
    return <View />;
  }

  if (!permission.granted) {



    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const tirarfotoA = async () => {
    //metodo de tirar foto da biblioteca do lulu
    const r = await ImagePicker.launchCameraAsync({
      mediaTypes:
        ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,

    });
    setImagem(r.assets[0].uri);
  }
const abrirGaleria = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    // 🔥 Garante URI válida para enviar no FormData
    const imagemInicial = await ImageManipulator.manipulateAsync(
      result.assets[0].uri,
      [],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );

    let grauAtual = 0;
    let imagemMelhorada = null;
    let textoExtraido = "";

    while (grauAtual < 360) {
      imagemMelhorada = await ImageManipulator.manipulateAsync(
        imagemInicial.uri, // <- agora com uri válida
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
      formData.append("apikey", "SuaChaveOCR"); // Substitua pela sua chave de API do OCR.space
      formData.append("language", "por");
      formData.append("isOverlayRequired", "false");
      formData.append("file", {
        uri: imagemMelhorada.uri,
        type: "image/jpeg",
        name: "imagem.jpg",
      });

      try {
        const response = await fetch("https://api.ocr.space/parse/image", {
          method: "POST",
          body: formData,
        });

        const json = await response.json();

        if (!json.IsErroredOnProcessing) {
          textoExtraido = json.ParsedResults?.[0]?.ParsedText || "";
          console.log("Texto extraído:", textoExtraido);
        } else {
          console.error("Erro da API:", json.ErrorMessage || json.ErrorDetails || "Erro desconhecido");
        }

        if (identificarDocumento(textoExtraido) !== "Documento não identificado") {
          console.log("DOC:", identificarDocumento(textoExtraido));
          break;
        }
      } catch (err) {
        console.error("Erro OCR:", err);
        break;
      }

      grauAtual += 90;
    }

    setImagem(imagemMelhorada?.uri || imagemInicial.uri);
    setDocument(textoExtraido);
    setVisivel(true);
  } else {
    console.log("Seleção cancelada");
  }
};

  const tirarfotoB = async () => {
    if (cameraRef.current) {
      try {
        const photoData = await cameraRef.current.takePictureAsync({
          skipProcessing: false,
          quality: 1,
        });

        let grauAtual = 0;
        let textoExtraido = '';
        let imagemMelhorada = null;

        while (grauAtual < 360) {
          imagemMelhorada = await ImageManipulator.manipulateAsync(
            photoData.uri,
            [
              { resize: { width: 1100 } },
              { rotate: grauAtual }
            ],
            {
              compress: 1,
              format: ImageManipulator.SaveFormat.JPEG,
              base64: false,
            }
          );

          const formData = new FormData();
          formData.append('apikey', 'SuaChaveOCR'); // Substitua pela sua chave de API do OCR.space
          formData.append('language', 'por');
          formData.append('isOverlayRequired', 'false');
          formData.append('file', {
            uri: imagemMelhorada.uri,
            type: 'image/jpeg',
            name: 'imagem.jpg',
          });

          const response = await fetch('https://api.ocr.space/parse/image', {
            method: 'POST',
            body: formData,
          });

          const json = await response.json();

          if (!json.IsErroredOnProcessing) {
            textoExtraido = json.ParsedResults?.[0]?.ParsedText || '';
            console.log('Texto extraído:', textoExtraido);
          } else {
            console.error('Erro da API:', json.ErrorMessage || json.ErrorDetails || 'Erro desconhecido');
          }

          grauAtual += 90;
          if (identificarDocumento(textoExtraido) != "Documento não identificado") {
            console.log(identificarDocumento(textoExtraido))
            break;
          } else {
            console.log("Documento não identificado")
          }


        }

        setImagem(imagemMelhorada?.uri || photoData.uri);
        setDocument(textoExtraido);
        setGrau(grauAtual);
        setVisivel(true);

        console.log('Imagem capturada:', imagemMelhorada?.uri || photoData.uri);

      } catch (error) {
        console.error('Erro ao tirar ou processar foto:', error);
      }
    }
  };


  return (
    <View style={styles.container}>
      <CameraView zoom={0.0}
        ref={cameraRef}
        style={styles.camera}
        focusable={true}
        flash={flash2}

      >
        <TouchableOpacity onPress={tirarfotoB}>
          <Text style={{ borderWidth: 1, fontSize: 20 }}>Tirar Foto</Text>

        </TouchableOpacity>
        <Pressable
          style={{ borderWidth: 1, marginTop: 100 }}
          onPress={() => setFlash2(flash2 === "on" ? "off" : "on")}
        >
          <Text>Flash: {flash2}</Text>
        </Pressable>
        <Pressable onPress={() => abrirGaleria()}><Text>Galeria</Text></Pressable>

      </CameraView>



      <Modal visible={visivel}>
        <TouchableOpacity style={styles.container} onPress={() => setVisivel(false)}>
          {imagem && (
            <Image source={{ uri: imagem }} style={{ borderWidth: 1, flex: 0.9, width: '90%' }} />
          )}
        </TouchableOpacity>
      </Modal>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 0.8,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column'

  },
  buttonContainer: {
    flex: 0.8,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',

  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});