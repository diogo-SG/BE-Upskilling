import { Client } from "pg";

const port = process.env.DB_PORT || "5433";
const dbClient = new Client({
  host: process.env.DB_USER || "localhost",
  user: process.env.DB_HOST || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "postgres",
  port: parseInt(port),
});

dbClient.connect();

export default dbClient;
