import React, { useEffect, useState } from 'react';
import './Favoritos.css'; // Importando os estilos
import { getFeiras, addFavorito, deleteFeira } from '../services/api'; // Funções para interagir com a API
import FeiraCard from '../components/FeiraCard'; // Card para exibir as feiras

const Favoritos = () => {
  const [feiras, setFeiras] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para carregar as feiras favoritas
  const fetchFeirasFavoritas = async () => {
    setLoading(true);
    const response = await getFeiras();
    const feirasFavoritas = response.data.filter(feira => feira.favorita); // Filtra feiras favoritas
    setFeiras(feirasFavoritas);
    setLoading(false);
  };

  // Função para remover uma feira dos favoritos
  const handleRemoverFavorito = async (id) => {
    await addFavorito(id); // Reverte o estado da feira para não favorita
    fetchFeirasFavoritas(); // Recarrega as feiras favoritas
  };

  // Carrega as feiras favoritas ao montar o componente
  useEffect(() => {
    fetchFeirasFavoritas();
  }, []);

  return (
    <div className="favoritos-container">
      <h1>Feiras Favoritas</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : feiras.length === 0 ? (
        <p className="favoritos-empty">Você ainda não tem feiras favoritas!</p>
      ) : (
        feiras.map((feira) => (
          <div key={feira.id} className="favoritos-card">
            <FeiraCard feira={feira} />
            <button
              className="button"
              onClick={() => handleRemoverFavorito(feira.id)}
            >
              Remover dos Favoritos
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Favoritos;

