import { Router } from "express";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User";

const router = Router();

router.get("/users", async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  res.json(users);
});

export default router;
