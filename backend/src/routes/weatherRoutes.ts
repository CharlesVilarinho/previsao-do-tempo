import { Router } from "express";
import { getWeatherByLocation } from "../controllers/weatherController";
import { authenticateToken } from "../middleware/authMiddleware";
import { getRecentSearchHistory } from "../controllers/searchHistoryController";

const router = Router();

router.get("/weather", authenticateToken, getWeatherByLocation);
router.get("/history", authenticateToken, getRecentSearchHistory);

export default router;
