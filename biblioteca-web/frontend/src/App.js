import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import AutorList from './components/AutorList';
import AutorForm from './components/AutorForm';
// IMPORTS

function App() {
  return (
    <BrowserRouter>
      <nav>
        <span className="brand">📚 Biblioteca Web</span>
        <Link to="/autores">Autores</Link>
        {/* LINKS */}
      </nav>
      <div className="container">
        <Routes>
          <Route path="/autores" element={<AutorList />} />
          <Route path="/autores/novo" element={<AutorForm />} />
          <Route path="/autores/editar/:id" element={<AutorForm />} />
          {/* ROTAS */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
