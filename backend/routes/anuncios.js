// backend/routes/anuncios.js
const express = require('express');
const router = express.Router();
const db = require('../db-config.js');

// 2. Transformamos a função em 'async' para poder usar 'await'
router.get('/', async (req, res) => {
  try {
    // 3. Usamos o Knex para buscar na tabela 'announcements'.
    // 'db('announcements')' é o mesmo que 'SELECT * FROM announcements' em SQL.
    const anuncios = await db('announcements');
    res.status(200).json(anuncios); // Retorna os anúncios do banco
  } catch (error) {
    // 4. Se algo der errado na consulta ao banco, retornamos um erro 500.
    res.status(500).json({ message: 'Erro ao buscar anúncios.', error: error.message });
  }
});

module.exports = router;