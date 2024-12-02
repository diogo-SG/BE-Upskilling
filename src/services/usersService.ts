/* -------------------------------------------------------------------------- */
/*                                Users Service                               */
/* -------------------------------------------------------------------------- */

import * as UserQueries from "../database/queries/userQueries";
import { ErrorWithStatus } from "../middleware/errorHandler";
import { UserSchema } from "../schemas/users";

const UsersService = {
  getAllUsers,
  getSingleUserById,
  addNewUser,
  editUser,
  deleteUser,
};

/* ------------------------------ Get all users ----------------------------- */

async function getAllUsers(limit?: number) {
  const users = await UserQueries.getAllUsers(limit);
  return users;
}

/* ----------------------------- Get single user ---------------------------- */
async function getSingleUserById(userId: number) {
  const user = await UserQueries.getSingleUserById(userId);
  if (!user) {
    throw new ErrorWithStatus(404, "User not found");
  }
  return user;
}

/* ------------------------------ Add new user ------------------------------ */

async function addNewUser(newUserData: Partial<UserSchema>) {
  const { name, email, password, username } = newUserData;

  if (!name || !email || !password || !username) {
    throw new ErrorWithStatus(400, "Name, email, username and password are required");
  }

  try {
    const emailCheckRes = await UserQueries.checkIfUserExistsByEmail(email);
    if (emailCheckRes) {
      throw new ErrorWithStatus(400, "User with this email already exists");
    }

    const addedUser = await UserQueries.addNewUser(name, email, password, username);
    return addedUser;
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      throw error;
    }

    throw new ErrorWithStatus(500, "Something went wrong");
  }
}

/* -------------------------------- Edit user ------------------------------- */

async function editUser(userId: number, userData: Partial<UserSchema>) {
  let user = await UserQueries.getSingleUserById(userId);
  if (!user) {
    throw new ErrorWithStatus(404, "User not found");
  }

  try {
    // todo make email primary key, check if email is already taken
    const updatedUser = await UserQueries.editUser(userId, userData);
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw new ErrorWithStatus(500, "Something went wrong!");
  }
}

/* ----------------------------- Delete user ------------------------------ */

async function deleteUser(userId: number) {
  try {
    const user = await UserQueries.getSingleUserById(userId);
    if (!user) {
      throw new ErrorWithStatus(404, "User not found");
    }

    await UserQueries.deleteUser(userId);
  } catch (error) {
    throw new ErrorWithStatus(500, "Something went wrong");
  }
}

export default UsersService;
