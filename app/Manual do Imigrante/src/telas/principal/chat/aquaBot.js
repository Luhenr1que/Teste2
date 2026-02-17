import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Dimensions, Platform } from "react-native";

export default async function bot(navigation) {
    const { width, height } = Dimensions.get("window");
    const escolha = await AsyncStorage.getItem("idioma");

    const getText = (port, esp, eng) => {
        switch (escolha) {
            case "Portugues": return port;
            case "Espanhol": return esp;
            case "Inglês": return eng;
            default: return port;
        }
    };

    const size = width * 0.12 - 10;
    const image = {
        normal: <MaterialCommunityIcons name="robot" size={size} color="black" style={{ zIndex: 2 }} />,
        duvida: <MaterialCommunityIcons name="robot-confused" size={size} color="black" style={{ zIndex: 2 }} />,
        feliz: <MaterialCommunityIcons name="robot-excited" size={size} color="black" style={{ zIndex: 2 }} />,
        raiva: <MaterialCommunityIcons name="robot-angry" size={size} color="black" style={{ zIndex: 2 }} />,
        morto: <MaterialCommunityIcons name="robot-dead" size={size} color="black" style={{ zIndex: 2 }} />,
        amor: <MaterialCommunityIcons name="robot-love" size={size} color="black" style={{ zIndex: 2 }} />,
        desligado: <MaterialCommunityIcons name="robot-off" size={size} color="black" style={{ zIndex: 2 }} />,
    };

    const opcoes = [
        {
            inicio: {
                fala: getText("Como posso ajudar você hoje?", "¿Cómo puedo ayudarte hoy?", "How can I help you today?"),
                image: image.normal,
                funcoes: [
                    { texto: getText("Tenho uma dúvida", "Tengo una duda", "I have a question"), proximo: "duvida" },
                    {
                        texto: getText("Falar com administrador", "Hablar con administrador", "Talk to administrator"),
                        proximo: "inicio", 
                        acao: "abrirChatAdmin"
                    },
                ],
            },

            duvida: {
                fala: getText("Sobre o que você quer saber?", "¿Sobre qué quieres saber?", "What would you like to know about?"),
                image: image.duvida,
                funcoes: [
                    { texto: getText("Documentos", "Documentos", "Documents"), proximo: "documentos" },
                    { 
                        texto: getText("Notícias", "Noticias", "News"), 
                        proximo: "inicio", // Volta para início após ação
                        acao: "abrirNoticias"
                    },
                    { 
                        texto: getText("Perfil", "Perfil", "Profile"), 
                        proximo: "inicio", // Volta para início após ação
                        acao: "irParaPerfil"
                    },
                    { 
                        texto: getText("Serviços", "Servicios", "Services"), 
                        proximo: "inicio", // Volta para início após ação
                        acao: "irParaServicos"
                    },
                    { texto: getText("Voltar", "Volver", "Back"), proximo: "inicio" },
                ],
            },

            documentos: {
                fala: getText(
                    "Quer saber sobre locais ou funções dos documentos?",
                    "¿Quieres saber sobre lugares o funciones de los documentos?",
                    "Do you want to know about document locations or functions?"
                ),
                image: image.duvida,
                funcoes: [
                    { texto: getText("Locais", "Lugares", "Locations"), proximo: "locaisDocumentos" },
                    { texto: getText("Função", "Función", "Function"), proximo: "funcaoDocumentos" },
                    { texto: getText("Voltar", "Volver", "Back"), proximo: "duvida" },
                ],
            },

            locaisDocumentos: {
                fala: getText(
                    "Qual documento você precisa encontrar?",
                    "¿Qué documento necesitas encontrar?",
                    "Which document do you need to find?"
                ),
                image: image.normal,
                funcoes: [
                    { 
                        texto: getText("RG", "RG", "RG"), 
                        proximo: "inicio", // Volta para início após ação
                        acao: "irParaDocumentos"
                    },
                    { 
                        texto: getText("CPF", "CPF", "CPF"), 
                        proximo: "inicio", // Volta para início após ação
                        acao: "irParaDocumentos"
                    },
                    { 
                        texto: getText("CNH", "Licencia", "Driver's License"), 
                        proximo: "inicio", // Volta para início após ação
                        acao: "irParaDocumentos"
                    },
                    { 
                        texto: getText("Título de Eleitor", "Título de Elector", "Voter ID"), 
                        proximo: "inicio", // Volta para início após ação
                        acao: "irParaDocumentos"
                    },
                    { 
                        texto: getText("Bilhete Único", "Bilhete Único", "Transport Card"), 
                        proximo: "inicio", // Volta para início após ação
                        acao: "irParaDocumentos"
                    },
                    { texto: getText("Voltar", "Volver", "Back"), proximo: "documentos" },
                ],
            },

            funcaoDocumentos: {
                fala: getText(
                    "Sobre qual documento você quer saber?",
                    "¿Sobre qué documento quieres saber?",
                    "Which document do you want to know about?"
                ),
                image: image.feliz,
                funcoes: [
                    { texto: getText("RG - Documento de Identidade", "RG - Documento de Identidad", "RG - Identity Document"), proximo: "explicacaoRG" },
                    { texto: getText("CPF - Cadastro Fiscal", "CPF - Registro Fiscal", "CPF - Tax Registry"), proximo: "explicacaoCPF" },
                    { texto: getText("CNH - Carteira de Motorista", "Licencia de Conducir", "Driver's License"), proximo: "explicacaoCNH" },
                    { texto: getText("Título de Eleitor", "Título de Elector", "Voter ID"), proximo: "explicacaoTitulo" },
                    { texto: getText("Bilhete Único", "Bilhete Único", "Transport Card"), proximo: "explicacaoBilhete" },
                    { texto: getText("Voltar", "Volver", "Back"), proximo: "documentos" },
                ],
            },

            explicacaoRG: {
                fala: getText(
                    "O RG (Registro Geral) é o principal documento de identificação no Brasil. Ele contém seu nome completo, data de nascimento, filiação, foto e número de identificação. É emitido pelos órgãos de segurança pública estaduais e serve para identificação pessoal, abertura de contas e procedimentos em órgãos públicos.",
                    "El RG (Registro General) es el principal documento de identificación en Brasil. Contiene su nombre completo, fecha de nacimiento, filiación, foto y número de identificación. Es emitido por los organismos de seguridad pública estatales y sirve para identificación personal, apertura de cuentas y procedimientos en organismos públicos.",
                    "The RG (General Registry) is the main identification document in Brazil. It contains your full name, date of birth, parentage, photo and identification number. It is issued by state public security agencies and serves for personal identification, opening accounts and procedures in public agencies."
                ),
                image: image.normal,
                funcoes: [
                    { 
                        texto: getText("Encontrar locais para RG", "Encontrar lugares para RG", "Find RG locations"), 
                        proximo: "inicio", // Volta para início após ação
                        acao: "irParaDocumentos"
                    },
                    { texto: getText("Voltar", "Volver", "Back"), proximo: "funcaoDocumentos" },
                ],
            },

            explicacaoCPF: {
                fala: getText(
                    "O CPF (Cadastro de Pessoas Físicas) é o número de identificação fiscal brasileiro. É obrigatório para declaração de imposto de renda, abertura de contas bancárias, contratações e compras. É emitido pela Receita Federal e tem validade indeterminada.",
                    "El CPF (Registro de Personas Físicas) es el número de identificación fiscal brasileño. Es obligatorio para la declaración de impuestos, apertura de cuentas bancarias, contrataciones y compras. Es emitido por la Receita Federal y tiene validez indeterminada.",
                    "The CPF (Individual Taxpayer Registry) is the Brazilian tax identification number. It is mandatory for tax declaration, opening bank accounts, hiring and purchases. It is issued by the Federal Revenue and has indefinite validity."
                ),
                image: image.normal,
                funcoes: [
                    { 
                        texto: getText("Encontrar Receita Federal", "Encontrar Receita Federal", "Find Federal Revenue"), 
                        proximo: "inicio", // Volta para início após ação
                        acao: "irParaDocumentos"
                    },
                    { texto: getText("Voltar", "Volver", "Back"), proximo: "funcaoDocumentos" },
                ],
            },

            explicacaoCNH: {
                fala: getText(
                    "A CNH (Carteira Nacional de Habilitação) é o documento que autoriza a condução de veículos automotores. Contém suas informações pessoais, foto, categoria de habilitação e datas de emissão/validade. É emitida pelo DETRAN e precisa ser renovada periodicamente.",
                    "La Licencia de Conducir es el documento que autoriza la conducción de vehículos automotores. Contiene su información personal, foto, categoría de licencia y fechas de emisión/vencimiento. Es emitida por el DETRAN y debe renovarse periódicamente.",
                    "The Driver's License is the document that authorizes driving motor vehicles. It contains your personal information, photo, license category and issue/expiration dates. It is issued by DETRAN and needs to be renewed periodically."
                ),
                image: image.normal,
                funcoes: [
                    { 
                        texto: getText("Encontrar DETRAN", "Encontrar DETRAN", "Find DETRAN"), 
                        proximo: "inicio", // Volta para início após ação
                        acao: "irParaDocumentos"
                    },
                    { texto: getText("Voltar", "Volver", "Back"), proximo: "funcaoDocumentos" },
                ],
            },

            explicacaoTitulo: {
                fala: getText(
                    "O Título de Eleitor é o documento que comprova seu alistamento eleitoral. É necessário para votar em eleições e comprovar quitação eleitoral. Contém sua zona e seção eleitoral, e deve ser atualizado quando houver mudança de endereço.",
                    "El Título de Elector es el documento que acredita su inscripción electoral. Es necesario para votar en elecciones y acreditar cumplimiento electoral. Contiene su zona y sección electoral, y debe actualizarse cuando haya cambio de dirección.",
                    "The Voter ID is the document that proves your electoral registration. It is necessary to vote in elections and prove electoral compliance. It contains your electoral zone and section, and must be updated when there is a change of address."
                ),
                image: image.normal,
                funcoes: [
                    { 
                        texto: getText("Encontrar Zona Eleitoral", "Encontrar Zona Electoral", "Find Electoral Zone"), 
                        proximo: "inicio", // Volta para início após ação
                        acao: "irParaDocumentos"
                    },
                    { texto: getText("Voltar", "Volver", "Back"), proximo: "funcaoDocumentos" },
                ],
            },

            explicacaoBilhete: {
                fala: getText(
                    "O Bilhete Único é o cartão de transporte público utilizado em várias cidades brasileiras. Oferece tarifas diferenciadas para estudantes, idosos e pessoas com deficiência. Pode ser comum, estudantil, para idosos ou PCD.",
                    "El Bilhete Único es la tarjeta de transporte público utilizada en varias ciudades brasileñas. Ofrece tarifas diferenciadas para estudiantes, ancianos y personas con discapacidad. Puede ser común, estudantil, para ancianos o PCD.",
                    "The Bilhete Único is the public transport card used in several Brazilian cities. It offers differentiated fares for students, seniors and people with disabilities. It can be regular, student, senior or PWD."
                ),
                image: image.normal,
                funcoes: [
                    { 
                        texto: getText("Encontrar postos", "Encontrar puestos", "Find service points"), 
                        proximo: "inicio", // Volta para início após ação
                        acao: "irParaDocumentos"
                    },
                    { texto: getText("Voltar", "Volver", "Back"), proximo: "funcaoDocumentos" },
                ],
            },

            noticias: {
                fala: getText(
                    "Aqui estão as últimas notícias disponíveis.",
                    "Aquí están las últimas noticias disponibles.",
                    "Here are the latest available news."
                ),
                image: image.feliz,
                funcoes: [{ texto: getText("Voltar", "Volver", "Back"), proximo: "duvida" }],
            },

            perfil: {
                fala: getText(
                    "O que deseja fazer no perfil?",
                    "¿Qué quieres hacer en el perfil?",
                    "What do you want to do in your profile?"
                ),
                image: image.normal,
                funcoes: [
                    { 
                        texto: getText("Editar perfil", "Editar perfil", "Edit profile"), 
                        proximo: "inicio", // Volta para início após ação
                        acao: "irParaPerfil"
                    },
                    { texto: getText("Voltar", "Volver", "Back"), proximo: "duvida" },
                ],
            },

            editar: {
                fala: getText(
                    "Você pode editar suas informações aqui.",
                    "Puedes editar tu información aquí.",
                    "You can edit your information here."
                ),
                image: image.normal,
                funcoes: [
                    { texto: getText("Voltar", "Volver", "Back"), proximo: "perfil" },
                ],
            },

            servicos: {
                fala: getText(
                    "Escolha uma opção sobre serviços.",
                    "Elige una opción sobre servicios.",
                    "Choose a service option."
                ),
                image: image.feliz,
                funcoes: [
                    { texto: getText("Locais", "Lugares", "Locations"), proximo: "locaisServicos" },
                    { texto: getText("Voltar", "Volver", "Back"), proximo: "duvida" },
                ],
            },

            locaisServicos: {
                fala: getText(
                    "Qual tipo de serviço você precisa?",
                    "¿Qué tipo de servicio necesitas?",
                    "What type of service do you need?"
                ),
                image: image.normal,
                funcoes: [
                    { 
                        texto: getText("Alimentação", "Alimentación", "Food"), 
                        proximo: "inicio", // Volta para início após ação
                        acao: "irParaServicos"
                    },
                    { 
                        texto: getText("Consulados", "Consulados", "Consulates"), 
                        proximo: "inicio", // Volta para início após ação
                        acao: "irParaServicos"
                    },
                    { 
                        texto: getText("Educação", "Educación", "Education"), 
                        proximo: "inicio", // Volta para início após ação
                        acao: "irParaServicos"
                    },
                    { 
                        texto: getText("Assistência Social", "Asistencia Social", "Social Assistance"), 
                        proximo: "inicio", // Volta para início após ação
                        acao: "irParaServicos"
                    },
                    { texto: getText("Voltar", "Volver", "Back"), proximo: "servicos" },
                ],
            },

            chatAdmin: {
                fala: getText(
                    "Você escolheu falar com o administrador. Aqui você pode conversar diretamente!",
                    "Has elegido hablar con el administrador. ¡Aquí puedes conversar directamente!",
                    "You chose to talk to the administrator. Here you can chat directly!"
                ),
                image: image.normal,
                funcoes: [
                    { texto: getText("Voltar ao menu principal", "Volver al menú principal", "Back to main menu"), proximo: "inicio" }
                ],
            },
        },
    ];

    return { image, opcoes };
}