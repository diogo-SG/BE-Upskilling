import UsersController from "../controllers/usersController";
import { query, param, body, checkSchema } from "express-validator";

const { getAllUsers, getSingleUser, addNewUser, editUser, deleteUser } = UsersController;

import express from "express";
import { editUserValidationSchema } from "../validationSchemas/userValidationSchemas";

const router = express.Router();

/* -------------------------------- All users ------------------------------- */
const allUsersValidation = [query("limit").isNumeric().withMessage("Limit must be a number").optional()];

router.get("/", allUsersValidation, getAllUsers);

/* ----------------------------- Single user ------------------------------ */
const singleUserValidation = [param("id").isNumeric().withMessage("User ID must be a number")];

router.get("/:id", singleUserValidation, getSingleUser);

/* ------------------------------ Add user ------------------------------- */
const addNewUserValidation = [
  body("name").trim().notEmpty().withMessage("Name is required").isString().withMessage("Name must be a string"),
  body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Email is invalid"),
];

router.post("/", addNewUserValidation, addNewUser);

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
