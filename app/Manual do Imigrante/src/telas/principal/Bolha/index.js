import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const BubbleContext = createContext();

export function BubbleProvider({ children }) {
  const [visible, setVisible] = useState(true); // Valor padrão true

  // Carregar o estado do AsyncStorage quando o componente montar
  useEffect(() => {
    loadVisibility();
  }, []);

  // Salvar o estado no AsyncStorage quando ele mudar
  useEffect(() => {
    saveVisibility();
  }, [visible]);

  const loadVisibility = async () => {
    try {
      const savedVisibility = await AsyncStorage.getItem('@bubble_visible');
      if (savedVisibility !== null) {
        // Se existe valor salvo, usa ele
        setVisible(JSON.parse(savedVisibility));
      } else {
        // Se não existe, mantém o padrão (true) e salva
        await AsyncStorage.setItem('@bubble_visible', JSON.stringify(true));
      }
    } catch (error) {
      console.error('Erro ao carregar visibilidade:', error);
      // Em caso de erro, mantém o padrão true
    }
  };

  const saveVisibility = async () => {
    try {
      await AsyncStorage.setItem('@bubble_visible', JSON.stringify(visible));
    } catch (error) {
      console.error('Erro ao salvar visibilidade:', error);
    }
  };

  // Função para atualizar o estado e salvar automaticamente
  const updateVisible = (value) => {
    setVisible(value);
  };

  return (
    <BubbleContext.Provider value={{ 
      visible, 
      setVisible: updateVisible 
    }}>
      {children}
    </BubbleContext.Provider>
  );
}

export function useBubble() {
  const context = useContext(BubbleContext);
  if (!context) {
    throw new Error('useBubble deve ser usado dentro de um BubbleProvider');
  }
  return context;
}