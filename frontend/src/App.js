import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import RegisterPage from './components/Pages/RegisterPage';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './components/Pages/HomePage';
import AnunciosPage from './components/Pages/AnunciosPage';
import LoginPage from './components/Pages/LoginPage';
import AnnouncementDetailPage from './components/Pages/AnnouncementDetailPage';

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
            <Route path="/anuncios/:id" element={<AnnouncementDetailPage />} />
            {/* Adicionaremos mais rotas aqui depois (Cadastro, etc) */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;