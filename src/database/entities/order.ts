import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("orders")
class Order {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ type: "int", nullable: false })
  user_id!: number;

  @Column({ type: "int", nullable: false })
  product_id!: number;

  @Column({ type: "int", nullable: false })
  quantity!: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;
}

export default Order;
