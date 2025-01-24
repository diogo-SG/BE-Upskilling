import { DataSource } from "typeorm";
import dataSource from "../database/dataSource";

export abstract class BaseService {
  protected dataSource: DataSource;
  constructor(baseDataSource: DataSource = dataSource) {
    this.dataSource = baseDataSource ?? dataSource;
  }
}
