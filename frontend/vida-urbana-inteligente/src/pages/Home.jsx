import React, { useState, useEffect } from 'react';
import { getFeiras, createFeira } from '../services/api';
import FeiraCard from '../components/FeiraCard';
import './Home.css';

const Home = () => {
    const [feiras, setFeiras] = useState([]);
    const [nome, setNome] = useState('');
    const [produtos, setProdutos] = useState('');
    const [horario, setHorario] = useState('');
    const [mostrarFavoritas, setMostrarFavoritas] = useState(false);
    const [loading, setLoading] = useState(true);

    // Buscar feiras da API
    const carregarFeiras = async () => {
        setLoading(true);
        const response = await getFeiras();
        setFeiras(response.data);
        setLoading(false);
    };

    useEffect(() => {
        carregarFeiras();
    }, []);

    // Adicionar nova feira
    const handleAdicionarFeira = async (e) => {
        e.preventDefault();
        if (!nome.trim() || !produtos.trim() || !horario.trim()) {
            alert('Preencha todos os campos!');
            return;
        }
        const novaFeira = {
            nome,
            produtos: produtos.split(',').map(p => p.trim()),
            horario,
            favorita: false,
        };

        await createFeira(novaFeira);
        setNome('');
        setProdutos('');
        setHorario('');
        carregarFeiras();
    };

    // Filtra feiras favoritas se selecionado
    const feirasFiltradas = mostrarFavoritas
        ? feiras.filter(f => f.favorita)
        : feiras;

    return (
        <div className="home-container">
            <h1>Vida Urbana Inteligente - Feira Livre Digital</h1>

            <form onSubmit={handleAdicionarFeira} className="form-cadastro">
                <label>
                    Nome da Feira:
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Nome da Feira"
                    />
                </label>

                <label>
                    Produtos (separados por vírgula):
                    <input
                        type="text"
                        value={produtos}
                        onChange={(e) => setProdutos(e.target.value)}
                        placeholder="Ex: frutas, legumes, artesanato"
                    />
                </label>

                <label>
                    Horário:
                    <input
                        type="text"
                        value={horario}
                        onChange={(e) => setHorario(e.target.value)}
                        placeholder="Ex: 07:00 às 12:00"
                    />
                </label>

                <button type="submit" className="btn-adicionar">
                    Adicionar Feira
                </button>
            </form>

            <div className="filtro-favoritas">
                <label>
                    <input
                        type="checkbox"
                        checked={mostrarFavoritas}
                        onChange={() => setMostrarFavoritas(!mostrarFavoritas)}
                    />
                    Mostrar Apenas Favoritas
                </label>
            </div>

            {loading ? (
                <p>Carregando feiras...</p>
            ) : feirasFiltradas.length === 0 ? (
                <p>Nenhuma feira encontrada.</p>
            ) : (
                <div className="lista-feiras">
                    {feirasFiltradas.map((feira) => (
                        // Passa a função onAtualizar para o componente FeiraCard
                        <FeiraCard
                            key={feira.id}
                            feira={feira}
                            onAtualizar={carregarFeiras}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
