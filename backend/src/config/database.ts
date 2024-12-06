import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { SearchHistory } from "../entities/SearchHistory";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
  database: process.env.DB_NAME || "postgres",
  synchronize: true,
  logging: false,
  entities: [User, SearchHistory],
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Banco de dados conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados", error);
    process.exit(1);
  }
};
