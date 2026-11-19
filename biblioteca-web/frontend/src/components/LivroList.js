import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { livroService } from '../services/api';

function LivroList() {
  const [livros, setLivros] = useState([]);
  const [erro, setErro] = useState('');

  const carregar = () => {
    livroService.listar()
      .then((res) => setLivros(res.data))
      .catch(() => setErro('Erro ao carregar livros.'));
  };

  useEffect(carregar, []);

  const excluir = (id) => {
    if (!window.confirm('Excluir este livro?')) return;
    livroService.deletar(id)
      .then(() => { setErro(''); carregar(); })
      .catch(() => setErro('Erro ao excluir livro.'));
  };

  return (
    <div>
      <h2>Livros</h2>
      <Link className="btn" to="/livros/novo">+ Novo livro</Link>
      {erro && <p className="erro">{erro}</p>}
      <table>
        <thead>
          <tr><th>Título</th><th>Autor</th><th>Ano</th><th>Gênero</th><th>ISBN</th><th>Ações</th></tr>
        </thead>
        <tbody>
          {livros.map((l) => (
            <tr key={l.id}>
              <td>{l.titulo}</td>
              <td>{l.autor ? l.autor.nome : '-'}</td>
              <td>{l.anoPublicacao}</td>
              <td>{l.genero}</td>
              <td>{l.isbn}</td>
              <td>
                <Link className="btn secondary" to={`/livros/editar/${l.id}`}>Editar</Link>{' '}
                <button className="danger" onClick={() => excluir(l.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LivroList;
