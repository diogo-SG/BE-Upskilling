import express from "express";
import { checkSchema } from "express-validator";
import OrderController from "../../controllers/OrderController";
import OrderValidation from "../../validation/orders/OrderValidation";
import GenericValidation from "../../validation/GenericValidation";

const OrderRouter = express.Router();

/* ------------------------------- All orders ------------------------------ */
OrderRouter.get("/", checkSchema(GenericValidation.getAll), OrderController.getAll);

/* ----------------------------- Single order ----------------------------- */

OrderRouter.get("/:id", checkSchema(GenericValidation.getSingleById), OrderController.getSingleById);

/* ------------------------------ Add order ------------------------------ */

OrderRouter.post("/", checkSchema(OrderValidation.addNew), OrderController.addNew);

/* ------------------------------ Edit order ----------------------------- */

OrderRouter.put("/:id", checkSchema(OrderValidation.edit), OrderController.edit);

/* ----------------------------- Delete order ---------------------------- */

OrderRouter.delete("/:id", checkSchema(GenericValidation.remove), OrderController.remove);

export default OrderRouter;
