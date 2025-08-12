// backend/knexfile.js

module.exports = {
  development: {
    client: 'sqlite3', // O 'dialeto' do banco de dados que estamos usando
    connection: {
      // Onde o arquivo do nosso banco de dados será salvo
      filename: './data/idoe.db3'
    },
    useNullAsDefault: true, // Configuração padrão para SQLite
    // Especifica a pasta onde nossas "migrations" ficarão
    migrations: {
      directory: './data/migrations'
    }
  }
  // Futuramente, poderíamos ter outras configurações aqui,
  // como 'production' para o site no ar.
};