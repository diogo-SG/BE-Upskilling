import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "../users/user";
import OrderLineEntity from "./order-line";
import BaseEntity from "../baseEntity";

@Entity("orders")
class OrderEntity extends BaseEntity {
  @ManyToOne(() => User, (user) => user.id)
  user_id!: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  status!: string;

  @OneToMany(() => OrderLineEntity, (orderLine) => orderLine.order_id)
  order_lines!: OrderLineEntity[];
}

export default OrderEntity;
