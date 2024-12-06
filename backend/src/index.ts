import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/database";
import userRoutes from "./routes/userRoutes";
import "dotenv/config";
import cors from "cors";
import weatherRoutes from "./routes/weatherRoutes";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
    const app = express();

    app.use(
      cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      })
    );

    app.use(express.json());
    app.use("/api", userRoutes);
    app.use("/api", weatherRoutes);

    app.listen(3000, () => {
      console.log(".. http://localhost:3000");
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
