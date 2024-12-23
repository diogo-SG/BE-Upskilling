import UserRepository from "../database/repositories/Users/UserRepository";
import { ErrorWithStatus } from "../middleware/errorHandler";
import { UserSchema } from "../database/types/user";
import dataSource from "../database/dataSource";
import OrderRepository from "../database/repositories/Orders/OrderRepository";

const UserQueries = new UserRepository(dataSource);
const OrderQueries = new OrderRepository(dataSource);

// todo move validation logic to controller
/* -------------------------------------------------------------------------- */
/*                                Users Service                               */
/* -------------------------------------------------------------------------- */

const UserService = {
  getAll,
  getOneById,
  addNew,
  edit,
  remove,
  getAllOrders,
};

/* ------------------------------ Get all users ----------------------------- */

async function getAll(limit?: number) {
  const users = await UserQueries.findAll(limit);
  return users;
}

/* ----------------------------- Get single user ---------------------------- */
async function getOneById(userId: number) {
  const user = await UserQueries.findOneById(userId);
  if (!user) {
    throw new ErrorWithStatus(404, "User not found");
  }
  return user;
}

/* ------------------------------ Add new user ------------------------------ */

async function addNew(newUserData: Partial<UserSchema>) {
  const { name, email, password, username } = newUserData;

  if (!name || !email || !password || !username) {
    throw new ErrorWithStatus(400, "Name, email, username and password are required");
  }

  try {
    const emailCheckRes = await UserQueries.findOneByEmail(email);
    if (emailCheckRes) {
      throw new ErrorWithStatus(400, "User with this email already exists");
    }

    const addedUser = await UserQueries.create({ name, email, password, username });
    return addedUser;
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      throw error;
    }

    throw new ErrorWithStatus(500, "Something went wrong");
  }
}

/* -------------------------------- Edit user ------------------------------- */

async function edit(userData: UserSchema) {
  try {
    if (!userData.id) {
      throw new ErrorWithStatus(400, "User ID is required");
    }
    let user = await UserQueries.findOneById(userData.id);
    if (!user) {
      throw new ErrorWithStatus(404, "User not found");
    }

    if (userData.email) {
      let userWithSameEmail = await UserQueries.findOneByEmail(userData.email);
      if (userWithSameEmail && userWithSameEmail.id !== userData.id) {
        throw new ErrorWithStatus(400, "User with this email already exists");
      }
    }

    const updatedUser = await UserQueries.update(userData);
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw new ErrorWithStatus(500, "Something went wrong!");
  }
}

/* ----------------------------- Delete user ------------------------------ */

async function remove(userId: number) {
  try {
    const user = await UserQueries.findOneById(userId);
    if (!user) {
      throw new ErrorWithStatus(404, "User not found");
    }

    await UserQueries.delete(userId);
  } catch (error) {
    throw new ErrorWithStatus(500, "Something went wrong");
  }
}

/* -------------------------------------------------------------------------- */
/*                                 User orders                                */
/* -------------------------------------------------------------------------- */

async function getAllOrders(userId: number) {
  const orders = await OrderQueries.findAllByUserId(userId);
  return orders;
}

export default UserService;
