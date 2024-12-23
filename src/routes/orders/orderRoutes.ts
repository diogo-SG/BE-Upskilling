import express from "express";
import { checkSchema } from "express-validator";
import OrderController from "../../controllers/OrderController";
import OrderValSchemas from "../../validation/orders/OrderValidation";
import GenericValidation from "../../validation/GenericValidation";

const router = express.Router();

/* ------------------------------- All orders ------------------------------ */
router.get("/", checkSchema(GenericValidation.getAll), OrderController.getAll);

/* ----------------------------- Single order ----------------------------- */

router.get("/:id", checkSchema(GenericValidation.getSingleById), OrderController.getSingleById);

/* ------------------------------ Add order ------------------------------ */

router.post("/", checkSchema(OrderValSchemas.addNewOrder), OrderController.addNew);

/* ------------------------------ Edit order ----------------------------- */

router.put("/:id", checkSchema(OrderValSchemas.editOrder), OrderController.edit);

/* ----------------------------- Delete order ---------------------------- */

router.delete("/:id", checkSchema(OrderValSchemas.deleteOrder), OrderController.remove);

export default router;
