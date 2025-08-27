// frontend/src/components/Anuncios/DonationCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './DonationCard.css';

// Usamos "props" para passar dados de um componente pai para um filho.
// Aqui, esperamos receber um objeto "anuncio" com todas as informações.
function DonationCard({ anuncio }) {
  const { titulo, localidade, dataCriacao, imagem } = anuncio;

  return (
    <div className="card">
      <img src={imagem} alt={titulo} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{titulo}</h3>
        <p className="card-location">📍 {localidade}</p>
        <p className="card-date">Publicado em: {dataCriacao}</p>
        <Link to={`/anuncios/${anuncio.id}`} className="card-button-link">
          <button className="card-button">Ver Detalhes</button>
        </Link>
      </div>
    </div>
  );
}
export default DonationCard;