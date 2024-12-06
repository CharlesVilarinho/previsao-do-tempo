import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { SearchHistory } from "../entities/SearchHistory";

export const getRecentSearchHistory = async (req: Request, res: Response) => {
  try {
    const searchHistoryRepository = AppDataSource.getRepository(SearchHistory);
    const userId = res.locals.user?.userId;

    const recentHistory = await searchHistoryRepository.find({
      where: userId ? { user: { id: userId } } : {},
      order: { date: "DESC" },
      take: 5,
    });

    res.status(200).json(recentHistory);
  } catch (error) {
    console.error("Erro ao buscar histórico de pesquisa:", error);
    res.status(500).json({ message: "Erro ao buscar histórico de pesquisa." });
  }
};
