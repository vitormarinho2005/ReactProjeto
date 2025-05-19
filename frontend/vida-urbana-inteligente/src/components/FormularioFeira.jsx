import React, { useState } from 'react';
import './FormularioFeira.css';
import { createFeira } from '../services/api'; // ✅ Corrigido

const FormularioFeira = ({ onSubmit }) => {
  const [nome, setNome] = useState('');
  const [produtos, setProdutos] = useState('');
  const [horario, setHorario] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaFeira = {
      nome,
      produtos: produtos.split(',').map(p => p.trim()), // remove espaços
      horario,
      favorita: false // garante o campo favorita como false inicialmente
    };

    try {
      await createFeira(novaFeira);
      onSubmit(); // Recarrega a lista
      setNome('');
      setProdutos('');
      setHorario('');
    } catch (error) {
      console.error('Erro ao adicionar feira:', error);
    }
  };

  return (
    <form className="formulario-feira" onSubmit={handleSubmit}>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome da feira"
        required
      />
      <input
        type="text"
        value={produtos}
        onChange={(e) => setProdutos(e.target.value)}
        placeholder="Produtos (separados por vírgula)"
        required
      />
      <input
        type="text"
        value={horario}
        onChange={(e) => setHorario(e.target.value)}
        placeholder="Horário"
        required
      />
      <button type="submit">Adicionar Feira</button>
    </form>
  );
};

export default FormularioFeira;
