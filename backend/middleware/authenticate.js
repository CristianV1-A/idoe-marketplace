// backend/middleware/authenticate.js
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../secrets.js');

function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido.' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = authenticate;
