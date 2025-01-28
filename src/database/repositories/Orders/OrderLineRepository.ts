import { DataSource } from "typeorm";
import OrderLineEntity from "../../entities/orders/OrderLineEntity";
import BaseRepository from "../BaseRepository";

export class OrderLineRepository extends BaseRepository<OrderLineEntity> {
  constructor(dataSource?: DataSource) {
    super(OrderLineEntity, dataSource);
  }

  getLinesByOrderId(orderId: number) {
    return this.repository.find({
      where: { order_id: orderId },
    });
  }
}
