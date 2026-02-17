import React, { createContext, useContext, useMemo } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export const API_URL = "http://SeuIp:8000";
export const API_URL_WEB = "http://SeuIp:8003";


axios.defaults.timeout = 8000; 
axios.defaults.maxContentLength = 50 * 1024 * 1024;
axios.defaults.validateStatus = (status) => status >= 200 && status < 500;

const ApiContext = createContext();

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi deve ser usado dentro de ApiProvider');
  }
  return context;
};

export const ApiProvider = ({ children }) => {
  const testarAPI = useMemo(() => ({

    diagnosticarRede: async () => {
      try {
        console.log('🔍 Diagnóstico rápido de rede...');
        const state = await NetInfo.fetch();
        console.log('Estado da rede:', state);
        Alert.alert(
          'Diagnóstico de Rede',
          `Conectado: ${state.isConnected ? '✅' : '❌'}\nTipo: ${state.type}\nVelocidade: ${state.details?.isConnectionExpensive ? 'Lenta' : 'Rápida'}`
        );
      } catch (error) {
        console.log('❌ Erro no diagnóstico:', error);
      }
    },

    // Teste de conexão rápido
    testarConexao: async () => {
      try {
        console.log('📡 Testando conexão rápida...');
        const startTime = Date.now();
        const response = await fetch(API_URL, { method: 'HEAD' });
        const responseTime = Date.now() - startTime;

        console.log('✅ Conexão OK - Tempo:', responseTime + 'ms');
        Alert.alert('✅ Conexão Rápida', `Tempo: ${responseTime}ms`);
        return responseTime;
      } catch (error) {
        console.log('❌ Falha na Conexão:', error);
        Alert.alert('❌ Sem Conexão', 'Verifique se o servidor está rodando');
        throw error;
      }
    },

    selectInfo: async () => {
      try {
        console.log('📋 Buscando informações gerais (rápido)');
        const info = await axios.get(API_URL + '/api/Registro');
        return info.data;
      } catch (erro) {
        console.error('❌ Erro ao buscar informações:', erro);
        throw erro;
      }
    },

    salvarConta: async (nome, email, dataNasc, telefone, paisOrigem, senha) => {
      try {
        console.log('💾 Salvando conta rapidamente...');

        const resposta = await axios.post(API_URL + '/api/Registro', {
          nomeUsers: nome,
          emailUsers: email,
          dataNasciUsers: dataNasc,
          paisOrigemUsers: paisOrigem,
          telefoneUsers: telefone,
          senhaUsers: senha,
        });

        console.log('✅ Conta salva com sucesso');
        return resposta.data;
      } catch (error) {
        console.log('❌ Erro ao salvar conta:', error);

        let mensagemErro = 'Erro desconhecido';
        if (error.code === 'ECONNABORTED') {
          mensagemErro = 'Timeout - Servidor não respondeu';
        } else if (error.response) {
          mensagemErro = `Erro ${error.response.status}`;
        } else if (error.request) {
          mensagemErro = 'Sem resposta do servidor';
        } else {
          mensagemErro = error.message;
        }

        Alert.alert('❌ Erro na Conexão', mensagemErro);
        throw error;
      }
    },

    atualizarPerfil: async (id, nome, email, telefone) => {
      try {
        const url = `${API_URL}/api/atualizarP/${id}`;
        const response = await axios.put(url, {
          nomeUsers: nome,
          emailUsers: email,
          telefoneUsers: telefone
        });
        return response.data;
      } catch (error) {
        console.log("Erro ao atualizar perfil:", error);
        throw error;
      }
    },

    listarTransacao: async (id) => {
      try {
        console.log('📋 Listando transação rapidamente...');
        const resposta = await axios.get(`${API_URL}/api/transacoes/${id}`);
        return resposta.data;
      } catch (error) {
        console.error("❌ Erro ao listar transação:", error);
        throw error;
      }
    },

    carregarDadosUsuario: async (id) => {
      try {
        if (!id) return null;
        const response = await axios.get(`${API_URL}/api/Registro/${id}`);
        return response.data;
      } catch (error) {
        console.log("Erro ao carregar dados:", error.response?.data || error.message);
        throw error;
      }
    },

    atualizarConta: async (email, senhaAtual, novosDados) => {
      try {
        const resposta = await axios.put(
          `${API_URL}/api/Registro/${email}/${senhaAtual}`,
          novosDados
        );
        Alert.alert('✅ Sucesso!', 'Dados atualizados com sucesso!');
        return resposta.data;
      } catch (error) {
        Alert.alert('❌ Erro', error.response?.data?.message || error.message);
        throw error;
      }
    },

    verificarConta: async (email, senha) => {
      try {
        const resposta = await axios.post(`${API_URL}/api/Verificar/${email}/${senha}`);
        return resposta;
      } catch (erro) {
        console.error(erro);
        throw erro;
      }
    },

    escomungar: async (id) => {
      try {
        await axios.delete(`${API_URL}/api/Destruir/${id}`);
      } catch (erro) {
        console.error(erro);
        throw erro;
      }
    },

    atualizarDocumentos: async (idUsers, documentos) => {
      try {
        const resposta = await axios.put(`${API_URL}/api/Registro/${idUsers}/documentos`, {
          condicaoUsers: documentos.condicaoUsers || "",
          cpfUsers: documentos.cpfUsers || "",
          crmRneUsers: documentos.crmRneUsers || "",
          mercosulUsers: documentos.mercosulUsers || "",
          passaporteUsers: documentos.passaporteUsers || "",
        });
        console.log(resposta.data);
        Alert.alert('✅ Sucesso!', 'Conta criada com sucesso!');
        return resposta.data;
      } catch (error) {
        console.error('❌ Erro ao atualizar documentos:', error);
        throw error;
      }
    },

    atualizarEndereco: async (idUsers, enderecoData) => {
      try {
        const dataToSend = {};
        if (enderecoData.lograUsers) dataToSend.lograUsers = enderecoData.lograUsers;
        if (enderecoData.numeroUsers) dataToSend.numeroUsers = enderecoData.numeroUsers;
        if (enderecoData.cepUsers) dataToSend.cepUsers = enderecoData.cepUsers;
        if (enderecoData.bairroUsers) dataToSend.bairroUsers = enderecoData.bairroUsers;
        if (enderecoData.cidadeUsers) dataToSend.cidadeUsers = enderecoData.cidadeUsers;
        if (enderecoData.estadoUsers) dataToSend.estadoUsers = enderecoData.estadoUsers;

        const resposta = await axios.put(`${API_URL}/api/Registro/${idUsers}/endereco`, dataToSend);
        return resposta.data;
      } catch (error) {
        console.error('❌ Erro ao atualizar endereço:', error);
        throw error;
      }
    },

    verificarEmail: async (nome, email) => {
      try {
        const resposta = await axios.post(`${API_URL}/api/CodigoV`, {
          nomeUsers: nome,
          emailUsers: email
        });
        return resposta.data.codigo;
      } catch (erro) {
        console.error(erro);
        throw erro;
      }
    },

    atualizarSenha: async (id, senha) => {
      try {
        const resposta = await axios.put(`${API_URL}/api/atualizarSenha/${id}`, {
          senha: senha
        });
        return resposta.data;
      } catch (erro) {
        console.error("❌ Erro ao atualizar senha:", erro);
        throw erro;
      }
    },

    carregarNoticias: async () => {
      try {
        const response = await axios.get(`${API_URL}/api/Noticia`);
        return response.data;
      } catch (error) {
        console.log("Erro ao carregar notícias:", error);
        throw error;
      }
    },

  }), []);

  return (
    <ApiContext.Provider value={testarAPI}>
      {children}
    </ApiContext.Provider>
  );
};