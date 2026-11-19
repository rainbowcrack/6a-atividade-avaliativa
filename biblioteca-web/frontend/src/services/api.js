import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
});

export const livroService = {
  listar: () => api.get('/livros'),
  buscar: (id) => api.get(`/livros/${id}`),
  criar: (livro) => api.post('/livros', livro),
  atualizar: (id, livro) => api.put(`/livros/${id}`, livro),
  deletar: (id) => api.delete(`/livros/${id}`),
  listarPorAutor: (autorId) => api.get(`/livros/autor/${autorId}`),
};

// SERVICES

export default api;
