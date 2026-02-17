import React, { useState, useEffect } from "react";
import { View, ScrollView, Image, Text, Dimensions, Pressable, Modal, TouchableOpacity, Linking, TextInput, ActivityIndicator, RefreshControl } from "react-native";
import getStyles from "./style";
import { useTheme } from "../../../../themeContext";
import { useIdioma } from "../../../../idiomaContext";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import AudioRecorder from "../../../../gravador";
import { Colors } from "../../../../themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApi } from "../../../../CRUD";
import BubbleArea from "../Bolha/areaBolha";
import { API_URL_WEB } from "../../../../CRUD";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const MAX_HEIGHT = screenHeight * 0.7;

// Função para normalizar a URL da imagem
const normalizeImageUrl = (imagePath) => {
  if (!imagePath || imagePath.trim() === '') {
    return "";
  }
  
  // Remove espaços em branco
  imagePath = imagePath.trim();
  
  console.log("🖼️ Normalizando imagem:", imagePath);
  
  // Se já for uma URL completa (http:// ou https://)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    console.log("✅ Já é URL completa");
    return imagePath;
  }
  
  // Se for um caminho relativo com barra inicial
  if (imagePath.startsWith('/')) {
    console.log("📁 Caminho relativo com barra");
    return `${API_URL_WEB}${imagePath}`;
  }
  
  // Se já tiver a base URL mas sem o protocolo (caso incomum)
  if (imagePath.includes(API_URL_WEB)) {
    console.log("🔗 Tem base URL mas sem protocolo");
    return `http://${imagePath}`;
  }
  
  // Se começar com "storage/" (caminho relativo comum do Laravel)
  if (imagePath.startsWith('storage/')) {
    console.log("📦 Caminho storage/");
    return `http://${API_URL_WEB}/${imagePath}`;
  }
  
  // Para caminhos que já são relativos mas sem "storage/"
  if (imagePath.includes('/')) {
    console.log("🗂️ Caminho com subpastas");
    return `http://${API_URL_WEB}/${imagePath}`;
  }
  
  // Padrão: assume que é apenas um nome de arquivo
  console.log("📄 Apenas nome de arquivo");
  return `http://${API_URL_WEB}/storage/noticias/${imagePath}`;
};

export default function Feed() {
  const { isDarkMode, temaCor } = useTheme();
  const styles = getStyles(isDarkMode);
  const { textos } = useIdioma();
  const texto = textos?.feed || [];
  const { carregarNoticias } = useApi();

  const [mAudio, setMAudio] = useState(false);
  const [compacto, setCompacto] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredImages, setFilteredImages] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLayoutPicker, setShowLayoutPicker] = useState(false);
  const [currentIdiomaIndex, setCurrentIdiomaIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      console.log("🔄 Pull to refresh acionado");
      await carregarNoticiasComIdioma();
    } catch (error) {
      console.error('❌ Erro no refresh:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const carregarNoticiasComIdioma = async () => {
    try {
      setLoading(true);
      console.log("🔄 Iniciando carregamento de notícias...");

      const noticias = await carregarNoticias();
      console.log("📰 Notícias recebidas da API:", noticias);

      // Verificação mais robusta do array
      if (!noticias || !Array.isArray(noticias) || noticias.length === 0) {
        console.log("❌ Nenhuma notícia encontrada ou array inválido");
        setImages([]);
        setFilteredImages([]);
        setLoading(false);
        return;
      }

      const idioma = await AsyncStorage.getItem("idioma");
      console.log("🌐 Idioma atual:", idioma);

      let i = 0;
      if (idioma === "Inglês") i = 1;
      else if (idioma === "Espanhol") i = 2;

      setCurrentIdiomaIndex(i);
      console.log("📊 Índice do idioma:", i);

      // Processar cada notícia com tratamento de erro individual
      const processedNews = noticias.map((noticia, index) => {
        try {
          console.log(`📝 Processando notícia ${index}:`, noticia);

          // Verificar se os campos existem
          if (!noticia.tituloNoticia || !noticia.conteudoNoticia || !noticia.linkNoticia) {
            console.warn(`⚠️ Notícia ${index} com campos faltando:`, noticia);
            return null;
          }

          const titulos = JSON.parse(noticia.tituloNoticia || "[]");
          const conteudos = JSON.parse(noticia.conteudoNoticia || "[]");
          const links = JSON.parse(noticia.linkNoticia || "[]");

          // Verificar se os arrays têm conteúdo
          if (!Array.isArray(titulos) || !Array.isArray(conteudos) || !Array.isArray(links)) {
            console.warn(`⚠️ Notícia ${index} com arrays inválidos:`, { titulos, conteudos, links });
            return null;
          }

          // Usar o primeiro idioma disponível se o índice desejado não existir
          const titulo = titulos[i] || titulos[0] || "Título não disponível";
          const conteudo = conteudos[i] || conteudos[0] || "Conteúdo não disponível";
          const link = links[i] || links[0] || "";

          // Normalizar a URL da imagem
          const imagemNormalizada = normalizeImageUrl(noticia.imgNoticia || "");
          console.log(`🖼️ Imagem ${index}: Original: "${noticia.imgNoticia}", Normalizada: "${imagemNormalizada}"`);

          return {
            id: noticia.idNoticia || index,
            nome: titulo,
            noticia: conteudo,
            link: link,
            imagem: imagemNormalizada,
            titulosMulti: titulos,
            conteudosMulti: conteudos,
            linksMulti: links,
            imagemOriginal: noticia.imgNoticia || "" // Manter original para debug
          };
        } catch (error) {
          console.error(`❌ Erro ao processar notícia ${index}:`, error, noticia);
          return null;
        }
      }).filter(noticia => noticia !== null);

      console.log("✅ Notícias processadas:", processedNews);

      // Se não há notícias válidas
      if (processedNews.length === 0) {
        console.log("❌ Nenhuma notícia válida após processamento");
        setImages([]);
        setFilteredImages([]);
        setLoading(false);
        return;
      }

      // Carregar tamanhos das imagens apenas para notícias com imagem válida
      const imagePromises = processedNews.map((newsItem, index) =>
        new Promise((resolve) => {
          if (!newsItem.imagem) {
            console.warn(`⚠️ Notícia ${index} sem imagem:`, newsItem);
            resolve({
              uri: "",
              aspectRatio: 16 / 9,
              imgHeight: (screenWidth * 9) / 16,
              newsItem,
              hasError: true
            });
            return;
          }

          console.log(`📐 Obtendo tamanho da imagem ${index}: ${newsItem.imagem}`);
          
          Image.getSize(
            newsItem.imagem,
            (width, height) => {
              console.log(`✅ Tamanho obtido: ${width}x${height} para ${newsItem.nome}`);
              const imgHeight = (screenWidth * height) / width;
              resolve({
                uri: newsItem.imagem,
                aspectRatio: width / height,
                imgHeight,
                newsItem,
                hasError: false
              });
            },
            (error) => {
              console.warn(`⚠️ Erro ao carregar imagem ${index} (${newsItem.imagem}):`, error);
              resolve({
                uri: newsItem.imagem,
                aspectRatio: 16 / 9,
                imgHeight: (screenWidth * 9) / 16,
                newsItem,
                hasError: true
              });
            }
          );
        })
      );

      const imageData = await Promise.all(imagePromises);
      console.log("🖼️ Dados de imagem processados:", imageData.length);

      // Filtrar apenas imagens válidas (com URI e sem erro)
      const validImages = imageData.filter(img => {
        const isValid = !img.hasError && img.uri && img.uri.trim() !== "";
        if (!isValid) {
          console.warn("❌ Imagem inválida descartada:", img.newsItem?.nome);
        }
        return isValid;
      });
      
      console.log("✅ Imagens válidas:", validImages.length);

      setImages(validImages);
      setFilteredImages(validImages);

    } catch (error) {
      console.error('❌ Erro geral ao carregar notícias:', error);
      setImages([]);
      setFilteredImages([]);
    } finally {
      setLoading(false);
      console.log("🏁 Carregamento finalizado");
    }
  };

  // Carregar notícias quando o componente montar
  useEffect(() => {
    carregarNoticiasComIdioma();
  }, []);

  // Verificar mudanças de idioma
  useEffect(() => {
    const checkAndReloadIdioma = async () => {
      try {
        const idioma = await AsyncStorage.getItem("idioma");
        let newIndex = 0;

        if (idioma === 'Inglês') {
          newIndex = 1;
        } else if (idioma === 'Espanhol') {
          newIndex = 2;
        }

        if (newIndex !== currentIdiomaIndex) {
          console.log("🔄 Idioma mudou, recarregando notícias...");
          carregarNoticiasComIdioma();
        }
      } catch (error) {
        console.error('Erro ao verificar mudança de idioma:', error);
      }
    };

    const interval = setInterval(checkAndReloadIdioma, 2000);
    return () => clearInterval(interval);
  }, [currentIdiomaIndex]);

  // Carregar a preferência de layout do AsyncStorage
  useEffect(() => {
    const carregarPreferenciaLayout = async () => {
      try {
        const valorCompacto = await AsyncStorage.getItem("compacto");
        setCompacto(valorCompacto === 'true');
      } catch (error) {
        console.error('Erro ao carregar preferência de layout:', error);
        setCompacto(false);
      }
    };

    carregarPreferenciaLayout();
  }, []);

  // Salvar a preferência de layout no AsyncStorage quando mudar
  useEffect(() => {
    const salvarPreferenciaLayout = async () => {
      try {
        await AsyncStorage.setItem("compacto", compacto.toString());
      } catch (error) {
        console.error('Erro ao salvar preferência de layout:', error);
      }
    };

    salvarPreferenciaLayout();
  }, [compacto]);

  const handleSearch = (searchValue) => {
    setSearchText(searchValue);

    if (searchValue === '') {
      setFilteredImages(images);
      setShowSearchResults(false);
      return;
    }

    const searchTerm = searchValue.toLowerCase();

    const filtered = images.filter(({ newsItem }) => {
      return (
        newsItem.nome.toLowerCase().includes(searchTerm) ||
        newsItem.noticia.toLowerCase().includes(searchTerm)
      );
    });

    setFilteredImages(filtered);
    setShowSearchResults(true);
  };

  const clearSearch = () => {
    setSearchText('');
    setFilteredImages(images);
    setShowSearchResults(false);
  };

  const handlePostPress = (img) => {
    setSelectedPost(img);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPost(null);
  };

  const abrirLink = (link) => {
    if (link && link.trim() !== '') {
      Linking.openURL(link).catch(err => 
        console.error('❌ Erro ao abrir link:', err)
      );
    }
  };

  const handleTranscription = (transcribedText) => {
    console.log('Texto recebido no Feed:', transcribedText);
    setSearchText(transcribedText);
    handleSearch(transcribedText);
    setMAudio(false);
  };

  const toggleLayoutPicker = () => {
    setShowLayoutPicker(prev => !prev);
  };

  const selecionarLayout = (tipo) => {
    setCompacto(tipo);
    setShowLayoutPicker(false);
  };

  // Mostrar loading enquanto as imagens estão sendo carregadas
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors[temaCor]} />
        <Text style={styles.loadingText}>{texto[8] || "Carregando notícias..."}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors[temaCor]} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={texto[0] || "Pesquisar notícias..."}
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={handleSearch}
          returnKeyType="search"
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color={Colors[temaCor]} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => setMAudio(true)} style={styles.clearButton}>
          <FontAwesome name="microphone" size={20} color={Colors[temaCor]} />
        </TouchableOpacity>
      </View>

      {/* Indicador de resultados de pesquisa */}
      {showSearchResults && (
        <View style={styles.searchResultsInfo}>
          <Text style={styles.searchResultsText}>
            {filteredImages.length} {texto[1] || "resultados para"} "{searchText}"
          </Text>
        </View>
      )}

      {/* ScrollView PRINCIPAL com RefreshControl */}
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors[temaCor]]}
            tintColor={Colors[temaCor]}
            progressBackgroundColor={isDarkMode ? "#333" : "#fff"}
          />
        }
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Switcher de Layout */}
        <View style={styles.swithArea}>
          <Pressable style={styles.trilho} onPress={toggleLayoutPicker}>
            <Image
              source={compacto ? require('./img/compOn.png') : require('./img/noCompOn.png')}
              style={{
                width: screenHeight * 0.047,
                height: screenHeight * 0.03,
                tintColor: Colors[temaCor]
              }}
            />
          </Pressable>

          {/* Picker de Layout */}
          {showLayoutPicker && (
            <View style={styles.layoutPicker}>
              <Pressable
                style={[styles.layoutOption, compacto === false && styles.layoutOptionSelected]}
                onPress={() => selecionarLayout(false)}
              >
                <Image
                  source={compacto ? require('./img/noComp.png') : require('./img/noCompOn.png')}
                  style={{
                    width: screenHeight * 0.047,
                    height: screenHeight * 0.03,
                    tintColor: Colors[temaCor],
                    marginRight: 8
                  }}
                />
                <Text style={[styles.layoutOptionText, compacto === false && styles.layoutOptionTextSelected]}>
                  {texto[4] || "Layout Normal"}
                </Text>
              </Pressable>

              <Pressable
                style={[styles.layoutOption, compacto === true && styles.layoutOptionSelected]}
                onPress={() => selecionarLayout(true)}
              >
                <Image
                  source={!compacto ? require('./img/comp.png') : require('./img/compOn.png')}
                  style={{
                    width: screenHeight * 0.047,
                    height: screenHeight * 0.03,
                    tintColor: Colors[temaCor],
                    marginRight: 8
                  }}
                />
                <Text style={[styles.layoutOptionText, compacto === true && styles.layoutOptionTextSelected]}>
                  {texto[5] || "Layout Compacto"}
                </Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Lista de Notícias */}
        <View style={styles.newsContainer}>
          {filteredImages.map((img, index) => {
            const shouldCrop = img.imgHeight > MAX_HEIGHT;
            const containerHeight = shouldCrop ? MAX_HEIGHT : img.imgHeight;

            if (!compacto) {
              // Layout Normal
              return (
                <View key={`${img.uri}_${index}`} style={styles.postArea}>
                  <Pressable onPress={() => handlePostPress(img)}>
                    <View style={[styles.imgArea, { height: containerHeight, overflow: shouldCrop ? 'hidden' : 'visible' }]}>
                      {img.uri ? (
                        <Image
                          source={{ uri: img.uri }}
                          style={{ width: '100%', height: '100%' }}
                          resizeMode={shouldCrop ? 'cover' : 'contain'}
                        />
                      ) : (
                        <View style={styles.noImagePlaceholder}>
                          <Ionicons name="image-outline" size={50} color="#999" />
                          <Text style={styles.noImageText}>Sem imagem</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.textArea}>
                      <Text style={{ color: isDarkMode ? "#ffffffff" : "#000000ff", fontSize: 16, left: '1%' }}>
                        {img.newsItem.nome}
                      </Text>
                    </View>
                  </Pressable>
                  <View style={styles.divider} />
                </View>
              );
            } else {
              // Layout Compacto
              return (
                <View key={`${img.uri}_${index}`} style={styles.compactoArea}>
                  <Pressable onPress={() => handlePostPress(img)} style={styles.compactoPress}>
                    {img.uri ? (
                      <Image
                        source={{ uri: img.uri }}
                        style={styles.compactoThumb}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={[styles.compactoThumb, styles.compactoNoImage]}>
                        <Ionicons name="image-outline" size={30} color="#999" />
                      </View>
                    )}
                    <View style={styles.compactoTextArea}>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={{
                          color: isDarkMode ? "#ffffffff" : "#000000ff",
                          fontSize: 16,
                        }}
                      >
                        {img.newsItem.nome}
                      </Text>
                    </View>
                  </Pressable>
                </View>
              );
            }
          })}

          {/* Estados vazios */}
          {filteredImages.length === 0 && searchText.length > 0 && (
            <View style={styles.noResultsContainer}>
              <Ionicons name="search-outline" size={50} color="#999" />
              <Text style={styles.noResultsText}>
                {texto[2] || "Nenhum resultado para"} "{searchText}"
              </Text>
              <Text style={styles.noResultsSubText}>
                {texto[3] || "Tente outros termos de pesquisa"}
              </Text>
            </View>
          )}

          {filteredImages.length === 0 && searchText.length === 0 && (
            <View style={styles.noResultsContainer}>
              <Ionicons name="newspaper-outline" size={50} color="#999" />
              <Text style={styles.noResultsText}>
                {texto[9] || "Nenhuma notícia disponível"}
              </Text>
              <Text style={styles.noResultsSubText}>
                {texto[10] || "Tente novamente mais tarde"}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modal de Notícia Detalhada */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Header do Modal */}
            <View style={styles.modalHeader}>
              <View style={styles.headerLeft}>
                <Text style={styles.modalSource}>{texto[7] || "Notícia"}</Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeModal}
                activeOpacity={0.7}
              >
                <FontAwesome name="close" size={20} color={isDarkMode ? "#fff" : "#000"} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.modalScrollView}
              contentContainerStyle={styles.modalScrollContent}
              showsVerticalScrollIndicator={false}
            >
              {selectedPost && (
                <>
                  {/* Imagem da Notícia */}
                  <View style={styles.imageContainer}>
                    {selectedPost.uri ? (
                      <Image
                        source={{ uri: selectedPost.uri }}
                        style={styles.modalImage}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={[styles.modalImage, styles.modalNoImage]}>
                        <Ionicons name="image-outline" size={80} color="#999" />
                        <Text style={styles.modalNoImageText}>Imagem não disponível</Text>
                      </View>
                    )}
                    <View style={styles.imageOverlay} />
                  </View>

                  {/* Conteúdo da Notícia */}
                  <View style={styles.modalContent}>
                    {/* Título */}
                    <Text style={styles.modalTitle}>
                      {selectedPost.newsItem.nome}
                    </Text>

                    {/* Descrição/Conteúdo */}
                    <View style={styles.descriptionContainer}>
                      <Text style={styles.modalDescription}>
                        {selectedPost.newsItem.noticia}
                      </Text>
                    </View>

                    {/* Botão para ler mais */}
                    {selectedPost.newsItem.link && selectedPost.newsItem.link.trim() !== '' && (
                      <Pressable
                        style={styles.readMoreButton}
                        onPress={() => abrirLink(selectedPost.newsItem.link)}
                      >
                        <Text style={styles.readMoreText}>{texto[6] || "Ler notícia completa"}</Text>
                        <Ionicons name="open-outline" size={16} color={Colors[temaCor]} />
                      </Pressable>
                    )}
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
      
      {/* Componentes de áudio e bolhas */}
      <AudioRecorder 
        visible={mAudio} 
        onClose={() => setMAudio(false)} 
        onTranscription={handleTranscription} 
      />
      <BubbleArea />
    </View>
  );
}