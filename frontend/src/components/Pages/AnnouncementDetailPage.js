// frontend/src/components/Pages/AnnouncementDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AnnouncementDetailPage.css';

function AnnouncementDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID da URL, ex: /anuncios/3 -> id = 3
  const { token, user } = useAuth(); // Pega o usuário logado do nosso contexto
  const [anuncio, setAnuncio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja deletar este anúncio? Esta ação é irreversível.')) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/anuncios/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token // Envia o token para autorização
        }
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Falha ao deletar.');
      }
      navigate('/anuncios'); // Redireciona após o sucesso
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchAnuncio = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/anuncios/${id}`);
        if (!response.ok) {
          throw new Error('Anúncio não encontrado.');
        }
        const data = await response.json();
        setAnuncio(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnuncio();
  }, [id]); // O useEffect roda novamente se o ID na URL mudar

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="error-message">Erro: {error}</p>;
  if (!anuncio) return <p>Anúncio não encontrado.</p>;

  // Verifica se o usuário logado é o dono do anúncio
  const isOwner = user && user.subject === anuncio.user_id;

  return (
    <div className="detail-container">
      <img src={anuncio.image_url} alt={anuncio.title} className="detail-image" />
      <div className="detail-content">
        <h1 className="detail-title">{anuncio.title}</h1>
        <p className="detail-donor"><strong>Doador(a):</strong> {anuncio.donor_name}</p>
        <p className="detail-location"><strong>Localidade:</strong> {anuncio.location}</p>
        <p className="detail-date">
          <strong>Publicado em:</strong> {new Date(anuncio.creation_date).toLocaleDateString()}
        </p>
        {anuncio.expiration_date && (
          <p className="detail-date">
            <strong>Válido até:</strong> {new Date(anuncio.expiration_date).toLocaleDateString()}
          </p>
        )}

        {/* O botão de Chat aparecerá para todos (exceto o dono) */}
        {!isOwner && <button className="chat-button">Conversar com Doador(a)</button>}

        {/* O botão de Deletar SÓ aparece se o usuário logado for o dono */}
        {isOwner && <button onClick={handleDelete} className="delete-button">Deletar Anúncio</button>}
      </div>
    </div>
  );
}

export default AnnouncementDetailPage;