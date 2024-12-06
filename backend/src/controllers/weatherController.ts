import { Request, Response } from "express";
import { getWeather } from "../services/weatherService";
import { SearchHistory } from "../entities/SearchHistory";
import { AppDataSource } from "../config/database";

export const getWeatherByLocation = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { city, country } = req.query;

  if (!city || !country) {
    res.status(400).json({ message: "Insira os dados da cidade e do país." });
    return;
  }

  try {
    const weather = await getWeather(city as string, country as string);

    const user = res.locals.user;

    if (user) {
      try {
        const searchHistoryRepository =
          AppDataSource.getRepository(SearchHistory);

        const newHistory = searchHistoryRepository.create({
          user: { id: user.id },
          city: weather.city as string,
          country: weather.country as string,
          temperature: weather.temperature,
          humidity: weather.humidity,
          description: weather.description,
          date: new Date(),
        });

        await searchHistoryRepository.save(newHistory);
      } catch (dbError) {
        console.error("Erro ao salvar histórico de pesquisa:", dbError);
      }
    }

    res.json(weather);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
