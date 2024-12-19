import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("users")
@Unique(["name", "email"])
class User {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  email!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  password!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  username!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at!: Date;
}

export default User;
