import { Request, Response, NextFunction } from "express";
import { mockUsers } from "../mock-data/users";
import { ErrorWithStatus } from "../middleware/errorHandler";

/* -------------------------------------------------------------------------- */
/*                               User Controller                              */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Get all users ----------------------------- */

/** Get all users (or just some if the limit query param is specified)
 * @returns - a JSON response with the users
 * @throws - a 400 error if the limit query param is invalid
 * @example - GET /api/users?limit=5
 */
export function getAllUsers(req: Request, res: Response, next: NextFunction) {
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
}

/* ----------------------------- Get single user ---------------------------- */

/** Fetches a single user
 * @returns - a JSON response with the user
 * @throws - a 404 error if the user is not found
 * @example - GET /api/users/1
 */
export function getSingleUser(req: Request, res: Response, next: NextFunction) {
  const userId = parseInt(req.params.id);
  const user = mockUsers.find((user) => user.id === userId);

  if (!user) {
    const error = new ErrorWithStatus(404, "User not found");
    next(error);
  }

  // 200 OK = Generic success response
  res.status(200).json(user);
}

/* ------------------------------ Add new user ------------------------------ */

/** Adds a new user
 * @returns - a JSON response with the new user
 * @throws - a 400 error if the request body is invalid
 * @example - POST /api/users
 */
export function addNewUser(req: Request, res: Response, next: NextFunction) {
  const newUser = req.body;

  if (!newUser.name || !newUser.email) {
    const error = new ErrorWithStatus(400, "Name and email are required");
    next(error);
  }

  newUser.id = mockUsers.length + 1;
  const mockUsersWithNew = [...mockUsers, newUser];

  // 201 Created = We created a new resource
  res.status(201).json(mockUsersWithNew);
}

/* -------------------------------- Edit user ------------------------------- */

/** Edits a user with a given id
 * @returns - a JSON response with the updated user
 * @throws - a 404 error if the user is not found
 * @example - PUT /api/users/1
 */
export function editUser(req: Request, res: Response, next: NextFunction) {
  const userId = parseInt(req.params.id);
  const userIndex = mockUsers.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    const error = new ErrorWithStatus(404, "User not found");
    next(error);
  }

  const updatedUser = { ...mockUsers[userIndex], ...req.body };
  mockUsers[userIndex] = updatedUser;

  res.status(200).json(updatedUser);
}

/* ------------------------------- Delete user ------------------------------ */

/** Deletes an user with a given id
 * @returns - a 204 response
 * @throws - a 404 error if the user is not found
 * @example - DELETE /api/users/1
 */
export function deleteUser(req: Request, res: Response, next: NextFunction) {
  const userId = parseInt(req.params.id);
  const userIndex = mockUsers.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    const error = new ErrorWithStatus(404, "User not found");
    next(error);
  }

  // 204 No content = We did the thing, no need to return anything
  res.status(204).send();
}
