import UsersController from "../controllers/usersController";
import UserValSchemas from "../validation/userValidation";
import { checkSchema } from "express-validator";
import express from "express";

const { getAllUsers, getSingleUserById, addNewUser, editUser, deleteUser } = UsersController;

const router = express.Router();

/* -------------------------------- All users ------------------------------- */

router.get("/", checkSchema(UserValSchemas.getAllUsers), getAllUsers);

/* ----------------------------- Single user ------------------------------ */

router.get("/:id", checkSchema(UserValSchemas.getSingleUserById), getSingleUserById);

/* ------------------------------ Add user ------------------------------- */

router.post("/", checkSchema(UserValSchemas.addNewUser), addNewUser);

/* ------------------------------ Edit user ------------------------------ */

router.put("/:id", checkSchema(UserValSchemas.editUser), editUser);

/* ------------------------------ Delete user ------------------------------ */

router.delete("/:id", checkSchema(UserValSchemas.deleteUser), deleteUser);

export default router;
