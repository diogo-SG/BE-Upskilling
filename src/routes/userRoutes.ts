import { ErrorWithStatus } from "../middleware/errorHandler";
import { mockUsers } from "../mock-data/users";
import express from "express";

const router = express.Router();

/* -------------------------------- All users ------------------------------- */
router.get("/", (req, res, next) => {
  // check for a "limit" query parameter

  const queryLimit = req.query.limit;

  if (typeof queryLimit === "undefined") {
    res.status(200).json(mockUsers);
    return;
  }

  const limit = parseInt(queryLimit as string);
  if (limit < 0 || isNaN(limit)) {
    const error = new ErrorWithStatus(400, "Limit must be a positive number");
    next(error);
  }

  const slicedUsers = mockUsers.slice(0, limit);

  res.status(200).json(slicedUsers);
});

/* ------------------------------- Single user ------------------------------ */
router.get("/:id", (req, res, next) => {
  const userId = parseInt(req.params.id);
  const user = mockUsers.find((user) => user.id === userId);

  if (!user) {
    const error = new ErrorWithStatus(404, "User not found");
  }

  // 200 OK = Generic success response
  res.status(200).json(user);
});

/* ------------------------------ Add new user ------------------------------ */

router.post("/", (req, res, next) => {
  const newUser = req.body;

  if (!newUser.name || !newUser.email) {
    const error = new ErrorWithStatus(400, "Name and email are required");
    next(error);
  }

  newUser.id = mockUsers.length + 1;
  const mockUsersWithNew = [...mockUsers, newUser];
  // 201 Created = We created a new resource
  res.status(201).json(mockUsersWithNew);
});

export default router;

/* -------------------------------- Edit user ------------------------------- */

router.put("/:id", (req, res, next) => {
  const userId = parseInt(req.params.id);
  const userIndex = mockUsers.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    const error = new ErrorWithStatus(404, "User not found");
    next(error);
  }

  const updatedUser = { ...mockUsers[userIndex], ...req.body };
  mockUsers[userIndex] = updatedUser;

  res.status(200).json(updatedUser);
});

/* ------------------------------- Delete user ------------------------------ */

router.delete("/:id", (req, res, next) => {
  const userId = parseInt(req.params.id);
  const userIndex = mockUsers.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    const error = new ErrorWithStatus(404, "User not found");
    next(error);
  }

  // 204 No content = We did the thing, no need to return anything
  res.status(204).send();
});
