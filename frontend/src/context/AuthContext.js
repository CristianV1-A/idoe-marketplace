// frontend/src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Instalaremos esta biblioteca

// 1. Cria o Contexto
const AuthContext = createContext(null);

// 2. Cria o Provedor (um componente que vai "abraçar" nossa aplicação)
export const AuthProvider = ({ children }) => {
  // Guarda o token no estado. Inicializa com o token salvo no localStorage, se houver.
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  // Este useEffect roda sempre que o 'token' muda.
  useEffect(() => {
    if (token) {
      // Salva o token no localStorage para persistir o login entre sessões
      localStorage.setItem('token', token);
      // Decodifica o token para extrair as informações do usuário (id, name)
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    } else {
      // Se não há token, remove do localStorage e limpa o estado do usuário
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  // Função de login: atualiza o estado do token
  const login = (newToken) => {
    setToken(newToken);
  };

  // Função de logout: limpa o estado do token
  const logout = () => {
    setToken(null);
  };

  // O valor que será compartilhado com todos os componentes filhos
  const value = {
    token,
    user,
    isLoggedIn: !!token, // Uma forma rápida de ter um booleano true/false
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Cria um Hook customizado para facilitar o uso do contexto
export const useAuth = () => {
  return useContext(AuthContext);
};