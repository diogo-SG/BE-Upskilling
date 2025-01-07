import express from "express";
import { checkSchema } from "express-validator";
import AuthController from "../../controllers/AuthController";
import AuthValidation from "../../validation/auth/AuthValidation";

const AuthRouter = express.Router();

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */

/* --------------------------------- Signup --------------------------------- */

AuthRouter.post("/signup", checkSchema(AuthValidation.signup), AuthController.signup);

/* ------------------------------- Login user ------------------------------ */

AuthRouter.post("/login", checkSchema(AuthValidation.login), AuthController.login);

/* --------------------------------- Logout --------------------------------- */

AuthRouter.post("/logout", checkSchema(AuthValidation.logout), AuthController.logout);

export default AuthRouter;
