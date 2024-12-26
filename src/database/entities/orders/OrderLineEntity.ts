import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import ProductEntity from "../products/ProductEntity";
import OrderEntity from "./OrderEntity";
import BaseEntity from "../BaseEntity";

@Entity("order_lines")
class OrderLineEntity extends BaseEntity {
  @ManyToOne(() => OrderEntity, (order) => order.id)
  @JoinColumn({ name: "order_id" })
  order_id!: OrderEntity;

  @OneToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({ name: "product_id" })
  product_id!: ProductEntity;

  @Column({ type: "int", nullable: false })
  quantity!: number;
}

export default OrderLineEntity;
