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
}

export default OrderRepository;
