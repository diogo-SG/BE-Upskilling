import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { OrderSchema } from "../../types/order";
import Order from "../orders/order";
import BaseEntity from "../baseEntity";

@Entity("users")
@Unique(["name", "email"])
class UserEntity extends BaseEntity {
  @Column({ type: "varchar", length: 100, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  email!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  password!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  username!: string;

  @OneToMany(() => Order, (order) => order.user_id)
  orders!: OrderSchema[];
}

export default UserEntity;
