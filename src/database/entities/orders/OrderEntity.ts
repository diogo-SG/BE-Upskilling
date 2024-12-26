import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "../users/UserEntity";
import OrderLineEntity from "./OrderLineEntity";
import BaseEntity from "../BaseEntity";

@Entity("orders")
class OrderEntity extends BaseEntity {
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user_id!: User;

  @Column({ type: "varchar", length: 100, nullable: false })
  status!: string;

  @OneToMany(() => OrderLineEntity, (orderLine) => orderLine.id)
  order_lines?: OrderLineEntity[];
}

export default OrderEntity;
