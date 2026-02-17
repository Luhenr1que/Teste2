import React, { createContext, useState, useContext, useEffect } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeModeState] = useState("system");
  const [temaCor, setTemaCorState] = useState("padrao");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Carregar valores salvos no AsyncStorage ao iniciar
  useEffect(() => {
    const loadStoredPreferences = async () => {
      const storedThemeMode = await AsyncStorage.getItem("themeMode");
      const storedTemaCor = await AsyncStorage.getItem("temaCor");

      if (storedThemeMode) setThemeModeState(storedThemeMode);
      if (storedTemaCor) setTemaCorState(storedTemaCor);
    };

    loadStoredPreferences();
  }, []);

  // Atualiza isDarkMode quando themeMode mudar
  useEffect(() => {
    if (themeMode === "system") {
      const colorScheme = Appearance.getColorScheme();
      setIsDarkMode(colorScheme === "dark");
    } else {
      setIsDarkMode(themeMode === "dark");
    }

    AsyncStorage.setItem("themeMode", themeMode); // Salva no armazenamento
  }, [themeMode]);

  // Escuta mudanças no sistema
  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      if (themeMode === "system") {
        setIsDarkMode(colorScheme === "dark");
      }
    });

    return () => listener.remove();
  }, [themeMode]);

  const setThemeMode = (mode) => {
    setThemeModeState(mode);
    AsyncStorage.setItem("themeMode", mode);
  };

  const setTemaCor = (cor) => {
    setTemaCorState(cor);
    AsyncStorage.setItem("temaCor", cor);
  };

  const toggleTheme = () => {
    if (themeMode === "light") setThemeMode("dark");
    else if (themeMode === "dark") setThemeMode("light");
    else setThemeMode("dark");
  };

  return (
    <ThemeContext.Provider
      value={{isDarkMode,themeMode,setThemeMode,toggleTheme,temaCor,setTemaCor,}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export const Colors = {
  padrao: '#0d5b4bff',
  laranja: '#ff7e47ff',
  roxo: '#7419c5ff',
  azul:'#3F88C5',
  amarelo:'#ffbb2f',
  rosa:'#ea639fff',
  vermelho:'#d13437ff',
  verde:'#6ceb3aff',
  azulEscuro: '#0052ceff'
};
