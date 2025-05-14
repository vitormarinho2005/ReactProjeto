// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/feiras';

export const getFeiras = () => axios.get(API_URL);

export const addFeira = (feira) => axios.post(API_URL, feira);

export const updateFeira = (id, feiraAtualizada) =>
  axios.patch(`${API_URL}/${id}`, feiraAtualizada);

export const deleteFeira = (id) => axios.delete(`${API_URL}/${id}`);

export const addFavorito = async (id) => {
  const feira = await axios.get(`${API_URL}/${id}`);
  const atualizada = { ...feira.data, favorita: true };
  return axios.patch(`${API_URL}/${id}`, atualizada);
};
