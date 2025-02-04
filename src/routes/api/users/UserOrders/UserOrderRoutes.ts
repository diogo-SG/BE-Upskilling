import express from "express";
import { checkSchema } from "express-validator";
import UserController from "../../../../controllers/UserController";
import GenericValidation from "../../../../validation/GenericValidation";

/* -------------------------------------------------------------------------- */
/*                                 User orders                                */
/* -------------------------------------------------------------------------- */

const UserOrderRouter = express.Router({ mergeParams: true });

/* --------------------------- All orders for user -------------------------- */

UserOrderRouter.get("/", checkSchema(GenericValidation.getAll), UserController.getAllOrders);

export default UserOrderRouter;
