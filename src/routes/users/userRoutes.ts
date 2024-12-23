import UserController from "../../controllers/UserController";
import UserValSchemas from "../../validation/users/UserValidation";
import GenericValidation from "../../validation/GenericValidation";
import { checkSchema } from "express-validator";
import express from "express";
import userOrderRouter from "./userOrders/userOrderRoutes";

const router = express.Router();
router.use("/:id/orders", userOrderRouter);

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */
/* -------------------------------- All users ------------------------------- */

router.get("/", checkSchema(GenericValidation.getAll), UserController.getAll);

/* ----------------------------- Single user ------------------------------ */

router.get("/:id", checkSchema(GenericValidation.getSingleById), UserController.getSingleById);

/* ------------------------------ Add user ------------------------------- */

router.post("/", checkSchema(UserValSchemas.addNewUser), UserController.addNew);

/* ------------------------------ Edit user ------------------------------ */

router.put("/:id", checkSchema(UserValSchemas.editUser), UserController.edit);

/* ------------------------------ Delete user ------------------------------ */

router.delete("/:id", checkSchema(UserValSchemas.deleteUser), UserController.remove);

export default router;
