import { Column, Entity } from "typeorm";
import BaseEntity from "../baseEntity";

@Entity("products")
class ProductEntity extends BaseEntity {
  @Column({ type: "varchar", length: 100, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  description!: string;

  @Column({ type: "int", nullable: false })
  price!: number;
}

export default ProductEntity;
