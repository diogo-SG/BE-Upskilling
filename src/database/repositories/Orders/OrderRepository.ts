import { DataSource } from "typeorm";
import OrderEntity from "../../entities/orders/OrderEntity";
import BaseRepository from "../BaseRepository";

class OrderRepository extends BaseRepository<OrderEntity> {
  constructor(dataSource?: DataSource) {
    super(OrderEntity, dataSource);
  }

  async findAll(limit?: number): Promise<OrderEntity[]> {
    const orders = await this.repository.find({
      take: limit ? limit : 100,
      relations: {
        order_lines: true,
      },
    });
    return orders;
  }

  async findAllByUserId(userId: number): Promise<OrderEntity[]> {
    const orders = await this.repository.find({
      where: { user_id: userId },
      relations: {
        order_lines: true,
      },
    });
    return orders;
  }
}

export default OrderRepository;
