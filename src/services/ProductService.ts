import ProductEntity from "../database/entities/products/product";
import ProductRepository from "../database/repositories/Products/ProductRepository";
import { EntitySansId } from "../database/types/types";
import { ErrorWithStatus } from "../middleware/errorHandler";

const ProductRepo = new ProductRepository();

const ProductService = {
  getAll,
  getById,
  addNew,
  edit,
  remove,
};

/* ------------------------------ Get all products ----------------------------- */

async function getAll(limit?: number) {
  const products = await ProductRepo.findAll(limit);
  return products;
}

/* ----------------------------- Get single product ---------------------------- */

async function getById(productId: number) {
  const product = await ProductRepo.findOneById(productId);
  if (!product) {
    throw new ErrorWithStatus(404, "Product not found");
  }
  return product;
}

/* ------------------------------ Add new product ------------------------------ */
async function addNew(newProductData: EntitySansId<ProductEntity>) {
  try {
    const addedProduct = await ProductRepo.create(newProductData);

    return addedProduct;
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      throw error;
    }

    throw new ErrorWithStatus(500, "Something went wrong");
  }
}

/* ------------------------------- Edit product ------------------------------- */

async function edit(newProductData: ProductEntity) {
  try {
    const editedProduct = await ProductRepo.update(newProductData);
    return editedProduct;
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      throw error;
    }

    throw new ErrorWithStatus(500, "Something went wrong");
  }
}

/* ----------------------------- Delete product ------------------------------ */

async function remove(productId: number) {
  await ProductRepo.delete(productId);

  return;
}

export default ProductService;
