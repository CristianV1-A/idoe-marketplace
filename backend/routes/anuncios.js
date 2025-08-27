// backend/routes/anuncios.js
const authenticate = require('../middleware/authenticate');
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

router.get('/:id', async (req, res) => {
  const { id } = req.params; // Pega o ID da URL
   try {
    // Usamos .first() porque esperamos apenas um resultado
    const anuncio = await db('announcements as a')
      .join('users as u', 'a.user_id', 'u.id') // "Junta" a tabela de usuários
      .select(
        'a.id',
        'a.title',
        'a.location',
        'a.image_url',
        'a.creation_date',
        'a.expiration_date',
        'u.name as donor_name', // Seleciona o nome do usuário e o renomeia para 'donor_name'
        'a.user_id' // Também pegamos o user_id para a lógica de "deletar" no frontend
      )
      .where('a.id', id)
      .first();

    if (anuncio) {
      res.status(200).json(anuncio);
    } else {
      res.status(404).json({ message: 'Anúncio não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar anúncio.', error: error.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const userIdFromToken = req.user.subject;

  try {
    const anuncio = await db('announcements').where({ id }).first();
    if (!anuncio) {
      return res.status(404).json({ message: 'Anúncio não encontrado.' });
    }

    // VERIFICAÇÃO DE SEGURANÇA CRUCIAL
    if (anuncio.user_id !== userIdFromToken) {
      return res.status(403).json({ message: 'Acesso negado. Você não é o dono deste anúncio.' });
    }

    await db('announcements').where({ id }).del();
    res.status(200).json({ message: 'Anúncio deletado com sucesso.' });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar anúncio.', error: error.message });
  }
});


module.exports = router;