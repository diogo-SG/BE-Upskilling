import { Column, Entity } from "typeorm";
import BaseEntity from "../BaseEntity";

@Entity("products")
class ProductEntity extends BaseEntity {
  @Column({ type: "varchar", length: 100, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  description!: string;

  @Column({ type: "int", nullable: false })
  price!: number;

  @Column({ type: "int", nullable: false })
  stock!: number;
}

export default ProductEntity;
