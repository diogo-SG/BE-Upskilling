import express from "express";
import { mockUsers } from "./mock-data/users";

const PORT = process.env.PORT || 8080;

const app = express();

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/api/users", (req, res) => {
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

app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = mockUsers.find((user) => user.id === userId);

  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  res.status(200).json(user);
});

app.get;

/* ------------------------------ Start server ------------------------------ */
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
