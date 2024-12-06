import React, { useState } from "react";
import WeatherDisplay from "../components/WeatherDisplay";
import WeatherSearch from "../components/WeatherSearch";
import SearchHistory from "../components/SearchHistory";
import Header from "../components/Header";
import "../styles/weather.css";
import { useAuth } from "../contexts/AuthContext";

const WeatherPage: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const { isAuthenticated } = useAuth();

  const handleSearch = (data: any) => {
    setWeatherData(data);
  };

  return (
    <div>
      <Header />
      <div className="weather-page">
        <WeatherSearch onSearch={handleSearch} />
        <WeatherDisplay data={weatherData} />
        {isAuthenticated ? <SearchHistory /> : ""}
      </div>
    </div>
  );
};

export default WeatherPage;
