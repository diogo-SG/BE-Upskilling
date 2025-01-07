import { Column, Entity } from "typeorm";
import BaseEntity from "../../BaseEntity";

@Entity("sessions")
class SessionEntity extends BaseEntity {
  // @Column({ type: "varchar", length: 100, nullable: false })
  // token!: string;

  @Column({ type: "int", nullable: false })
  userId!: number;

  @Column({ type: "boolean" })
  isValid!: boolean;
}

export default SessionEntity;
