import ProductEntity from "../../entities/products/ProductEntity";
import BaseRepository from "../BaseRepository";

class ProductRepository extends BaseRepository<ProductEntity> {
  constructor() {
    super(ProductEntity);
  }
}

export default ProductRepository;
