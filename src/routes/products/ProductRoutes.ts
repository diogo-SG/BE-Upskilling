import express from "express";
import { checkSchema } from "express-validator";
import GenericValidation from "../../validation/GenericValidation";
import ProductController from "../../controllers/ProductController";
import ProductValidation from "../../validation/products/ProductValidation";

const productRouter = express.Router();

/* ---------------------------- Get all products ---------------------------- */
productRouter.get("/", checkSchema(GenericValidation.getAll), ProductController.getAll);

/* ---------------------------- Get single product ---------------------------- */
productRouter.get("/:id", checkSchema(GenericValidation.getSingleById), ProductController.getSingleById);

/* ----------------------------- Add new product ----------------------------- */
productRouter.post("/", checkSchema(ProductValidation.addNew), ProductController.addNew);

/* ------------------------------ Edit product ------------------------------ */
productRouter.put("/:id", checkSchema(ProductValidation.edit), ProductController.edit);

/* ---------------------------- Remove single product ---------------------------- */
productRouter.delete("/:id", checkSchema(GenericValidation.remove), ProductController.remove);

export default productRouter;
