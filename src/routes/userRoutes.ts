import { addNewUser, deleteUser, editUser, getAllUsers, getSingleUser } from "../controllers/usersController";

import express from "express";

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getSingleUser);

router.post("/", addNewUser);

router.put("/:id", editUser);

router.delete("/:id", deleteUser);

export default router;
