// backend/server.js

// 1. Importando os pacotes que instalamos
const express = require('express');
const cors = require('cors');

// 2. Inicializando o Express
// A variável 'app' será o nosso objeto principal para configurar o servidor
const app = express();

// 3. Definindo a porta em que o servidor vai rodar
// Usamos 5000 para não conflitar com o React que geralmente usa a 3000
const PORT = 5000;

// 4. Configurando os "Middlewares"
// Middlewares são funções que rodam a cada requisição feita ao servidor.
app.use(cors()); // Habilita o CORS para que nosso frontend possa fazer requisições
app.use(express.json()); // Habilita o servidor a entender requisições com corpo em formato JSON
// Importando as rotas de anúncios
const anunciosRoutes = require('./routes/anuncios');
// Registrando as rotas de anúncios com o prefixo '/api/anuncios'
app.use('/api/anuncios', anunciosRoutes);
// 5. Criando uma rota de teste (ou "Health Check")
// Quando alguém acessar a rota principal (GET '/') do nosso backend,
// enviaremos uma resposta em JSON confirmando que está tudo funcionando.
app.get('/', (req, res) => {
  res.json({ message: 'API do iDoe está funcionando!' });
});

// 6. Iniciando o servidor
// O método '.listen' "liga" o nosso servidor e o faz ficar escutando
// por novas requisições na porta que definimos.
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}. Acesse http://localhost:${PORT}`);
});