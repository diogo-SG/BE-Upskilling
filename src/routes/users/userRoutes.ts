import express from "express";
import UserController from "../../controllers/UserController";
import UserValidation from "../../validation/users/UserValidation";
import GenericValidation from "../../validation/GenericValidation";
import { checkSchema } from "express-validator";
import UserOrderRouter from "./userOrders/userOrderRoutes";

const router = express.Router();
router.use("/:id/orders", UserOrderRouter);

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */
/* -------------------------------- All users ------------------------------- */

router.get("/", checkSchema(GenericValidation.getAll), UserController.getAll);

/* ----------------------------- Single user ------------------------------ */

router.get("/:id", checkSchema(GenericValidation.getSingleById), UserController.getSingleById);

/* ------------------------------ Add user ------------------------------- */

router.post("/", checkSchema(UserValidation.addNew), UserController.addNew);

/* ------------------------------ Edit user ------------------------------ */

router.put("/:id", checkSchema(UserValidation.edit), UserController.edit);

/* ------------------------------ Delete user ------------------------------ */

router.delete("/:id", checkSchema(GenericValidation.remove), UserController.remove);

export default router;
