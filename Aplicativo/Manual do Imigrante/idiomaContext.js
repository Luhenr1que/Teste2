import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import pegarIdioma from './texts';

const IdiomaContext = createContext();

export function IdiomaProvider({ children }) {
  const [textos, setTextos] = useState(null);

  const carregarIdioma = async () => {
    const idiomaSalvo = await AsyncStorage.getItem('idioma') || 'Portugues';
    const textosIdioma = await pegarIdioma(idiomaSalvo);
    setTextos(textosIdioma);
  };

  const mudarIdioma = async (novoIdioma) => {
    await AsyncStorage.setItem('idioma', novoIdioma);
    await carregarIdioma();
  };

  useEffect(() => {
    carregarIdioma();
  }, []);

  return (
    <IdiomaContext.Provider value={{ textos, mudarIdioma }}>
      {children}
    </IdiomaContext.Provider>
  );
}

export function useIdioma() {
  return useContext(IdiomaContext);
}