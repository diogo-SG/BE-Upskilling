// import express from "express";
// import { checkSchema } from "express-validator";
// import OrderController from "../../controllers/orderController";
// import OrderValSchemas from "../../validation/orderValidation";

// const { getAllOrders, getSingleOrderById, addNewOrder, editOrder, deleteOrder } = OrderController;

// const router = express.Router();

// /* ------------------------------- All orders ------------------------------ */
// router.get("/", checkSchema(OrderValSchemas.getAllOrders), getAllOrders);

// /* ----------------------------- Single order ----------------------------- */

// router.get("/:id", checkSchema(OrderValSchemas.getSingleOrderById), getSingleOrderById);

// /* ------------------------------ Add order ------------------------------ */

// router.post("/", checkSchema(OrderValSchemas.addNewOrder), addNewOrder);

// /* ------------------------------ Edit order ----------------------------- */

// router.put("/:id", checkSchema(OrderValSchemas.editOrder), editOrder);

// /* ----------------------------- Delete order ---------------------------- */

// router.delete("/:id", checkSchema(OrderValSchemas.deleteOrder), deleteOrder);

// export default router;
