// backend/routes/anuncios.js
const express = require('express');
const router = express.Router();

// Dados Falsos (Mock Data) - Substituiremos pelo banco de dados na próxima parte
const mockAnuncios = [
  {
    id: 1,
    titulo: 'Doação de Camisetas de Algodão (Tam. M)',
    localidade: 'Manaus, AM',
    dataCriacao: '01/08/2025',
    imagem: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'
  },
  {
    id: 2,
    titulo: 'Calça Jeans Feminina em ótimo estado (Tam. 38)',
    localidade: 'Iranduba, AM',
    dataCriacao: '02/08/2025',
    imagem: 'https://images.unsplash.com/photo-1602293589922-2542a3973169?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'
  },
  {
    id: 3,
    titulo: 'Lote de Roupas de Bebê (0-3 meses)',
    localidade: 'Manaus, AM',
    dataCriacao: '03/08/2025',
    imagem: 'https://images.unsplash.com/photo-1522771793082-6142c019a3e2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'
  }
];

// Definindo a rota GET para /
// Como vamos registrar este arquivo de rotas com o prefixo /api/anuncios,
// esta rota corresponderá ao endereço final: GET /api/anuncios
router.get('/', (req, res) => {
  // Simplesmente retornamos nossa lista de anúncios como JSON
  res.json(mockAnuncios);
});

// Exportamos o router para que o server.js possa usá-lo
module.exports = router;