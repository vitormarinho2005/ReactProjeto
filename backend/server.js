const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());
app.use(bodyParser.json());

// Funções utilitárias para ler e escrever o arquivo JSON
const lerDados = () => {
  const raw = fs.readFileSync(DB_PATH);
  return JSON.parse(raw);
};

const salvarDados = (dados) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(dados, null, 2));
};

// Carrega os dados do arquivo JSON ao iniciar
let { feiras } = lerDados();

// GET - Lista todas as feiras
app.get('/feiras', (req, res) => {
  res.json(feiras);
});

// POST - Cadastra nova feira
app.post('/feiras', (req, res) => {
  const novaFeira = {
    id: Date.now(),
    nome: req.body.nome || "Feira sem nome",
    produtos: req.body.produtos || [],
    horario: req.body.horario || "Horário não definido",
    favorita: req.body.favorita || false
  };
  feiras.push(novaFeira);
  salvarDados({ feiras });
  res.status(201).json(novaFeira);
});

// DELETE - Remove feira
app.delete('/feiras/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = feiras.findIndex(f => f.id === id);
  if (index !== -1) {
    const feiraRemovida = feiras.splice(index, 1);
    salvarDados({ feiras });
    res.json(feiraRemovida[0]);
  } else {
    res.status(404).json({ erro: "Feira não encontrada" });
  }
});

// PATCH - Atualiza parcialmente
app.patch('/feiras/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const feira = feiras.find(f => f.id === id);
  if (feira) {
    Object.assign(feira, req.body);
    salvarDados({ feiras });
    res.json(feira);
  } else {
    res.status(404).json({ erro: "Feira não encontrada" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
