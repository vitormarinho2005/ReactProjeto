import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const getFeiras = () => axios.get(`${BASE_URL}/feiras`);

export const createFeira = (feira) => axios.post(`${BASE_URL}/feiras`, feira);

export const updateFeira = (id, dadosAtualizados) =>
  axios.patch(`${BASE_URL}/feiras/${id}`, dadosAtualizados);

export const deleteFeira = (id) =>
  axios.delete(`${BASE_URL}/feiras/${id}`);

// ✅ Corrigido: favoritar = PATCH com { favorita: true }
export const addFavorito = (id) =>
  axios.patch(`${BASE_URL}/feiras/${id}`, { favorita: true });
