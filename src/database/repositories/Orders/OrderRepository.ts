import OrderEntity from "../../entities/orders/OrderEntity";
import BaseRepository from "../BaseRepository";

class OrderRepository extends BaseRepository<OrderEntity> {
  constructor() {
    super(OrderEntity);
  }

  async findAllByUserId(userId: number): Promise<OrderEntity[]> {
    const orders = await this.repository.find({
      where: { user_id: userId },
    });
    return orders;
  }
}

export default OrderRepository;
