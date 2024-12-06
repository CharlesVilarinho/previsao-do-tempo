import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Login.css";
import Header from "../components/Header";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        formData
      );
      if (response?.data?.token) {
        setMessage("Login realizado com sucesso!");
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("username", response?.data?.username);
        login(response?.data?.username);
        navigate("/");
        return;
      }
      throw "Erro interno ao realizar o login, contate a central de suporte.";
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Erro ao realizar login. Verifique suas credenciais."
      );
    }
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        <h1>Login</h1>
        {message && <p className="message success">{message}</p>}
        {error && <p className="message error">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="username"
              name="username"
              placeholder="Usuário"
              value={formData.username}
              onChange={handleChange}
              required
              className={error ? "input-error" : ""}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              required
              className={error ? "input-error" : ""}
            />
          </div>
          <button type="submit">Entrar</button>
        </form>
        <div className="redirect-container">
          <p>Não tem uma conta?</p>
          <Link to="/register" className="register-link">
            Cadastre-se aqui
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
