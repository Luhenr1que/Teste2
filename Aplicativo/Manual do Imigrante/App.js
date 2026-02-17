import { Pressable, StyleSheet, Text, View, Alert, useColorScheme, StatusBar } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import { useEffect, useState } from "react";
import { IdiomaProvider } from './idiomaContext';
import BottomBar from './bottomBar';
import { ThemeProvider, useTheme } from './themeContext';
import { ApiProvider, useApi } from './CRUD';
import AudioRecorder from './gravador';
import ModalIdioma from './trocarIdioma';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { BubbleProvider } from './src/telas/principal/Bolha/index';
import { useBubble } from './src/telas/principal/Bolha/index';

import Splash from './src/telas/splash';
import Login from './src/telas/inicio/login';
import Cadastro from './src/telas/inicio/cadastro';
import Home from './src/telas/principal/home';
import Questionario from './src/telas/inicio/questionario';
import Perfil from './src/telas/principal/perfil';
import AtualizarPerfil from './src/telas/principal/update';
import Logradouro from './src/telas/principal/logardouro';
import Emergencia from './src/telas/principal/Documentos/src/Emergencia/emergencia';
import PDocumentos from './src/telas/principal/Documentos/src/PDocumentos/pDocumentos';
import Mapa from './src/telas/principal/Documentos/src/Mapa';
import Chat from './src/telas/principal/chat/chat';
import Camera from './src/telas/principal/Documentos/src/camera';

const Stack = createNativeStackNavigator();

// DevTools com botões para abrir modais
function DevTools({ setVer, setMAudio }) {
  const { diagnosticarRede, testarConexao, salvarConta, atualizarConta } = useApi();
  const navigation = useNavigation();
  const { visible, setVisible } = useBubble();

  const limparCache = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('✅ Cache limpo', 'Todos os dados locais foram removidos');
    } catch (error) {
      Alert.alert('❌ Erro', 'Falha ao limpar cache');
    }
  };

  const visualizarDados = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const stores = await AsyncStorage.multiGet(keys);
      console.log('Dados salvos:', stores);
      Alert.alert('📦 Dados Salvos', `Total: ${keys.length} itens\nVer console para detalhes`);
    } catch (error) {
      Alert.alert('❌ Erro', 'Falha ao ler dados');
    }
  };

  const testarViaCEP = async () => {
    try {
      const response = await fetch('https://viacep.com.br/ws/01001000/json/');
      const data = await response.json();
      Alert.alert('🌐 ViaCEP Test', `CEP: ${data.cep}\nRua: ${data.logradouro}`);
    } catch (error) {
      Alert.alert('❌ Erro', 'Falha ao testar ViaCEP');
    }
  };

  const verificarConexao = async () => {
    try {
      const { isConnected } = await NetInfo.fetch();
      Alert.alert('📶 Conexão', isConnected ? 'Conectado' : 'Offline');
    } catch (error) {
      Alert.alert('❌ Erro', 'Falha ao verificar conexão');
    }
  };

  // Renderiza DevTools apenas em desenvolvimento
  if (!__DEV__) return null;

  return (
    <View style={styles.devTools}>
      <Pressable onPress={diagnosticarRede} style={styles.devButton}>
        <Text style={styles.devButtonText}>🔍 Diagnóstico</Text>
      </Pressable>
      <Pressable onPress={testarConexao} style={styles.devButton}>
        <Text style={styles.devButtonText}>📡 Testar Conexão</Text>
      </Pressable>
      <Pressable onPress={() => salvarConta('TesteAaa99aaa', 'teste2942@email.com', '2000-01-01', '1184444499', 'Brasil', '123456')} style={styles.devButton}>
        <Text style={styles.devButtonText}>➕ POST</Text>
      </Pressable>
      <Pressable onPress={() => atualizarConta('teste@email.com', '123456', {
        emailUsers: 'novo@email.com',
        senhaUsers: 'novaSenha123'
      })} style={styles.devButton}>
        <Text style={styles.devButtonText}>✏️ PUT</Text>
      </Pressable>
      <Pressable style={styles.devButton} onPress={() => setMAudio(true)}>
        <Text style={styles.devButtonText}>🎙️ Gravador</Text>
      </Pressable>
      <Pressable style={styles.devButton} onPress={() => setVer(true)}>
        <Text style={styles.devButtonText}>🌐 Idioma</Text>
      </Pressable>
      <Pressable style={styles.devButton} onPress={() => navigation.navigate('Logradouro')}>
        <Text style={styles.devButtonText}>🗺️ Endereço</Text>
      </Pressable>
      <Pressable style={styles.devButton} onPress={limparCache}>
        <Text style={styles.devButtonText}>🗑️ Limpar Cache</Text>
      </Pressable>
      <Pressable style={styles.devButton} onPress={visualizarDados}>
        <Text style={styles.devButtonText}>📊 Ver Dados</Text>
      </Pressable>
      <Pressable style={styles.devButton} onPress={testarViaCEP}>
        <Text style={styles.devButtonText}>📮 Testar CEP</Text>
      </Pressable>
      <Pressable style={styles.devButton} onPress={verificarConexao}>
        <Text style={styles.devButtonText}>📶 Status Rede</Text>
      </Pressable>
      <Pressable style={styles.devButton} onPress={() => navigation.navigate("Chat", { abrirAdmin: true })}>
        <Text style={styles.devButtonText}>💬 Abrir chat ADM</Text>
      </Pressable>
      <Pressable
        style={styles.devButton}
        onPress={() => setVisible(!visible)}
      >
        <Text style={styles.devButtonText}>
          {!visible ? "⚪ Ocultar Bolha" : "🟢 Mostrar Bolha"}
        </Text>
      </Pressable>
    </View>
  );
}

// Componente wrapper para a navegação principal
function MainNavigator({ setVer, setMAudio }) {
  const navigation = useNavigation();

  return (
    <>

      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
        <Stack.Screen name="Questionario" component={Questionario} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={BottomBar} options={{ headerShown: false }} />
        <Stack.Screen name="AtualizarPerfil" component={AtualizarPerfil} options={{ headerShown: false }} />
        <Stack.Screen name="Logradouro" component={Logradouro} options={{ headerShown: false }} />
        <Stack.Screen name="Emergencia" component={Emergencia} options={{ headerShown: false }} />
        <Stack.Screen name="PDocumentos" component={PDocumentos} options={{ headerShown: false }} />
        <Stack.Screen name="Mapa" component={Mapa} options={{ headerShown: false }} />
        <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
        <Stack.Screen name="Camera" component={Camera} options={{ headerShown: false }} />
      </Stack.Navigator>

      {/* DevTools DENTRO do NavigationContainer */}
         {/*  <DevTools setVer={setVer} setMAudio={setMAudio} navigation={navigation} />  */} 
    </>
  );
}

export default function App() {
  const [ver, setVer] = useState(false);      
  const [mAudio, setMAudio] = useState(false); 
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'inter': require('./assets/fonts/Inter-Bold.otf')
      });
      setFontLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return (
      <View style={styles.container}>
        <Text>Carregando fontes...</Text>
      </View>
    );
  }

  return (
    <ApiProvider>
      <ThemeProvider>
        <IdiomaProvider>
          <BubbleProvider>
            {/* NAVEGAÇÃO */}
            <NavigationContainer>
              <MainNavigator setVer={setVer} setMAudio={setMAudio} />
              {/* REMOVIDO: BubbleArea global que causava erro */}
            </NavigationContainer>

            {/* MODAIS */}
            <AudioRecorder visible={mAudio} onClose={() => setMAudio(false)} />
            {ver && <ModalIdioma ver={ver} setVer={setVer} />}
          </BubbleProvider>
        </IdiomaProvider>
      </ThemeProvider>
    </ApiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  devTools: {
    position: 'absolute',
    bottom: 80,
    left: 10,
    right: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  devButton: {
    margin: 5,
    padding: 8,
    backgroundColor: '#6200ee',
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  devButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});