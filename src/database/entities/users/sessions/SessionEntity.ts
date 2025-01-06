import { Column, Entity } from "typeorm";
import BaseEntity from "../../BaseEntity";

@Entity("sessions")
class SessionEntity extends BaseEntity {
  @Column({ type: "varchar", length: 100, nullable: false })
  token!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  userId!: string;

  @Column({ type: "boolean" })
  valid!: boolean;
}

export default SessionEntity;
