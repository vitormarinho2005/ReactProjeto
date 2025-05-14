import React, { useState } from 'react';
import './FormularioFeira.css';

const FormularioFeira = ({ onSubmit, onRemove }) => {
  const [nome, setNome] = useState('');
  const [produtos, setProdutos] = useState('');
  const [horario, setHorario] = useState('');
  const [feiraRemovida, setFeiraRemovida] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaFeira = { nome, produtos: produtos.split(','), horario };
    onSubmit(novaFeira);  // Envia a feira para ser cadastrada
    setNome('');
    setProdutos('');
    setHorario('');
    setFeiraRemovida(null);  // Reseta a feira removida após cadastro
  };

  const handleRemove = () => {
    onRemove(feiraRemovida);  // Chama a função de remoção
    setFeiraRemovida(null);  // Reseta após remoção
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
      
      {feiraRemovida && (
        <div className="remove-feira">
          <button type="button" onClick={handleRemove}>Remover Feira</button>
        </div>
      )}
    </form>
  );
};

export default FormularioFeira;
