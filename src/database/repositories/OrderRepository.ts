import Order from "../entities/order";
import { OrderSchema } from "../types/order";
import { DataSource } from "typeorm";

class OrderRepository {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async create(order: OrderSchema): Promise<OrderSchema> {
    const newOrder = await this.dataSource.getRepository(Order).save(order);
    return newOrder;
  }

  async findById(id: number): Promise<OrderSchema | null> {
    const order = await this.dataSource.getRepository(Order).findOneBy({ id });
    return order;
  }

  async update(order: OrderSchema): Promise<OrderSchema> {
    const updatedOrder = await this.dataSource.getRepository(Order).save(order);
    return updatedOrder;
  }

  async delete(id: number): Promise<void> {
    await this.dataSource.getRepository(Order).delete(id);
  }
}

export default OrderRepository;
