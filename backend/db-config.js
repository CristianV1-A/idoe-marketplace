// backend/db-config.js
const knex = require('knex');
const config = require('./knexfile.js');

// Exportamos a conexão com o ambiente de desenvolvimento
module.exports = knex(config.development);