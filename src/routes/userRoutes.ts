import { mockUsers } from "../mock-data/users";
import express from "express";

const router = express.Router();

/* -------------------------------- All users ------------------------------- */
router.get("/", (req, res) => {
  // check for a "limit" query parameter

  const queryLimit = req.query.limit;

  if (typeof queryLimit === "undefined") {
    res.status(200).json(mockUsers);
    return;
  }

  const limit = parseInt(queryLimit as string);
  if (limit < 0 || isNaN(limit)) {
    res.status(400).json({ error: "Limit should be a positive number" });
    return;
  }

  const slicedUsers = mockUsers.slice(0, limit);

  res.status(200).json(slicedUsers);
});

/* ------------------------------- Single user ------------------------------ */
router.get("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = mockUsers.find((user) => user.id === userId);

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  // 200 OK = Generic success response
  res.status(200).json(user);
});

/* ------------------------------ Add new user ------------------------------ */

router.post("/", (req, res) => {
  const newUser = req.body;

  if (!newUser.name || !newUser.email) {
    res.status(400).json({ error: "Please provide name and email" });
    return;
  }

  newUser.id = mockUsers.length + 1;
  const mockUsersWithNew = [...mockUsers, newUser];
  // 201 Created = We created a new resource
  res.status(201).json(mockUsersWithNew);
});

export default router;

/* -------------------------------- Edit user ------------------------------- */

router.put("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = mockUsers.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const updatedUser = { ...mockUsers[userIndex], ...req.body };
  mockUsers[userIndex] = updatedUser;

  res.status(200).json(updatedUser);
});

/* ------------------------------- Delete user ------------------------------ */

router.delete("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = mockUsers.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  // 204 No content = We did the thing, no need to return anything
  res.status(204).send();
});
