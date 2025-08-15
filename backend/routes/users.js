// backend/routes/users.js
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db-config.js');

const router = express.Router();

// ROTA DE CADASTRO: POST /api/users/register
router.post('/register', async (req, res) => {
  const userData = req.body;

  // Validação básica
  if (!userData.email || !userData.password || !userData.name) {
    return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
  }

  try {
    // Criptografa a senha antes de salvar
    const hash = bcrypt.hashSync(userData.password, 12); // O 12 é o "custo" do hash
    userData.password = hash;

    // Salva o usuário no banco de dados
    const [id] = await db('users').insert(userData);
    res.status(201).json({ message: `Usuário ${userData.name} criado com sucesso!`, id });

  } catch (error) {
    // Trata erro de email duplicado
    if (error.code === 'SQLITE_CONSTRAINT') {
      return res.status(409).json({ message: 'Este email já está em uso.' });
    }
    res.status(500).json({ message: 'Erro ao registrar usuário.', error: error.message });
  }
});

// ... código anterior em users.js
const jwt = require('jsonwebtoken');

// Crie um arquivo 'secrets.js' na raiz do backend com o conteúdo:
// module.exports = { jwtSecret: 'seuSegredoSuperSecretoAqui123' };
// E adicione 'secrets.js' ao seu arquivo .gitignore!
const { jwtSecret } = require('../secrets.js');

// Função para gerar o token
function generateToken(user) {
  const payload = {
    subject: user.id,
    name: user.name,
  };
  const options = {
    expiresIn: '1d', // Token expira em 1 dia
  };
  return jwt.sign(payload, jwtSecret, options);
}

// ROTA DE LOGIN: POST /api/users/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca o usuário pelo email
    const user = await db('users').where({ email }).first();

    // Se o usuário existe E a senha bate com o hash salvo...
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user); // Gera o token
      res.status(200).json({ message: `Bem-vindo(a), ${user.name}!`, token });
    } else {
      // Mensagem genérica para não informar se o erro foi no email ou na senha
      res.status(401).json({ message: 'Credenciais inválidas.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login.', error: error.message });
  }
});

// ... module.exports no final

module.exports = router;