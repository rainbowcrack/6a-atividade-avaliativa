import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { autorService } from '../services/api';

function AutorList() {
  const [autores, setAutores] = useState([]);
  const [erro, setErro] = useState('');

  const carregar = () => {
    autorService.listar()
      .then((res) => setAutores(res.data))
      .catch(() => setErro('Erro ao carregar autores.'));
  };

  useEffect(carregar, []);

  const excluir = (id) => {
    if (!window.confirm('Excluir este autor?')) return;
    autorService.deletar(id)
      .then(() => { setErro(''); carregar(); })
      .catch((e) => setErro(e.response?.data?.erro || 'Erro ao excluir. O autor pode ter livros vinculados.'));
  };

  return (
    <div>
      <h2>Autores</h2>
      <Link className="btn" to="/autores/novo">+ Novo autor</Link>
      {erro && <p className="erro">{erro}</p>}
      <table>
        <thead>
          <tr><th>Nome</th><th>Nacionalidade</th><th>Nascimento</th><th>Ações</th></tr>
        </thead>
        <tbody>
          {autores.map((a) => (
            <tr key={a.id}>
              <td>{a.nome}</td>
              <td>{a.nacionalidade}</td>
              <td>{a.dataNascimento}</td>
              <td>
                <Link className="btn secondary" to={`/autores/editar/${a.id}`}>Editar</Link>{' '}
                <button className="danger" onClick={() => excluir(a.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AutorList;
