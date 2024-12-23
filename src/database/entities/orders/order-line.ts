import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import ProductEntity from "../products/product";
import OrderEntity from "./order";
import BaseEntity from "../baseEntity";

@Entity("order_lines")
class OrderLineEntity extends BaseEntity {
  @ManyToOne(() => OrderEntity, (order) => order.id)
  order_id!: number;

  @OneToOne(() => ProductEntity, (product) => product.id)
  product_id!: number;

  @Column({ type: "int", nullable: false })
  quantity!: number;
}

export default OrderLineEntity;
