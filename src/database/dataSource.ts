import { DataSource } from "typeorm";
import { migrations } from "./migrations";
import UserEntity from "./entities/users/UserEntity";
import OrderEntity from "./entities/orders/OrderEntity";
import OrderLineEntity from "./entities/orders/OrderLineEntity";
import ProductEntity from "./entities/products/ProductEntity";

const port = process.env.DB_PORT || "5433";

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_USER || "localhost",
  username: process.env.DB_HOST || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "postgres",
  port: parseInt(port),
  // should be disabled in production
  synchronize: true,
  migrations,
  entities: [UserEntity, OrderEntity, OrderLineEntity, ProductEntity],
});

export default dataSource;
