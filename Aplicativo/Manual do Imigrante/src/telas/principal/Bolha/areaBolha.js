// src/components/BubbleArea.js
import React from "react";
import Bolha from "./bolha";
import { useBubble } from "./index";
import { useNavigation } from "@react-navigation/native";

export default function BubbleArea() {
  
  const { visible } = useBubble();
  const navigation = useNavigation(); 

  if (visible) return null;

  return (
    <Bolha onPress={() => navigation.navigate("Chat", { abrirAdmin: false })} />
  );
}
