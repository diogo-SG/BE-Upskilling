import express from "express";
import { checkSchema } from "express-validator";
import UserController from "../../../controllers/UserController";
import GenericValidation from "../../../validation/GenericValidation";

/* -------------------------------------------------------------------------- */
/*                                 User orders                                */
/* -------------------------------------------------------------------------- */

const userOrderRouter = express.Router({ mergeParams: true });

/* --------------------------- All orders for user -------------------------- */

userOrderRouter.get("/", checkSchema(GenericValidation.getAll), UserController.getAll);

export default userOrderRouter;
