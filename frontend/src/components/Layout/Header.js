// frontend/src/components/Layout/Header.js
import React from 'react';
import { Link } from 'react-router-dom'; // Importe o Link
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      {/* O Link para o logo leva para a página inicial */}
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1>iDoe</h1>
      </Link>
      <nav>
        {/* Links para as outras páginas */}
        <Link to="/anuncios">Anúncios</Link>
        <Link to="/cadastro">Cadastrar</Link> {/* Adicionaremos esta rota em breve */}
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}

export default Header;