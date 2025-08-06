// frontend/src/components/Pages/AnunciosPage.js

import React, { useState, useEffect } from 'react'; // 1. Importamos os Hooks
import DonationCard from '../Anuncios/DonationCard'; // 2. Importamos nosso card
import './AnunciosPage.css'; // 3. Importamos um novo arquivo de estilo

function AnunciosPage() {
  // 4. Criamos os estados do nosso componente
  // 'anuncios' vai guardar a lista vinda da API
  const [anuncios, setAnuncios] = useState([]);
  // 'loading' nos ajuda a mostrar uma mensagem de "carregando"
  const [loading, setLoading] = useState(true);
  // 'error' guardará qualquer erro que ocorrer na busca
  const [error, setError] = useState(null);


  // 5. O Hook useEffect para buscar os dados na API
  useEffect(() => {
    // A função fetch é nativa do navegador para fazer requisições HTTP
    fetch('http://localhost:5000/api/anuncios')
      .then(response => {
        // Se a resposta não for 'ok' (ex: erro 500 no servidor), nós lançamos um erro
        if (!response.ok) {
          throw new Error('Não foi possível buscar os anúncios.');
        }
        return response.json(); // Converte a resposta para JSON
      })
      .then(data => {
        setAnuncios(data); // 6. Atualiza o estado com os dados recebidos
        setLoading(false); // Marca que o carregamento terminou
      })
      .catch(err => {
        setError(err.message); // 7. Em caso de erro, atualiza o estado de erro
        setLoading(false); // Marca que o carregamento terminou (mesmo com erro)
      });
  }, []); // 8. O array vazio [] significa que este efeito rodará APENAS UMA VEZ, quando o componente for montado.

  // 9. Renderização condicional com base no estado
  if (loading) {
    return <p>Carregando anúncios...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  // 10. Se não há loading nem erro, mostramos os dados
  return (
    <div className="anuncios-page">
      <h2>Todos os Anúncios</h2>
      <div className="anuncios-grid">
        {anuncios.map(anuncio => (
          <DonationCard key={anuncio.id} anuncio={anuncio} />
        ))}
      </div>
    </div>
  );
}

export default AnunciosPage;