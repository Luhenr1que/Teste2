import React from 'react';
import { View, Modal, FlatList, Text, Pressable, Image, StatusBar, Platform } from 'react-native';
import styles from './src/telas/splash/style';
import { useIdioma } from './idiomaContext';


export default function ModalIdioma({ ver, setVer, onIdiomaSelecionado }) {
  const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
  const { mudarIdioma } = useIdioma();

  const idioma = [
    { text: 'Português', ling: 'Portugues', img: require('./assets/imgPadrao/brasil.png') },
    { text: 'English', ling: 'Inglês', img: require('./assets/imgPadrao/eua.png') },
    { text: 'Español', ling: 'Espanhol', img: require('./assets/imgPadrao/espanha.png') }
  ];

  const idiomaSelect = async (lingua) => {
    await mudarIdioma(lingua);
    setVer(false);
    
    // Chama a função de callback após selecionar o idioma
    if (onIdiomaSelecionado) {
      onIdiomaSelecionado();
    }
  };

  return (
    <View>
      <Modal transparent={true} visible={ver}>
        <View style={styles.modalContainer}>
          <View style={styles.modalList}>
            <Pressable onPress={() => setVer(false)}>
              <Image style={styles.close} source={require('./assets/imgPadrao/close.png')} />
            </Pressable>
            <FlatList
              data={idioma}
              renderItem={({ item }) => (
                <View>
                  <Pressable
                    style={styles.flatLine}
                    onPress={() => idiomaSelect(item.ling)}
                  >
                    <Image source={item.img} />
                    <Text style={styles.modalText}>{item.text}</Text>
                  </Pressable>
                </View>
              )}
              keyExtractor={(item) => item.text}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}