import React from 'react';
import './FeiraCard.css';

const FeiraCard = ({ feira, onFavoritar, onDelete, onEdit, onRemoverFavorito }) => {
  const isFavorita = feira.favorita;

  return (
    <div className="feira-card">
      <h3>{feira.nome}</h3>
      <p><strong>Produtos:</strong> {feira.produtos.join(', ')}</p>
      <p><strong>Horário:</strong> {feira.horario}</p>

      {/* Indicador visual de favorito */}
      {isFavorita && <span className="favorito-badge">★ Favorita</span>}

      <div className="botoes">
        {onFavoritar && !isFavorita && (
          <button onClick={() => onFavoritar(feira.id)}>Favoritar</button>
        )}

        {onRemoverFavorito && isFavorita && (
          <button onClick={() => onRemoverFavorito(feira.id)}>Remover dos Favoritos</button>
        )}

        {onEdit && <button onClick={() => onEdit(feira.id)}>Editar</button>}
        {onDelete && <button onClick={() => onDelete(feira.id)}>Excluir</button>}
      </div>
    </div>
  );
};

export default FeiraCard;
