import express from "express";
import UserController from "../../../controllers/UserController";
import UserValidation from "../../../validation/users/UserValidation";
import GenericValidation from "../../../validation/GenericValidation";
import { checkSchema } from "express-validator";
import UserOrderRouter from "./UserOrders/UserOrderRoutes";

const UserRouter = express.Router();
UserRouter.use("/:id/orders", UserOrderRouter);

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */
/* -------------------------------- All users ------------------------------- */

UserRouter.get("/", checkSchema(UserValidation.getAllPaginated), UserController.getAllPaginated);

/* ----------------------------- Single user ------------------------------ */

UserRouter.get("/:id", checkSchema(GenericValidation.getSingleById), UserController.getSingleById);

/* ------------------------------ Edit user ------------------------------ */

UserRouter.put("/:id", checkSchema(UserValidation.edit), UserController.edit);

/* ------------------------------ Delete user ------------------------------ */

UserRouter.delete("/:id", checkSchema(GenericValidation.remove), UserController.remove);

export default UserRouter;
