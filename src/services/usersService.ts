/* -------------------------------------------------------------------------- */
/*                                Users Service                               */
/* -------------------------------------------------------------------------- */

import { ErrorWithStatus } from "../middleware/errorHandler";
import { mockUsers } from "../mock-data/users";
import { UserSchema } from "../schemas/users";

const UsersService = {
  getAllUsers,
  getSingleUser,
  addNewUser,
  editUser,
  deleteUser,
};

// These would all be database operations in a real app, so they're async

/* ------------------------------ Get all users ----------------------------- */

async function getAllUsers(limit?: number) {
  const slicedUsers = mockUsers.slice(0, limit);
  return slicedUsers;
}

/* ----------------------------- Get single user ---------------------------- */
async function getSingleUser(userId: number) {
  const user = findUser(userId);
  if (!user) {
    throw new ErrorWithStatus(404, "User not found");
  }
  return user;
}

/* ------------------------------ Add new user ------------------------------ */

async function addNewUser(newUserData: Partial<UserSchema>) {
  const { name, email } = newUserData;

  if (!name || !email) {
    throw new ErrorWithStatus(400, "Name and email are required");
  }

  const newUser = {
    id: mockUsers.length + 1,
    name,
    email,
  };

  mockUsers.push(newUser);
  return newUser;
}

/* -------------------------------- Edit user ------------------------------- */

async function editUser(userId: number, userData: Partial<UserSchema>) {
  let user = findUser(userId);
  if (!user) {
    throw new ErrorWithStatus(404, "User not found");
  }

  try {
    user = {
      ...user,
      ...userData,
      id: userId,
    };

    return user;
  } catch (error) {
    throw new ErrorWithStatus(500, "Something went wrong!");
  }
}

/* ----------------------------- Delete user ------------------------------ */

async function deleteUser(userId: number) {
  const userIndex = mockUsers.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    throw new ErrorWithStatus(404, "User not found");
  }

  const deletedUser = mockUsers.splice(userIndex, 1)[0];
  return deletedUser;
}

export default UsersService;

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function findUser(userId: number) {
  const user = mockUsers.find((user) => user.id === userId);
  if (!user) {
    return null;
  }
  return user;
}
