import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Order from "./order";
import ProductEntity from "../products/product";

@Entity("order_lines")
class OrderLineEntity extends BaseEntity {
  @ManyToOne(() => Order, (order) => order.id)
  order_id!: number;

  @OneToOne(() => ProductEntity, (product) => product.id)
  product_id!: number;

  @Column({ type: "int", nullable: false })
  quantity!: number;
}

export default OrderLineEntity;
