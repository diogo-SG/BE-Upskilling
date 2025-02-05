import { Request, Response, NextFunction } from "express";
import { ErrorWithStatus } from "../middleware/errorHandler";
import UsersService from "../services/UserService";
import { matchedData, validationResult } from "express-validator";
import UserEntity from "../database/entities/users/UserEntity";

/* --------------------------------- Service -------------------------------- */
const usersService = new UsersService();

/* -------------------------------------------------------------------------- */
/*                               User Controller                              */
/* -------------------------------------------------------------------------- */

const UserController = {
  getAll,
  getAllPaginated,
  getSingleById,
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
  const fetchedUsers = await usersService.getAll(limit);

  res.status(200).json(fetchedUsers);
}

/* ------------------------ Get all users (paginated) ----------------------- */

async function getAllPaginated(req: Request, res: Response, next: NextFunction) {
  const valRes = validationResult(req);
  if (!valRes.isEmpty()) {
    const error = new ErrorWithStatus(400, "Invalid query params");
    next(error);
  }

  const data = matchedData(req);

  const page = parseInt(data.page as string);
  const limit = parseInt(data.limit as string);
  const sortField = data.sortField as keyof UserEntity;
  const sortOrder = data.sortOrder as "ASC" | "DESC";

  const fetchedUsers = await usersService.getUsersPaginated(page, limit, sortField, sortOrder);

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
  const user = await usersService.getOneById(userId);

  if (!user) {
    const error = new ErrorWithStatus(404, "User not found");
    next(error);
  }

  // 200 OK = Generic success response
  res.status(200).json(user);
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

  // We need at least one field to update. Id is always included so we need at least one more
  if (Object.keys(incomingUpdateData).length <= 1) {
    const error = new ErrorWithStatus(400, "At least one update field is required");
    next(error);
  }

  try {
    const updatedUser = await usersService.edit(incomingUpdateData);

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
    await usersService.remove(userId);

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
  const orders = await usersService.getAllOrders(userId);
  res.status(200).json(orders);
}

export default UserController;
