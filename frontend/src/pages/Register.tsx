import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Register.css";
import Header from "../components/Header";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    state: "",
    city: "",
    country: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setErrors({});
    try {
      await axios.post("http://localhost:3000/api/users", formData);
      setMessage("Cadastro realizado com sucesso!");
    } catch (error: any) {
      setError(error.response?.data?.error);
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors.reduce(
          (acc: any, err: any) => {
            acc[err.property] =
              err.constraints[Object.keys(err.constraints)[0]];
            return acc;
          },
          {}
        );
        setErrors(validationErrors);
        setMessage("Erro ao realizar cadastro. Corrija os campos destacados.");
      } else {
        setMessage("Erro ao realizar cadastro: " + error.message);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="register-container">
        <h1>Cadastro de Usuário</h1>
        {message && (
          <p
            className={`message ${
              Object.keys(errors).length || error ? "error" : "success"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Usuário"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? "input-error" : ""}
              required
            />
            {errors.username && <p className="error-text">{errors.username}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "input-error" : ""}
              required
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="state"
              placeholder="Estado"
              value={formData.state}
              onChange={handleChange}
              className={errors.state ? "input-error" : ""}
            />
            {errors.state && <p className="error-text">{errors.state}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="city"
              placeholder="Cidade"
              value={formData.city}
              onChange={handleChange}
              className={errors.city ? "input-error" : ""}
            />
            {errors.city && <p className="error-text">{errors.city}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="country"
              placeholder="País"
              value={formData.country}
              onChange={handleChange}
              className={errors.country ? "input-error" : ""}
            />
            {errors.country && <p className="error-text">{errors.country}</p>}
          </div>
          <button type="submit">Cadastrar</button>
        </form>
        <div className="redirect-container">
          <p>Já possui uma conta?</p>
          <Link to="/login" className="login-link">
            Faça o login aqui
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
