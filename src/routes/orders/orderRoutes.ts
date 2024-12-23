import express from "express";
import { checkSchema } from "express-validator";
import OrderController from "../../controllers/OrderController";
import OrderValidation from "../../validation/orders/OrderValidation";
import GenericValidation from "../../validation/GenericValidation";

const router = express.Router();

/* ------------------------------- All orders ------------------------------ */
router.get("/", checkSchema(GenericValidation.getAll), OrderController.getAll);

/* ----------------------------- Single order ----------------------------- */

router.get("/:id", checkSchema(GenericValidation.getSingleById), OrderController.getSingleById);

/* ------------------------------ Add order ------------------------------ */

router.post("/", checkSchema(OrderValidation.addNew), OrderController.addNew);

/* ------------------------------ Edit order ----------------------------- */

router.put("/:id", checkSchema(OrderValidation.edit), OrderController.edit);

/* ----------------------------- Delete order ---------------------------- */

router.delete("/:id", checkSchema(GenericValidation.remove), OrderController.remove);

export default router;
