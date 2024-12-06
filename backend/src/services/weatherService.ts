import axios from "axios";

const WEATHER_API_URL = <string>process.env.WEATHER_API_URL;
const API_KEY = process.env.WEATHER_API_KEY;

interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
  city: string;
  country: string;
}

export const getWeather = async (
  city: string,
  country: string
): Promise<WeatherData> => {
  try {
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        q: `${city},${country}`,
        appid: API_KEY,
        units: "metric",
      },
    });

    const data = response.data;
    return {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      city: data.name,
      country: data.sys.country,
    };
  } catch (error: any) {
    console.error("Erro ao buscar dados de clima:", error.message, error);
    throw new Error("Não foi possível obter os dados de clima.");
  }
};
