import ProductEntity from "../database/entities/products/ProductEntity";
import ProductRepository from "../database/repositories/Products/ProductRepository";
import { EntityNoMetadata } from "../database/types/types";
import { ErrorWithStatus } from "../middleware/errorHandler";
import { BaseService } from "./BaseService";
import { DataSource } from "typeorm";
import dataSource from "../database/dataSource";

/* -------------------------------------------------------------------------- */
/*                               Product service                              */
/* -------------------------------------------------------------------------- */

class ProductService extends BaseService {
  private ProductRepo: ProductRepository;

  constructor(activeDataSource: DataSource = dataSource) {
    super(activeDataSource);
    this.ProductRepo = new ProductRepository(activeDataSource);
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Methods                                  */
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Get all products ----------------------------- */

  async getAll(limit?: number) {
    const products = await this.ProductRepo.findAll(limit);
    return products;
  }

  /* ----------------------------- Get single product ---------------------------- */
  async getById(productId: number) {
    const product = await this.ProductRepo.findOneById(productId);
    if (!product) {
      throw new ErrorWithStatus(404, "Product not found");
    }
    return product;
  }

  /* ------------------------------ Add new product ------------------------------ */

  async addNew(newProductData: EntityNoMetadata<ProductEntity>) {
    try {
      const addedProduct = await this.ProductRepo.create(newProductData);

      return addedProduct;
    } catch (error) {
      if (error instanceof ErrorWithStatus) {
        throw error;
      }

      throw new ErrorWithStatus(500, "Something went wrong");
    }
  }

  /* ------------------------------- Edit product ------------------------------- */

  async edit(newProductData: ProductEntity) {
    try {
      const editedProduct = await this.ProductRepo.update(newProductData);
      return editedProduct;
    } catch (error) {
      if (error instanceof ErrorWithStatus) {
        throw error;
      }

      throw new ErrorWithStatus(500, "Something went wrong");
    }
  }

  /* ----------------------------- Delete product ------------------------------ */

  async remove(productId: number) {
    await this.ProductRepo.delete(productId);

    return;
  }
}

export default ProductService;
