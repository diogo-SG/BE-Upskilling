import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import ProductEntity from "../products/ProductEntity";
import OrderEntity from "./OrderEntity";
import BaseEntity from "../BaseEntity";

@Entity("order_lines")
class OrderLineEntity extends BaseEntity {
  @ManyToOne(() => OrderEntity, (order) => order.order_lines, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" })
  order_id!: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({ name: "product_id" })
  product_id!: number;

  @Column({ type: "int", nullable: false })
  quantity!: number;
}

export default OrderLineEntity;
