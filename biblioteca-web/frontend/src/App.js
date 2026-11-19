import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import LivroList from './components/LivroList';
import LivroForm from './components/LivroForm';
// IMPORTS

function App() {
  return (
    <BrowserRouter>
      <nav>
        <span className="brand">📚 Biblioteca Web</span>
        <Link to="/livros">Livros</Link>
        {/* LINKS */}
      </nav>
      <div className="container">
        <Routes>
          <Route path="/livros" element={<LivroList />} />
          <Route path="/livros/novo" element={<LivroForm />} />
          <Route path="/livros/editar/:id" element={<LivroForm />} />
          {/* ROTAS */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
