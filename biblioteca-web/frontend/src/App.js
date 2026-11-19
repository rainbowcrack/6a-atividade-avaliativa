import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import AutorList from './components/AutorList';
import AutorForm from './components/AutorForm';
import LivroList from './components/LivroList';
import LivroForm from './components/LivroForm';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <span className="brand">📚 Biblioteca Web</span>
        <Link to="/autores">Autores</Link>
        <Link to="/livros">Livros</Link>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/livros" replace />} />
          <Route path="/autores" element={<AutorList />} />
          <Route path="/autores/novo" element={<AutorForm />} />
          <Route path="/autores/editar/:id" element={<AutorForm />} />
          <Route path="/livros" element={<LivroList />} />
          <Route path="/livros/novo" element={<LivroForm />} />
          <Route path="/livros/editar/:id" element={<LivroForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
