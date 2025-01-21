import { DataSource, DataSourceOptions } from "typeorm";
import { migrations } from "./migrations";
import UserEntity from "./entities/users/UserEntity";
import OrderEntity from "./entities/orders/OrderEntity";
import OrderLineEntity from "./entities/orders/OrderLineEntity";
import ProductEntity from "./entities/products/ProductEntity";
import SessionEntity from "./entities/users/sessions/SessionEntity";

const dataSourceOpts: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "db",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "postgres",
  port: parseInt(process.env.DB_PORT || "5432"),
  synchronize: true, // Should be turned off in production
  migrations,
  entities: [UserEntity, OrderEntity, OrderLineEntity, ProductEntity, SessionEntity],
};

export function createDatasource(dataSourceOpts: DataSourceOptions) {
  const newDataSource = new DataSource(dataSourceOpts);
  return newDataSource;
}

const dataSource = createDatasource(dataSourceOpts);

export default dataSource;
