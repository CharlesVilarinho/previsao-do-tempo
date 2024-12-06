import React from "react";

interface WeatherData {
  city: string;
  country: string;
  temperature: string;
  humidity: string;
  description: string;
}

const WeatherDisplay: React.FC<{ data: WeatherData | null }> = ({ data }) => {
  if (!data) {
    return <p>Busque o clima para visualizar os dados!</p>;
  }

  return (
    <div className="weather-display">
      <h2>Informações do Clima</h2>
      <h3>
        {data.city} - {data.country}
      </h3>
      <p>
        <strong>Temperatura:</strong> {data.temperature}°C
      </p>
      <p>
        <strong>Umidade:</strong> {data.humidity}%
      </p>
      <p>
        <strong>Descrição:</strong> {data.description}
      </p>
    </div>
  );
};

export default WeatherDisplay;
