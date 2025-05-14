import React, { useEffect, useState } from 'react';
import { buscarFeiras } from '../services/api';
import './ListaFeiras.css'; // ✅ Importação do CSS

const ListaFeiras = () => {
  const [feiras, setFeiras] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      const dados = await buscarFeiras();
      setFeiras(dados);
      setCarregando(false);
    }
    carregar();
  }, []);

  if (carregando) return <p>Carregando feiras...</p>;

  return (
    <div className="lista-feiras">
      <h2>Feiras Cadastradas</h2>
      <ul>
        {feiras.map((feira) => (
          <li key={feira.id}>
            <strong>{feira.nome}</strong> – {feira.horario} <br />
            Produtos: {feira.produtos.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaFeiras;
