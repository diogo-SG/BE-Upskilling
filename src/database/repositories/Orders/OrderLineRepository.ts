import { DataSource } from "typeorm";
import OrderLineEntity from "../../entities/orders/order-line";
import BaseRepository from "../BaseRepository";

export class OrderLineRepository extends BaseRepository<OrderLineEntity> {
  constructor() {
    super(OrderLineEntity);
  }

  async findAllByOrderId(orderId: number): Promise<OrderLineEntity[]> {
    const orderLines = await this.repository.find({
      where: { order_id: orderId },
    });
    return orderLines;
  }
}
