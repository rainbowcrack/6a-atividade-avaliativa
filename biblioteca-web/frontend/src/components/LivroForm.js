import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { autorService, livroService } from '../services/api';

function LivroForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [autores, setAutores] = useState([]);
  const [livro, setLivro] = useState({ titulo: '', isbn: '', anoPublicacao: '', genero: '', autorId: '' });
  const [erro, setErro] = useState('');

  useEffect(() => {
    autorService.listar()
      .then((res) => setAutores(res.data))
      .catch(() => setErro('Erro ao carregar autores.'));
    if (id) {
      livroService.buscar(id)
        .then((res) => setLivro({
          titulo: res.data.titulo || '',
          isbn: res.data.isbn || '',
          anoPublicacao: res.data.anoPublicacao ?? '',
          genero: res.data.genero || '',
          autorId: res.data.autor ? res.data.autor.id : '',
        }))
        .catch(() => setErro('Livro não encontrado.'));
    }
  }, [id]);

  const alterar = (e) => setLivro({ ...livro, [e.target.name]: e.target.value });

  const salvar = (e) => {
    e.preventDefault();
    if (!livro.autorId) {
      setErro('Selecione um autor.');
      return;
    }
    const dados = {
      titulo: livro.titulo,
      isbn: livro.isbn || null,
      anoPublicacao: livro.anoPublicacao === '' ? null : Number(livro.anoPublicacao),
      genero: livro.genero || null,
      autor: { id: Number(livro.autorId) }, // só o id, como contato no compromisso
    };
    const req = id ? livroService.atualizar(id, dados) : livroService.criar(dados);
    req.then(() => navigate('/livros'))
       .catch(() => setErro('Erro ao salvar. Verifique os campos.'));
  };

  return (
    <div>
      <h2>{id ? 'Editar livro' : 'Novo livro'}</h2>
      <form onSubmit={salvar}>
        <label>Título *
          <input name="titulo" value={livro.titulo} onChange={alterar} maxLength={200} required />
        </label>
        <label>ISBN
          <input name="isbn" value={livro.isbn} onChange={alterar} maxLength={20} />
        </label>
        <label>Ano de publicação
          <input type="number" name="anoPublicacao" value={livro.anoPublicacao} onChange={alterar} />
        </label>
        <label>Gênero
          <input name="genero" value={livro.genero} onChange={alterar} maxLength={50} />
        </label>
        <label>Autor *
          <select name="autorId" value={livro.autorId} onChange={alterar} required>
            <option value="">Selecione...</option>
            {autores.map((a) => (
              <option key={a.id} value={a.id}>{a.nome}</option>
            ))}
          </select>
        </label>
        {erro && <p className="erro">{erro}</p>}
        <div className="actions">
          <button type="submit">Salvar</button>
          <button type="button" className="secondary" onClick={() => navigate('/livros')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default LivroForm;
