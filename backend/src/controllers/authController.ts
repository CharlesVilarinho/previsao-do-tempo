import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const existingUser = await userRepository.findOneBy({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já existe!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = userRepository.create({
      username,
      password: hashedPassword,
    });
    await userRepository.save(newUser);

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao registrar usuário." });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await userRepository.findOneBy({ username });
    if (!user) {
      return res.status(401).json({ message: "Usuário ou senha inválidos." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Usuário ou senha inválidos." });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao fazer login." });
  }
};
