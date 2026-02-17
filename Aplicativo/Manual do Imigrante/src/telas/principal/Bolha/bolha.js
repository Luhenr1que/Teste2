import React, { useRef } from "react";
import { Animated, PanResponder, TouchableOpacity, Text, Dimensions, Image, View } from "react-native";
import { Colors, useTheme } from "../../../../themeContext";
import styles from "../../splash/style";
import { useEffect,useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "../../../../CRUD";

export default function Bolha({ onPress}) {
    const { width, height } = Dimensions.get('window');
    const { temaCor, isDarkMode } = useTheme();
    const [quant, setQuant] = useState(0);
    const [notificacao,setNotificacao]=useState(false); 

   
   useEffect(() => {
    let intervalId;
    
    const testarApi = async () => {
        const savedId = await AsyncStorage.getItem("idUsers");
        const savedAdm = await AsyncStorage.getItem("idAdmP");
        
        if (!savedId || !savedAdm) {
            console.log('IDs não encontrados');
            setNotificacao(false);
            return;
        }
       
        const url = `${API_URL}/api/Notificacao?idUsers=${savedId}&idAdm=${savedAdm}`;
        
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });
            
            if (response.ok) {
                const data = await response.json()
                
                setQuant(data.notificacao);
                
                if(data.notificacao === 0) { 
                    setNotificacao(false);
                } else { 
                    setNotificacao(true);
                }
            }
        } catch (error) {
            
        }
    };
    
    
    testarApi();
    
    
    intervalId = setInterval(testarApi, 10000);
    
    
    return () => {
        if (intervalId) {
            clearInterval(intervalId);
        }
    };
}, []); 

   
    
    const quantMax = quant > 10 ? '10+' : quant;

    const position = useRef(new Animated.ValueXY({ x: width * 0.81, y: height * 0.86 })).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,

            onPanResponderGrant: () => {
                position.setOffset({
                    x: position.x._value,
                    y: position.y._value,
                });
            },

            onPanResponderMove: (_, gesture) => {
                position.setValue({
                    x: gesture.dx,
                    y: gesture.dy,
                });
            },

            onPanResponderRelease: () => {
                position.flattenOffset();
            },
        })
    ).current;

    return (
        <Animated.View
            pointerEvents="box-none"
            {...panResponder.panHandlers}
            style={{
                position: "absolute",
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: isDarkMode ? "#252525ff" : "#FFFFFF",
                borderWidth: 5,
                borderColor: isDarkMode ? "#313131ba" : "#d6d6d6ff",
                justifyContent: "center",
                alignItems: "center",
                elevation: 5,
                transform: [
                    { translateX: position.x },
                    { translateY: position.y }
                ],
                zIndex: 9999,
            }}
        >
            {notificacao && <View style={{
                position: 'absolute',
                top: -12,
                left: 0,
                backgroundColor: Colors[temaCor],
                height: 25,
                width: 29,
                maxWidth: 30,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: isDarkMode ? "#64646488" : "#d6d6d67a" ,
                borderStyle: 'dashed',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
                <Text style={{color: isDarkMode ? "#252525ff" : "#FFFFFF"}}>{quantMax}</Text>
            </View>}
            
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onPress}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
                <Image
                    source={require('./pergunta.png')}
                    style={{ width: 40, height: 40, tintColor: Colors[temaCor] }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </Animated.View>
    );
}
