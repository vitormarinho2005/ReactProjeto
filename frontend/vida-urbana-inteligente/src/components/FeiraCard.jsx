import React, { useState } from 'react';
import './FeiraCard.css';
import { toggleFavorito, deleteFeira, updateFeira } from '../services/api';

const FeiraCard = ({ feira, onAtualizar }) => {
  const [editando, setEditando] = useState(false);
  const [produtosEdit, setProdutosEdit] = useState(feira.produtos.join(', '));
  const [horarioEdit, setHorarioEdit] = useState(feira.horario);
  const [mensagem, setMensagem] = useState('');

  const handleToggleFavorito = async () => {
    try {
      await toggleFavorito(feira.id, feira.favorita);
      setMensagem(feira.favorita ? 'Removido dos favoritos' : 'Adicionado aos favoritos');
      onAtualizar();
      setTimeout(() => setMensagem(''), 2000);
    } catch (error) {
      console.error('Erro ao alternar favorito:', error);
      setMensagem('Erro ao atualizar favorito');
      setTimeout(() => setMensagem(''), 2000);
    }
  };

  const handleExcluir = async () => {
    if (window.confirm('Tem certeza que deseja excluir esta feira?')) {
      try {
        await deleteFeira(feira.id);
        onAtualizar();
      } catch (error) {
        console.error('Erro ao excluir feira:', error);
      }
    }
  };

  const handleSalvar = async () => {
    try {
      const produtosArray = produtosEdit.split(',').map(p => p.trim()).filter(p => p !== '');
      await updateFeira(feira.id, { produtos: produtosArray, horario: horarioEdit });
      setMensagem('Feira atualizada com sucesso!');
      setEditando(false);
      onAtualizar();
      setTimeout(() => setMensagem(''), 2000);
    } catch (error) {
      console.error('Erro ao atualizar feira:', error);
      setMensagem('Erro ao salvar alterações');
      setTimeout(() => setMensagem(''), 2000);
    }
  };

  const handleCancelar = () => {
    setProdutosEdit(feira.produtos.join(', '));
    setHorarioEdit(feira.horario);
    setEditando(false);
    setMensagem('');
  };

  return (
    <div className="feira-card">
      <h2 className="feira-nome">{feira.nome}</h2>

      {editando ? (
        <>
          <label className="input-label">
            Produtos:
            <input
              type="text"
              value={produtosEdit}
              onChange={(e) => setProdutosEdit(e.target.value)}
              placeholder="Digite os produtos separados por vírgula"
              className="input-edicao"
            />
          </label>
          <label className="input-label">
            Horário:
            <input
              type="text"
              value={horarioEdit}
              onChange={(e) => setHorarioEdit(e.target.value)}
              placeholder="Ex: 07:00 às 12:00"
              className="input-edicao"
            />
          </label>
        </>
      ) : (
        <>
          <p><strong>Produtos:</strong> {feira.produtos.join(', ')}</p>
          <p><strong>Horário:</strong> {feira.horario}</p>
        </>
      )}

      <div className="botoes">
        {editando ? (
          <>
            <button className="button salvar" onClick={handleSalvar}>
              Salvar
            </button>
            <button className="button cancelar" onClick={handleCancelar}>
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button className="button editar" onClick={() => setEditando(true)}>
              Editar
            </button>
            <button className={`button favorito ${feira.favorita ? 'ativo' : ''}`} onClick={handleToggleFavorito}>
              {feira.favorita ? 'Desfavoritar' : 'Favoritar'}
            </button>
            <button className="button excluir" onClick={handleExcluir}>
              Excluir
            </button>
          </>
        )}
      </div>

      {mensagem && <p className="mensagem-feedback">{mensagem}</p>}
    </div>
  );
};

export default FeiraCard;
