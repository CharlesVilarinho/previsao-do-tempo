import { Request, Response } from "express";
import { User } from "../entities/User";
import { AppDataSource } from "../config/database";
import { validate } from "class-validator";
import { AuthService } from "../services/authService";

export class UserController {
  static async login(req: Request, res: Response) {
    console.log("login");
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required." });
      }

      const userRepo = AppDataSource.getRepository(User);

      const user = await userRepo.findOneBy({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const isPasswordValid = await AuthService.comparePassword(
        password,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password." });
      }

      const token = await AuthService.generateToken(user);

      return res.status(200).json({ token, username });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const { username, password, state, city, country } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          message: "Username and password are required.",
          error: true,
        });
      }

      const userRepo = AppDataSource.getRepository(User);

      const existingUser = await userRepo.findOneBy({ username });
      if (existingUser) {
        return res
          .status(409)
          .json({ message: "User already exists.", error: true });
      }

      const user = userRepo.create({
        username,
        password,
        state,
        city,
        country,
      });

      const errors = await validate(user);
      if (errors.length > 0) {
        return res.status(400).json({
          message: "Campo " + errors[0]?.property,
          errors,
          error: true,
        });
      }

      await userRepo.save(user);

      return res.status(201).json(user);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Internal server error.", error: true });
    }
  }

  static async getUsers(req: Request, res: Response) {
    try {
      const userRepo = AppDataSource.getRepository(User);

      const users = await userRepo.find();
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }
}
