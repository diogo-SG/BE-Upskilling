import { mockUsers } from "../mock-data/users";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  // check for a "limit" query parameter

  const queryLimit = req.query.limit;

  if (typeof queryLimit === "undefined") {
    res.status(200).json(mockUsers);
    return;
  }

  const limit = parseInt(queryLimit as string);
  if (limit < 0 || isNaN(limit)) {
    res.status(400).send("Limit should be a positive number");
    return;
  }

  const slicedUsers = mockUsers.slice(0, limit);

  res.status(200).json(slicedUsers);
});

router.get("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = mockUsers.find((user) => user.id === userId);

  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  res.status(200).json(user);
});

export default router;
