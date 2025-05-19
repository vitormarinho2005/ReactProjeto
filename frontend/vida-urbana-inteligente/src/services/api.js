import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

// Obter todas as feiras
export const getFeiras = () => axios.get(`${BASE_URL}/feiras`);

// Criar nova feira
export const createFeira = (feira) =>
  axios.post(`${BASE_URL}/feiras`, feira);

// Atualizar feira (usado para editar nome, produtos, etc.)
export const updateFeira = (id, dadosAtualizados) =>
  axios.patch(`${BASE_URL}/feiras/${id}`, dadosAtualizados);

// Excluir feira
export const deleteFeira = (id) =>
  axios.delete(`${BASE_URL}/feiras/${id}`);

// Alternar favorito (favoritar ou desfavoritar)
export const toggleFavorito = (id, favoritaAtual) =>
  axios.patch(`${BASE_URL}/feiras/${id}`, { favorita: !favoritaAtual });
