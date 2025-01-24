import { migrations } from "../database/migrations";
import { DataSource, DataSourceOptions } from "typeorm";
import { createDatabase, dropDatabase } from "typeorm-extension";
import OrderEntity from "../database/entities/orders/OrderEntity";
import OrderLineEntity from "../database/entities/orders/OrderLineEntity";
import ProductEntity from "../database/entities/products/ProductEntity";
import SessionEntity from "../database/entities/users/sessions/SessionEntity";
import UserEntity from "../database/entities/users/UserEntity";
import { createDatasource } from "../database/dataSource";

const dataSourceOpts: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  name: "test",
  database: "test_db",
  port: parseInt(process.env.DB_PORT || "5432"),
  // synchronize: true,
  dropSchema: true,
  migrations,
  entities: [UserEntity, OrderEntity, OrderLineEntity, ProductEntity, SessionEntity],
};

export class TestDBHandler {
  private readonly initialDatabase: string;
  private readonly testDatabase = dataSourceOpts.database;
  public testDataSource: DataSource;

  constructor() {
    this.initialDatabase = process.env.DB_NAME || "postgres";
    this.testDataSource = createDatasource(dataSourceOpts);
  }

  async createDB() {
    await this.dropDB();
    console.log(`Creating test database: ${this.testDatabase}`);
    await createDatabase({
      options: dataSourceOpts,
      initialDatabase: this.initialDatabase,
      ifNotExist: false,
    });

    await this.testDataSource.initialize();
    console.log(`Test database created: ${this.testDatabase}`);
    console.log("Running migrations...");
    await this.testDataSource.runMigrations();
    console.log("Migrations run successfully");
    console.log("Test database ready to accept connections");
  }

  async dropDB(dropAll = false) {
    console.log(`Dropping test database '${this.testDatabase}'`);
    if (dropAll) {
      this.testDataSource.initialize();
      await this.testDataSource.query(
        `SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '${this.testDatabase}';`
      );
    }

    if (this.testDataSource.isInitialized) await this.testDataSource.destroy();
    await dropDatabase({
      options: dataSourceOpts,
      initialDatabase: this.initialDatabase,
    });
  }
}
