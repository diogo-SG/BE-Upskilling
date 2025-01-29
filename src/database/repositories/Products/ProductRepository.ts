import ProductEntity from "../../entities/products/ProductEntity";
import BaseRepository from "../BaseRepository";
import { DataSource } from "typeorm";

class ProductRepository extends BaseRepository<ProductEntity> {
  constructor(dataSource?: DataSource) {
    super(ProductEntity, dataSource);
  }
}

export default ProductRepository;
