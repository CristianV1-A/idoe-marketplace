
const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/users.js'); // Importa as rotas de usuário
const anunciosRoutes = require('./routes/anuncios.js'); // Importa as rotas de anúncios

const app = express();

const PORT = 5000;

app.use(cors()); 
app.use(express.json()); 
app.use('/api/users', usersRoutes); // Registra as rotas de usuário
app.use('/api/anuncios', anunciosRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API do iDoe está funcionando!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}. Acesse http://localhost:${PORT}`);
});