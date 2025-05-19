import React, { useEffect, useState } from 'react';
import './App.css';
import { getFeiras, addFavorito, updateFeira, deleteFeira } from "./services/api";
// ✅ Atualizado
import FeiraCard from './components/FeiraCard';
import FormularioFeira from './components/FormularioFeira';
import { Link } from 'react-router-dom';

const App = () => {
  const [feiras, setFeiras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);

  const fetchFeiras = async () => {
    setLoading(true);
    try {
      const response = await getFeiras();
      setFeiras(response.data);
    } catch (error) {
      console.error("Erro ao buscar feiras:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoritar = async (feiraId) => {
    const feira = feiras.find(f => f.id === feiraId);
    if (feira.favorita) {
      alert("Esta feira já está nos favoritos!");
      return;
    }
    await addFavorito(feiraId); // ← Agora funciona corretamente
    alert('Feira favoritada!');
    fetchFeiras();
  };
  
  const handleRemoverFavorito = async (feiraId) => {
    const updatedFeira = { ...feiras.find(f => f.id === feiraId), favorita: false };
    await updateFeira(feiraId, updatedFeira);
    alert('Feira removida dos favoritos!');
    fetchFeiras();
  };

  const handleDelete = async (id) => {
    await deleteFeira(id);
    fetchFeiras();
  };

  const handleEdit = async (id) => {
    const updatedFeira = {
      nome: 'Feira Editada',
      produtos: ['Produto Editado'],
      horario: '10:00 - 14:00',
    };
    await updateFeira(id, updatedFeira);
    fetchFeiras();
  };

  useEffect(() => {
    fetchFeiras();
  }, []);

  const feirasFiltradas = mostrarFavoritos
    ? feiras.filter(f => f.favorita)
    : feiras;

  return (
    <div className="app-container">
      <h1>Vida Urbana Inteligente - Feira Livre Digital</h1>

      <Link to="/favoritos">Ir para Favoritos</Link>
      
      <FormularioFeira onSubmit={fetchFeiras} />

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setMostrarFavoritos(prev => !prev)}>
          {mostrarFavoritos ? '🔄 Mostrar Todas as Feiras' : '💖 Mostrar Apenas Favoritas'}
        </button>
        <p>Favoritos: {feiras.filter(f => f.favorita).length}</p>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : feirasFiltradas.length === 0 ? (
        <p>{mostrarFavoritos ? 'Nenhuma feira foi favoritada ainda.' : 'Nenhuma feira cadastrada.'}</p>
      ) : (
        <div className="feiras-container">
          {feirasFiltradas.map((feira) => (
            <FeiraCard
              key={feira.id}
              feira={feira}
              onFavoritar={handleFavoritar}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onRemoverFavorito={handleRemoverFavorito}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
