import { PrimaryGeneratedColumn, Column } from "typeorm";

abstract class BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at!: Date;
}

export default BaseEntity;
