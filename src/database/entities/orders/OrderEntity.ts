import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import User from "../users/UserEntity";
import OrderLineEntity from "./OrderLineEntity";
import BaseEntity from "../BaseEntity";

@Entity("orders")
class OrderEntity extends BaseEntity {
  @ManyToOne(() => User, (user) => user.orders, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user_id!: number;

  // todo make enum
  @Column({ type: "varchar", length: 100, nullable: false })
  status!: string;

  @OneToMany(() => OrderLineEntity, (orderLine) => orderLine.order_id)
  order_lines?: OrderLineEntity[];
}

export default OrderEntity;
