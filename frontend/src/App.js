// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import RegisterPage from './components/Pages/RegisterPage';

// Importando nossos componentes
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './components/Pages/HomePage';
import AnunciosPage from './components/Pages/AnunciosPage';
import LoginPage from './components/Pages/LoginPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/anuncios" element={<AnunciosPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cadastro" element={<RegisterPage />} />
            {/* Adicionaremos mais rotas aqui depois (Cadastro, etc) */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;