import express from "express";
import { checkSchema } from "express-validator";
import GenericValidation from "../../../validation/GenericValidation";
import ProductController from "../../../controllers/ProductController";
import ProductValidation from "../../../validation/products/ProductValidation";

const ProductRouter = express.Router();

/* ---------------------------- Get all products ---------------------------- */
ProductRouter.get("/", checkSchema(GenericValidation.getAll), ProductController.getAll);

/* ---------------------------- Get single product ---------------------------- */
ProductRouter.get("/:id", checkSchema(GenericValidation.getSingleById), ProductController.getSingleById);

/* ----------------------------- Add new product ----------------------------- */
ProductRouter.post("/", checkSchema(ProductValidation.addNew), ProductController.addNew);

/* ------------------------------ Edit product ------------------------------ */
ProductRouter.put("/:id", checkSchema(ProductValidation.edit), ProductController.edit);

/* ---------------------------- Remove single product ---------------------------- */
ProductRouter.delete("/:id", checkSchema(GenericValidation.remove), ProductController.remove);

export default ProductRouter;
