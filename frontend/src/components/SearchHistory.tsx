import React, { useEffect, useState } from "react";
import axios from "axios";

interface HistoryItem {
  date: string;
  city: string;
  country: string;
  temperature: number;
  humidity: number;
}

const RecentHistory: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("pt-BR", options).format(
      new Date(dateString)
    );
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/history", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setHistory(response?.data as HistoryItem[]);
      } catch (error: any) {
        setErrorMessage("Erro ao carregar histórico de pesquisa.");
        console.error("Erro ao buscar histórico:", error.message);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="recent-history">
      <h3>Histórico de Pesquisas</h3>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <ul style={{ listStyleType: "none", padding: 10, margin: 0 }}>
        {history.map((item, index) => (
          <li key={index}>
            {formatDate(item.date)} - {item.city}, {item.country} -{" "}
            {item.temperature}°C, {item.humidity}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentHistory;
