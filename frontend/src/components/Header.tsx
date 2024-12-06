import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Header.css";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, username, logout } = useAuth();

  return (
    <header className="header">
      <Link to="/" className="header-title">
        Previsão do Tempo
      </Link>
      <nav className="header-nav">
        {isAuthenticated ? (
          <div className="user-info">
            <span>Seja bem-vindo, {username}!</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                logout();
                navigate("/");
              }}
              className="logout-button"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="header-link">
              Login
            </Link>
            <Link to="/register" className="header-link">
              Registrar
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
