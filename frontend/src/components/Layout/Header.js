// frontend/src/components/Layout/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Importe o hook
import './Header.css';

function Header() {
  const { isLoggedIn, user, logout } = useAuth(); // Pegue o estado e as funções
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redireciona para o login após sair
  };

  return (
    <header className="app-header">
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1>iDoe</h1>
      </Link>
      <nav>
        <Link to="/anuncios">Anúncios</Link>

        {isLoggedIn ? (
          <>
            <span className="welcome-message">Olá, {user?.name}!</span>
            <button onClick={handleLogout} className="logout-button">Sair</button>
          </>
        ) : (
          <>
            <Link to="/cadastro">Cadastrar</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}
export default Header;