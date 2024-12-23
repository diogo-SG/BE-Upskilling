import { DataSource } from "typeorm";
import { CreateUsersTable1734540142082 } from "./migrations/1734540142082-CreateUsersTable";
import UserEntity from "./entities/users/user";
import OrderEntity from "./entities/orders/order";
import OrderLineEntity from "./entities/orders/order-line";
import ProductEntity from "./entities/products/product";

const port = process.env.DB_PORT || "5433";

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_USER || "localhost",
  username: process.env.DB_HOST || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "postgres",
  port: parseInt(port),
  migrations: [CreateUsersTable1734540142082],
  entities: [UserEntity, OrderEntity, OrderLineEntity, ProductEntity],
});

export default dataSource;
