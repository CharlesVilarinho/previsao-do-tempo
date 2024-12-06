import React, { useState } from "react";
import axios from "axios";

interface Props {
  onSearch: (data: any) => void;
}

const WeatherSearch: React.FC<Props> = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    if (!city.trim() || !country.trim()) {
      setErrorMessage("Por favor, preencha os campos de cidade e país.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3000/api/weather`, {
        params: { city, country },
        headers: { Authorization: `Bearer ${token}` },
      });
      onSearch(response.data);
      setErrorMessage("");
    } catch (error: any) {
      const message =
        error.response?.status === 404
          ? "Clima não encontrado para a cidade ou país fornecido."
          : "Ocorreu um erro ao buscar o clima. Valide se as informações estão preenchidas corretamente ou tente novamente mais tarde.";
      setErrorMessage(message);
    }
  };

  return (
    <div className="weather-search">
      <input
        type="text"
        placeholder="Cidade"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="text"
        placeholder="País"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar Clima</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default WeatherSearch;
