import express from "express";
import { checkSchema } from "express-validator";
import UserValSchemas from "../../../validation/userValidation";
import UserController from "../../../controllers/userController";

/* -------------------------------------------------------------------------- */
/*                                 User orders                                */
/* -------------------------------------------------------------------------- */

const userOrderRouter = express.Router({ mergeParams: true });

/* --------------------------- All orders for user -------------------------- */

userOrderRouter.get("/", checkSchema(UserValSchemas.getAllOrdersFromUser), UserController.getAllOrdersFromUser);

export default userOrderRouter;
