import { Request, Response, NextFunction } from "express";
import { ErrorWithStatus } from "../middleware/errorHandler";
import UsersService from "../services/UserService";
import { matchedData, validationResult } from "express-validator";
import UserEntity from "../database/entities/users/UserEntity";
import { EntitySansId } from "../database/types/types";

/* -------------------------------------------------------------------------- */
/*                               User Controller                              */
/* -------------------------------------------------------------------------- */

const UserController = {
  getAll,
  getSingleById,
  addNew,
  edit,
  remove,
  getAllOrders,
};

/* ------------------------------ Get all users ----------------------------- */

/** Get all users (or just some if the limit query param is specified)
 * @returns - a JSON response with the users
 * @throws - a 400 error if the limit query param is invalid
 * @example - GET /api/users?limit=5
 */
async function getAll(req: Request, res: Response, next: NextFunction) {
  const valRes = validationResult(req);
  if (!valRes.isEmpty()) {
    console.log(valRes);
    const error = new ErrorWithStatus(400, "Limit must be a positive number");
    next(error);
  }

  const data = matchedData(req);

  const limit = parseInt(data.limit as string);
  const fetchedUsers = await UsersService.getAll(limit);

  res.status(200).json(fetchedUsers);
}

/* ----------------------------- Get single user ---------------------------- */

/** Fetches a single user
 * @returns - a JSON response with the user
 * @throws - a 404 error if the user is not found
 * @example - GET /api/users/1
 */
async function getSingleById(req: Request, res: Response, next: NextFunction) {
  if (!validationResult(req).isEmpty()) {
    const error = new ErrorWithStatus(400, "User ID must be a number");
    next(error);
  }

  const userId = parseInt(req.params.id);
  const user = await UsersService.getOneById(userId);

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
async function addNew(req: Request, res: Response, next: NextFunction) {
  if (!validationResult(req).isEmpty()) {
    const errorsList = validationResult(req).array();

    // We could make this look much nicer but I'm lazy and don't think it's worth the time investment atm
    const errorMsg = errorsList
      .map((error) => {
        if (error.type === "field") {
          return `${error.path}: ${error.msg}`;
        }
      })
      .join("; ");
    const error = new ErrorWithStatus(400, errorMsg);
    next(error);
  }
  const data = matchedData(req) as EntitySansId<UserEntity>;

  try {
    const newUser = await UsersService.addNew(data);
    console.log(newUser);
    // 201 Created = We created a new resource
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

/* -------------------------------- Edit user ------------------------------- */

/** Edits a user with a given id
 * @returns - a JSON response with the updated user
 * @throws - a 404 error if the user is not found
 * @example - PUT /api/users/1
 */
async function edit(req: Request, res: Response, next: NextFunction) {
  const userId = parseInt(req.params.id);

  if (!validationResult(req).isEmpty()) {
    const errorsList = validationResult(req).array();
    // We could make this look much nicer but I'm lazy and don't think it's worth the time investment atm
    const errorMsg = errorsList
      .map((error) => {
        if (error.type === "field") {
          return `${error.path}: ${error.msg}`;
        }
      })
      .join("; ");
    const error = new ErrorWithStatus(400, errorMsg);

    next(error);
  }

  const incomingUpdateData = matchedData(req) as UserEntity;

  if (!incomingUpdateData.name && !incomingUpdateData.email) {
    const error = new ErrorWithStatus(400, "At least one update field is required");
    next(error);
  }

  try {
    const updatedUser = await UsersService.edit(incomingUpdateData);

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
}

/* ------------------------------- Delete user ------------------------------ */

/** Deletes an user with a given id
 * @returns - a 204 response
 * @throws - a 404 error if the user is not found
 * @example - DELETE /api/users/1
 */
async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    if (!validationResult(req).isEmpty()) {
      const error = new ErrorWithStatus(400, "User ID must be a number");
      next(error);
    }
    const userId = parseInt(req.params.id);
    await UsersService.remove(userId);

    // 204 No content = We did the thing, no need to return anything
    // I guess in this case a 200 OK would also be fine with a message saying it was deleted successfully
    // but this helps me try different statuses out so I'm aware of them
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

/* -------------------------------------------------------------------------- */
/*                                 User orders                                */
/* -------------------------------------------------------------------------- */

export async function getAllOrders(req: Request, res: Response, next: NextFunction) {
  const userId = parseInt(req.params.id);
  const orders = await UsersService.getAllOrders(userId);
  res.status(200).json(orders);
}

export default UserController;
