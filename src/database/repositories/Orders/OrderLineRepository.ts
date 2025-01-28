import { DataSource } from "typeorm";
import OrderLineEntity from "../../entities/orders/OrderLineEntity";
import BaseRepository from "../BaseRepository";

export class OrderLineRepository extends BaseRepository<OrderLineEntity> {
  constructor(dataSource?: DataSource) {
    super(OrderLineEntity, dataSource);
  }
}
