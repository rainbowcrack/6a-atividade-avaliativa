import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
});

export const autorService = {
  listar: () => api.get('/autores'),
  buscar: (id) => api.get(`/autores/${id}`),
  criar: (autor) => api.post('/autores', autor),
  atualizar: (id, autor) => api.put(`/autores/${id}`, autor),
  deletar: (id) => api.delete(`/autores/${id}`),
};

// SERVICES

export default api;
