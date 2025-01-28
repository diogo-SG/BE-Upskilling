import { DataSource } from "typeorm";
import OrderEntity from "../../entities/orders/OrderEntity";
import BaseRepository from "../BaseRepository";

class OrderRepository extends BaseRepository<OrderEntity> {
  constructor(dataSource?: DataSource) {
    super(OrderEntity, dataSource);
  }

  async findAllByUserId(userId: number): Promise<OrderEntity[]> {
    const orders = await this.repository.find({
      where: { user_id: userId },
    });
    return orders;
  }

  async getOrderLines(orderId: number) {
    const order = await this.repository.find({
      relations: ["order_lines"],
      where: { id: orderId },
    });
    if (!order[0].order_lines) {
      return [];
    }
    return order[0].order_lines;
  }
}

export default OrderRepository;
