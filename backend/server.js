const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let feiras = [
  { id: 1, nome: "Feira da Liberdade", local: "Praça Japão" },
  { id: 2, nome: "Feira do Centro", local: "Av. Central" }
];

// ✅ GET - Lista todas as feiras
app.get('/feiras', (req, res) => {
  res.json(feiras);
});

// ✅ POST - Cadastra nova feira
app.post('/feiras', (req, res) => {
  const novaFeira = req.body;
  novaFeira.id = Date.now(); // gera ID único
  feiras.push(novaFeira);
  res.status(201).json(novaFeira);
});

// ✅ DELETE - Remove uma feira por ID
app.delete('/feiras/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const feiraIndex = feiras.findIndex(f => f.id === id);
  if (feiraIndex !== -1) {
    const feiraRemovida = feiras.splice(feiraIndex, 1);
    res.json(feiraRemovida[0]);
  } else {
    res.status(404).json({ erro: "Feira não encontrada" });
  }
});

// ✅ PATCH - Atualiza dados de uma feira (parcialmente)
app.patch('/feiras/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const atualizacoes = req.body;
  const feira = feiras.find(f => f.id === id);
  if (feira) {
    Object.assign(feira, atualizacoes); // atualiza apenas os campos enviados
    res.json(feira);
  } else {
    res.status(404).json({ erro: "Feira não encontrada" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
