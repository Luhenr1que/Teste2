import React, { memo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useIdioma } from "./idiomaContext.js";
import { TouchableWithoutFeedback, View } from "react-native";
import { useTheme } from "./themeContext.js";
import { Colors } from "./themeContext.js";


import Home from "./src/telas/principal/home";
import Perfil from "./src/telas/principal/perfil";
import Feed from "./src/telas/principal/Feed";
import Documentos from "./src/telas/principal/Documentos";
import Servico from "./src/telas/principal/servico/index.js";



const Tab = createBottomTabNavigator();

// Nomes estáticos para as rotas
const ROUTE_NAMES = {
  HOME: 'Home',
  FEED: 'Feed',
  DOCUMENTOS: 'Documentos',
  SERVICO: 'Servico',
  PERFIL: 'Perfil'
};



const BottomBar = memo(() => {
  const { textos } = useIdioma();
  const { isDarkMode, toggleTheme, temaCor } = useTheme();

  if (!textos) return null;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === ROUTE_NAMES.HOME) {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === ROUTE_NAMES.FEED) {
            iconName = focused ? "newspaper" : "newspaper-outline";
          } else if (route.name === ROUTE_NAMES.DOCUMENTOS) {
            iconName = focused ? "document-text" : "document-text-outline";
          } else if (route.name === ROUTE_NAMES.PERFIL) {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === ROUTE_NAMES.SERVICO) {
            iconName = focused ? "heart" : "heart-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors[temaCor],
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { 
          backgroundColor: isDarkMode ? "#1E1E1E" : "#f2f2f2", 
          height: 80,
          paddingBottom: 5,
          paddingTop: 5,
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
        },
        tabBarButton: (props) => (
          <TouchableWithoutFeedback {...props}>
            <View style={props.style}>{props.children}</View>
          </TouchableWithoutFeedback>
        ),
        tabBarItemStyle: {
          height: 50,
          padding: 0,
          margin: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          margin: 0,
          padding: 0,
        },
      })}
    >
      <Tab.Screen 
        name={ROUTE_NAMES.HOME} 
        component={Home} 
        options={{ title: textos.bar[0] }} 
      />
      <Tab.Screen 
        name={ROUTE_NAMES.FEED} 
        component={Feed} 
        options={{ title: textos.bar[1] }} 
      />
      <Tab.Screen 
        name={ROUTE_NAMES.DOCUMENTOS} 
        component={Documentos}
        options={{ title: textos.bar[2] }} 
      />
      <Tab.Screen 
        name={ROUTE_NAMES.SERVICO} 
        component={Servico} 
        options={{ title: textos.bar[4] }} 
      />
      <Tab.Screen 
        name={ROUTE_NAMES.PERFIL} 
        component={Perfil} 
        options={{ title: textos.bar[3] }} 
      />
    </Tab.Navigator>
  );
});

export default BottomBar;