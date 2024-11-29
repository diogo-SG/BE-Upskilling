import UsersController from "../controllers/usersController";
import { query, param, body, checkSchema } from "express-validator";
import express from "express";
import { addNewUserValidationSchema, editUserValidationSchema } from "../validation/userValidation";

const { getAllUsers, getSingleUser, addNewUser, editUser, deleteUser } = UsersController;

const router = express.Router();

// todo move validation to a separate file

/* -------------------------------- All users ------------------------------- */
const allUsersValidation = [query("limit").isNumeric().withMessage("Limit must be a number").optional()];

router.get("/", allUsersValidation, getAllUsers);

/* ----------------------------- Single user ------------------------------ */
const singleUserValidation = [param("id").isNumeric().withMessage("User ID must be a number")];

router.get("/:id", singleUserValidation, getSingleUser);

/* ------------------------------ Add user ------------------------------- */

router.post("/", checkSchema(addNewUserValidationSchema), addNewUser);

/* ------------------------------ Edit user ------------------------------ */
// const editUserValidation = [
//   param("id").isNumeric().withMessage("User ID must be a number"),
//   body("name").trim().isString().withMessage("Name must be a string").optional(),
//   body("email").trim().isEmail().withMessage("Email is invalid").optional(),
// ];

// Trying out validation schemas too

router.put("/:id", checkSchema(editUserValidationSchema), editUser);

/* ------------------------------ Delete user ------------------------------ */

const deleteUserValidation = [param("id").isNumeric().withMessage("User ID must be a number")];

router.delete("/:id", deleteUserValidation, deleteUser);

export default router;
