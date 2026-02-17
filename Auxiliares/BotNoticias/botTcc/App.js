const fetch = require('node-fetch');
const cron = require('node-cron');
const translate = require('translate-google-api');
const axios = require('axios');
require('dotenv').config();

const API_KEY = "SuaChaveGNews"; // Substitua pela sua chave de API do GNews
const LARAVEL_API_URL = process.env.LARAVEL_API_URL
const LANGUAGES = ["pt", "en", "es"];
const LANGUAGE_NAMES = {"pt": "Português", "en": "Inglês", "es": "Espanhol"};
const LANGUAGE_CODES = {"pt": "pt", "en": "en", "es": "es"};

// ✅ LISTA DE TEMAS RELACIONADOS A IMIGRAÇÃO
const TEMAS_IMIGRACAO = [
  "Imigrante",
  "Imigração",
  "Leis de imigração", 
  "Mercosul",
  "Vistos para imigrantes",
  "Refugiados",
  "Política migratória",
  "Direitos dos imigrantes",
  "Imigração ilegal",
  "Documentação de imigrantes",
  "Imigração no Brasil",
  "Imigração em Portugal",
  "Imigração nos EUA",
  "Imigração na Europa",
  "Acordo de residência",
  "Cidadania para imigrantes",
  "Imigração e trabalho",
  "Crise migratória",
  "Imigração e direitos humanos"
];

// Variável global para o tema atual
let currentThemeIndex = 0;
let SEARCH_TERM = TEMAS_IMIGRACAO[0]; // Começa com o primeiro tema

// Função de delay para evitar rate limiting
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function criarLinkComTradutor(urlOriginal, idiomaAlvo) {
  return `https://translate.google.com/translate?hl=${idiomaAlvo}&sl=auto&tl=${idiomaAlvo}&u=${encodeURIComponent(urlOriginal)}`;
}

async function traduzirNoticia(noticia, targetLang, sourceLang) {
  try {
    console.log(`🔄 Traduzindo de ${LANGUAGE_NAMES[sourceLang]} para ${LANGUAGE_NAMES[targetLang]}...`);
    
    // Adiciona delay maior para evitar bloqueio
    await delay(3000 + Math.random() * 4000);
    
    const [tituloTraduzido, descricaoTraduzida] = await Promise.all([
      translate(noticia.title, { from: sourceLang, to: targetLang }),
      noticia.description ? translate(noticia.description, { from: sourceLang, to: targetLang }) : Promise.resolve('')
    ]);
    
    return {
      ...noticia,
      title: tituloTraduzido || noticia.title,
      description: descricaoTraduzida || noticia.description,
      translated: true,
      originalLanguage: sourceLang,
      translatedUrl: criarLinkComTradutor(noticia.url, LANGUAGE_CODES[targetLang])
    };
  } catch (error) {
    console.error(`❌ Erro na tradução de ${sourceLang} para ${targetLang}:`, error.message);
    
    // Retorna a notícia original se a tradução falhar
    return {
      ...noticia,
      translated: false,
      originalLanguage: sourceLang,
      translatedUrl: noticia.url
    };
  }
}

async function buscarNoticiasPorIdioma(lang, searchTerm) {
  const hoje = new Date();
  const seteDiasAtras = new Date();
  seteDiasAtras.setDate(hoje.getDate() - 7);

  const fromDate = formatDate(seteDiasAtras);
  const toDate = formatDate(hoje);

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(searchTerm)}&from=${fromDate}&to=${toDate}&lang=${lang}&sortby=publishedAt&token=${API_KEY}`;

  try {
    console.log("🌐 URL chamada:", url);
    const res = await fetch(url);
    const data = await res.json();

    if (data.error || !data.articles || data.articles.length === 0) {
      console.log(`❌ Nenhuma notícia sobre "${searchTerm}" em ${LANGUAGE_NAMES[lang]} encontrada`);
      return null;
    }

    // Retorna a notícia mais recente
    const noticia = data.articles[0];
    return {
      ...noticia,
      translated: false,
      originalLanguage: lang,
      translatedUrl: noticia.url,
      searchTerm: searchTerm
    };

  } catch (error) {
    console.error(`❌ Erro ao buscar notícia em ${lang}:`, error.message);
    return null;
  }
}

async function buscarNoticiaEmQualquerIdioma(searchTerm) {
  console.log(`🔍 Buscando notícias sobre "${searchTerm}" em todos os idiomas...`);
  
  const promises = LANGUAGES.map(lang => buscarNoticiasPorIdioma(lang, searchTerm));
  const resultados = await Promise.allSettled(promises);
  
  for (let i = 0; i < resultados.length; i++) {
    const resultado = resultados[i];
    if (resultado.status === 'fulfilled' && resultado.value) {
      const noticia = resultado.value;
      console.log(`✅ Notícia encontrada em ${LANGUAGE_NAMES[LANGUAGES[i]]}: "${noticia.title.substring(0, 60)}..."`);
      return noticia;
    }
  }
  
  console.log(`❌ Nenhuma notícia sobre "${searchTerm}" encontrada em nenhum idioma`);
  return null;
}

async function processarTraducoes(noticiaOriginal) {
  const noticiasPorIdioma = [[], [], []];
  const idiomaOriginal = noticiaOriginal.originalLanguage;
  
  console.log(`\n📋 Notícia original em ${LANGUAGE_NAMES[idiomaOriginal]}: "${noticiaOriginal.title}"`);

  for (let i = 0; i < LANGUAGES.length; i++) {
    const targetLang = LANGUAGES[i];
    
    if (targetLang === idiomaOriginal) {
      noticiasPorIdioma[i] = [noticiaOriginal];
      console.log(`✅ ${LANGUAGE_NAMES[targetLang]} (original)`);
      continue;
    }

    const noticiaTraduzida = await traduzirNoticia(noticiaOriginal, targetLang, idiomaOriginal);
    
    if (noticiaTraduzida && noticiaTraduzida.title) {
      noticiasPorIdioma[i] = [noticiaTraduzida];
      console.log(`✅ ${LANGUAGE_NAMES[targetLang]} (traduzida)`);
    } else {
      console.log(`⚠️  Usando original para ${LANGUAGE_NAMES[targetLang]} (tradução falhou)`);
      noticiasPorIdioma[i] = [{
        ...noticiaOriginal,
        translated: false,
        originalLanguage: idiomaOriginal
      }];
    }
  }

  return noticiasPorIdioma;
}

function criarJSONNoticias(noticiasPorIdioma) {
  const jsonResultado = {
    titulos: [[], [], []],
    descricoes: [[], [], []],
    links: [[], [], []],
    informacoes_adicionais: {
      tema: SEARCH_TERM,
      data_hora: new Date().toISOString(),
      idioma_original: "",
      idiomas: ["portugues", "ingles", "espanhol"]
    }
  };

  noticiasPorIdioma.forEach((noticias, index) => {
    const noticia = noticias[0] || {};
    
    // ✅ CORREÇÃO: Garantir que seja sempre um array simples
    jsonResultado.titulos[index] = [noticia.title || ""];
    jsonResultado.descricoes[index] = [noticia.description || ""];
    jsonResultado.links[index] = [noticia.translated ? noticia.translatedUrl : noticia.url || ""];
    
    // Extrair apenas o texto se for um array (caso da tradução)
    if (Array.isArray(jsonResultado.titulos[index][0])) {
      jsonResultado.titulos[index] = [jsonResultado.titulos[index][0][0]];
    }
    if (Array.isArray(jsonResultado.descricoes[index][0])) {
      jsonResultado.descricoes[index] = [jsonResultado.descricoes[index][0][0]];
    }
    
    if (!noticia.translated) {
      jsonResultado.informacoes_adicionais.idioma_original = LANGUAGE_NAMES[LANGUAGES[index]].toLowerCase();
      jsonResultado.informacoes_adicionais.indice_idioma_original = index;
    }
  });

  return jsonResultado;
}

async function enviarParaLaravel(jsonNoticias, noticiaOriginal) {
  const apiUrl = LARAVEL_API_URL;
  
  console.log(`📤 Enviando dados para Laravel: ${apiUrl}`);

  // ✅ ADICIONE A VERIFICAÇÃO E CORREÇÃO AQUI
  console.log('🔍 Verificação da estrutura dos arrays:');
  jsonNoticias.titulos.forEach((tituloArray, index) => {
    console.log(`Título ${index}:`, Array.isArray(tituloArray[0]) ? 'Array aninhado' : 'OK');
  });
  jsonNoticias.descricoes.forEach((descArray, index) => {
    console.log(`Descrição ${index}:`, Array.isArray(descArray[0]) ? 'Array aninhado' : 'OK');
  });

  // ✅ CORREÇÃO: Se encontrar arrays aninhados, corrija:
  jsonNoticias.titulos = jsonNoticias.titulos.map(arr => 
    Array.isArray(arr[0]) ? [arr[0][0]] : arr
  );
  jsonNoticias.descricoes = jsonNoticias.descricoes.map(arr => 
    Array.isArray(arr[0]) ? [arr[0][0]] : arr
  );

  // ✅ MOSTRAR CONTEÚDO CORRIGIDO
  console.log('📋 Dados corrigidos sendo enviados:');
  console.log('Titulos:', JSON.stringify(jsonNoticias.titulos, null, 2));
  console.log('Descricoes:', JSON.stringify(jsonNoticias.descricoes, null, 2));
  console.log('Links:', JSON.stringify(jsonNoticias.links, null, 2));
  console.log('Imagem:', noticiaOriginal.image || "default-image.jpg");

  try {
    const response = await axios.post(apiUrl, {
      tituloNoticia: jsonNoticias.titulos,
      descricoes: jsonNoticias.descricoes,
      links: jsonNoticias.links,
      imagem: noticiaOriginal.image || "default-image.jpg"
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    console.log(`📊 Status da resposta: ${response.status}`);
    
    if (response.status !== 200) {
      console.log(`❌ Erro HTTP: ${response.status} - ${response.statusText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('✅ Dados enviados para Laravel com sucesso!');
    console.log('📋 Resposta:', response.data);
    return true;
    
  } catch (error) {
    console.error('❌ Falha completa na conexão com Laravel:');
    
    if (error.response) {
      console.log(`❌ Status: ${error.response.status}`);
      console.log(`❌ Dados: ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      console.log('❌ Erro de rede/timeout:', error.message);
    } else {
      console.log('❌ Erro:', error.message);
    }
    
    return false;
  }
}

async function buscarNoticiasComTraducao(tema) {
  const searchTerm = tema || SEARCH_TERM;
  
  console.log(`\n🌎 Buscando notícias sobre "${searchTerm}" - ${new Date().toLocaleString()}`);

  const noticiaPrincipal = await buscarNoticiaEmQualquerIdioma(searchTerm);
  
  if (!noticiaPrincipal) {
    console.log("❌ Não foi possível encontrar uma notícia em nenhum idioma");
    return null;
  }

  const noticiasPorIdioma = await processarTraducoes(noticiaPrincipal);
  const jsonNoticias = criarJSONNoticias(noticiasPorIdioma);

  // Exibe os resultados no console
  console.log("\n" + "=".repeat(80));
  console.log(`📰 NOTÍCIA SOBRE "${searchTerm.toUpperCase()}"`);
  console.log("=".repeat(80));

  noticiasPorIdioma.forEach((noticias, index) => {
    const idioma = LANGUAGES[index];
    console.log(`\n🗣️  ${LANGUAGE_NAMES[idioma].toUpperCase()}`);
    
    if (noticias.length > 0 && noticias[0].title) {
      const noticia = noticias[0];
      console.log(`📰 ${noticia.title}`);
      console.log(`   📰 Fonte: ${noticia.source?.name || 'Desconhecida'}`);
      
      if (noticia.translated) {
        console.log(`   🔗 Link Traduzido: ${noticia.translatedUrl}`);
        console.log(`   🌐 Status: Traduzida do ${LANGUAGE_NAMES[noticia.originalLanguage]}`);
      } else {
        console.log(`   🔗 Link Original: ${noticia.url}`);
        console.log(`   🌐 Status: Original (${LANGUAGE_NAMES[noticia.originalLanguage]})`);
      }
      
      console.log(`   📅 Data: ${noticia.publishedAt}`);
    } else {
      console.log("   ❌ Não disponível");
    }
  });

  // Exibe o JSON formatado
  console.log("\n" + "🎯".repeat(30));
  console.log("📋 JSON RESULTANTE:");
  console.log("🎯".repeat(30));
  console.log(JSON.stringify(jsonNoticias, null, 2));

  // Envia para o Laravel
  await enviarParaLaravel(jsonNoticias, noticiaPrincipal);

  return jsonNoticias;
}

// ✅ FUNÇÃO PARA MUDAR PARA O PRÓXIMO TEMA AUTOMATICAMENTE
function proximoTema() {
  currentThemeIndex = (currentThemeIndex + 1) % TEMAS_IMIGRACAO.length;
  SEARCH_TERM = TEMAS_IMIGRACAO[currentThemeIndex];
  console.log(`🎯 Tema alterado para: "${SEARCH_TERM}"`);
  return SEARCH_TERM;
}

// Função para mudar o tema manualmente
function mudarTema(novoTema) {
  if (novoTema && novoTema.trim() !== '') {
    SEARCH_TERM = novoTema.trim();
    // Encontra o índice do tema na lista
    const index = TEMAS_IMIGRACAO.findIndex(tema => tema.toLowerCase() === novoTema.toLowerCase());
    if (index !== -1) {
      currentThemeIndex = index;
    }
    console.log(`🎯 Tema alterado para: "${SEARCH_TERM}"`);
    return buscarNoticiasComTraducao(SEARCH_TERM);
  } else {
    console.log("❌ Por favor, forneça um tema válido");
  }
}

// ✅ MOSTRAR LISTA DE TEMAS DISPONÍVEIS
function listarTemas() {
  console.log("\n📋 TEMAS DISPONÍVEIS:");
  TEMAS_IMIGRACAO.forEach((tema, index) => {
    console.log(`${index + 1}. ${tema} ${index === currentThemeIndex ? '← ATUAL' : ''}`);
  });
}

// Agendamento - busca a cada 10 minutos e muda o tema
cron.schedule("*/10 * * * *", async () => {
  console.log("\n" + "🔄".repeat(25));
  console.log(`🕒 Execução agendada - ${new Date().toLocaleString()}`);
  
  // Muda para o próximo tema automaticamente
  const novoTema = proximoTema();
  await buscarNoticiasComTraducao(novoTema);
});

// Inicialização
console.log("✅ Bot de notícias com JSON estruturado iniciado!");
console.log(`🔍 Tema atual: "${SEARCH_TERM}"`);
listarTemas();
console.log("💡 Use mudarTema('seu-tema-aqui') para alterar o tema manualmente");
console.log("💡 Use listarTemas() para ver todos os temas disponíveis");
console.log(`🌐 API Laravel: ${LARAVEL_API_URL}`);
console.log("⏰ Agendamento: A cada 10 minutos (com mudança automática de tema)");

// Busca inicial com delay
setTimeout(() => {
  buscarNoticiasComTraducao(SEARCH_TERM);
}, 2000);

// Exporta as funções
module.exports = { 
  buscarNoticiasComTraducao, 
  mudarTema, 
  listarTemas,
  proximoTema,
  SEARCH_TERM,
  TEMAS_IMIGRACAO 
};