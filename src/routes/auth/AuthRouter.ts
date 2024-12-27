import express from "express";
import { checkSchema } from "express-validator";
import AuthController from "../../controllers/AuthController";
import GenericValidation from "../../validation/GenericValidation";

const AuthRouter = express.Router();

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */

/* ------------------------------- Login user ------------------------------ */

AuthRouter.post("/login", checkSchema(GenericValidation.login), AuthController.login);

/* --------------------------------- Logout --------------------------------- */

AuthRouter.post("/logout", AuthController.logout);
export default AuthRouter;
