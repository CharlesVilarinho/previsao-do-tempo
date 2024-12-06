import { Request, Response, Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";
import redis from "../config/redis";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/users", async (req, res) => {
  await UserController.createUser(req, res);
});

router.get("/users", async (req, res) => {
  await UserController.getUsers(req, res);
});

router.post("/login", async (req, res) => {
  await UserController.login(req, res);
});

router.get("/profile", authenticateToken, (req, res) => {
  const user = res.locals.user;
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  res.json({ message: "This is a protected route", user });
});

router.post(
  "/logout",
  authenticateToken,
  async (req: Request, res: Response): Promise<void> => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      res.status(401).json({ message: "Token is required." });
      return;
    }
    const token = authHeader?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Token is required." });
      return;
    }

    const decoded = jwt.decode(token) as { exp: number };
    const expirationTime = decoded?.exp ?? Math.floor(Date.now() / 1000) + 3600;

    await redis.set(token, "blacklisted", "EX", expirationTime);

    res.status(200).json({ message: "Logout successful." });
    return;
  }
);

export default router;
