import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Transaction } from "../entities/Transaction";
import { Report } from "../entities/Report";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_USER) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "okapi",
  synchronize: true, // dev only!
  logging: true,
  entities: [User, Product, Transaction, Report],
});
