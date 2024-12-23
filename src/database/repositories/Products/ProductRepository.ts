import { DataSource } from "typeorm";
import ProductEntity from "../../entities/products/product";
import BaseRepository from "../BaseRepository";

class ProductRepository extends BaseRepository<ProductEntity> {
  constructor() {
    super(ProductEntity);
  }
}

export default ProductRepository;
