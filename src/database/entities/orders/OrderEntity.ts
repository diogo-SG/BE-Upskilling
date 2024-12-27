import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "../users/UserEntity";
import OrderLineEntity from "./OrderLineEntity";
import BaseEntity from "../BaseEntity";

@Entity("orders")
class OrderEntity extends BaseEntity {
  @ManyToOne(() => User, (user) => user.orders, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ type: "int", nullable: false })
  user_id!: number;

  // todo make enum
  @Column({ type: "varchar", length: 100, nullable: false })
  status!: string;

  @OneToMany(() => OrderLineEntity, (orderLine) => orderLine.order)
  order_lines?: OrderLineEntity[];
}

export default OrderEntity;
