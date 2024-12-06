import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import redis from "../config/redis";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token || token === "null") {
    if (req.path !== "/weather") {
      res.status(401).json({ message: "Token is required." });
    }
    return;
  }

  const blacklistedToken = await redis.get(token);

  if (blacklistedToken) {
    res.status(403).json({ message: "Token is blacklisted." });
    return;
  }
  if (res.locals.invalidTokens && res.locals.invalidTokens.includes(token)) {
    res.status(403).json({ message: "Invalid token." });
    return;
  }

  const secret = process.env.JWT_SECRET || "secret";
  try {
    const decoded = jwt.verify(token, secret) as { userId: string };
    res.locals.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token.", error: err });
    return;
  }
};
