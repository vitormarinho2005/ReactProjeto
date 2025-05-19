import React, { useEffect, useState } from 'react';
import './Favoritos.css';
import { getFeiras } from '../services/api';
import FeiraCard from '../components/FeiraCard';

const Favoritos = () => {
  const [feiras, setFeiras] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carrega apenas as feiras favoritas
  const fetchFeirasFavoritas = async () => {
    setLoading(true);
    try {
      const response = await getFeiras();
      const favoritas = response.data.filter((feira) => feira.favorita);
      setFeiras(favoritas);
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    }
    setLoading(false);
  };

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
            <FeiraCard feira={feira} onAtualizar={fetchFeirasFavoritas} onEditar={() => {}} />
          </div>
        ))
      )}
    </div>
  );
};

export default Favoritos;
