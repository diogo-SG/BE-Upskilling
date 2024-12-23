import { Request, Response, NextFunction } from "express";
import { ErrorWithStatus } from "../middleware/errorHandler";
import ProductService from "../services/ProductService";
import { matchedData, validationResult } from "express-validator";
import { EntitySansId } from "../database/types/types";
import ProductEntity from "../database/entities/products/product";

/* -------------------------------------------------------------------------- */
/*                              Product controller                              */
/* -------------------------------------------------------------------------- */

const ProductController = { getAll, getSingleById, addNew, edit, remove };

/* ----------------------------- Get all Products ----------------------------- */
async function getAll(req: Request, res: Response, next: NextFunction) {
  const valRes = validationResult(req);
  if (!valRes.isEmpty()) {
    const error = new ErrorWithStatus(400, "Limit must be a positive number");
    next(error);
  }

  const data = matchedData(req);

  const limit = parseInt(data.limit as string);
  const fetchedProducts = await ProductService.getAll(limit);

  res.status(200).json(fetchedProducts);
}

/* ---------------------------- Get single Product ---------------------------- */
async function getSingleById(req: Request, res: Response, next: NextFunction) {
  if (!validationResult(req).isEmpty()) {
    const error = new ErrorWithStatus(400, "Product ID must be a number");
    next(error);
  }

  const productId = parseInt(req.params.id);
  const product = await ProductService.getById(productId);

  if (!product) {
    const error = new ErrorWithStatus(404, "Product not found");
    next(error);
  }

  res.status(200).json(product);
}

/* ----------------------------- Add new Product ------------------------------ */

async function addNew(req: Request, res: Response, next: NextFunction) {
  if (!validationResult(req).isEmpty()) {
    const error = new ErrorWithStatus(400, "Invalid Product data");
    next(error);
  }

  const data = matchedData(req) as EntitySansId<ProductEntity>;

  const newProduct = await ProductService.addNew(data);
  res.status(201).json(newProduct);
}

/* ------------------------------- Edit Product ------------------------------- */

async function edit(req: Request, res: Response, next: NextFunction) {
  if (!validationResult(req).isEmpty()) {
    const error = new ErrorWithStatus(400, "Invalid Product data");
    next(error);
  }

  const data = matchedData(req) as ProductEntity;

  const editedProduct = await ProductService.edit(data);
  res.status(200).json(editedProduct);
}

/* ----------------------------- Delete Product ------------------------------ */

async function remove(req: Request, res: Response, next: NextFunction) {
  if (!validationResult(req).isEmpty()) {
    const error = new ErrorWithStatus(400, "Product ID must be a number");
    next(error);
  }

  const productId = parseInt(req.params.id);
  await ProductService.remove(productId);

  res.status(204).end();
}

export default ProductController;
