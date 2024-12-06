const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexão com MongoDB
mongoose.connect('mongodb://localhost:27017/cambiosDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB', err);
  });

// Definição do modelo de dados
const Cambio = mongoose.model('Cambio', {
  nome: String,
  modelo: String,
  preco: Number,
  foto: String, // Adicionado campo de foto
  data: String, // Adicionado campo de data
});

// Rota para inserir dados no banco de dados
app.post('/adicionar', (req, res) => {
  const novoCambio = new Cambio(req.body);
  novoCambio.save()
    .then(() => res.status(201).send('Câmbio adicionado com sucesso!'))
    .catch((err) => res.status(500).send('Erro ao salvar câmbio: ' + err));
});

// Rota para pegar todos os câmbios cadastrados
app.get('/cambios', (req, res) => {
  Cambio.find()
    .then((cambios) => res.status(200).json(cambios))
    .catch((err) => res.status(500).send('Erro ao obter câmbios: ' + err));
});

// Rota para filtrar câmbios
app.get('/cambios/filtrar', (req, res) => {
  const { nome, modelo, data } = req.query;
  let filter = {};
  
  if (nome) filter.nome = nome;
  if (modelo) filter.modelo = modelo;
  if (data) filter.data = data;
  
  Cambio.find(filter)
    .then((cambios) => res.status(200).json(cambios))
    .catch((err) => res.status(500).send('Erro ao filtrar câmbios: ' + err));
});

// Rota para excluir câmbio por ID
app.delete('/cambios/:id', (req, res) => {
  const { id } = req.params;
  Cambio.findByIdAndDelete(id)
    .then(() => res.status(200).send('Câmbio excluído com sucesso!'))
    .catch((err) => res.status(500).send('Erro ao excluir câmbio: ' + err));
});

// Porta do servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
