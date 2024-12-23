import UserRepository from "../database/repositories/Users/UserRepository";
import { ErrorWithStatus } from "../middleware/errorHandler";
import OrderRepository from "../database/repositories/Orders/OrderRepository";
import UserEntity from "../database/entities/users/user";
import { EntitySansId } from "../database/types/types";

/* -------------------------------------------------------------------------- */
/*                                Users Service                               */
/* -------------------------------------------------------------------------- */
const UserRepo = new UserRepository();
const OrderRepo = new OrderRepository();

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
  const users = await UserRepo.findAll(limit);
  return users;
}

/* ----------------------------- Get single user ---------------------------- */
async function getOneById(userId: number) {
  const user = await UserRepo.findOneById(userId);
  if (!user) {
    throw new ErrorWithStatus(404, "User not found");
  }
  return user;
}

/* ------------------------------ Add new user ------------------------------ */

async function addNew(newUserData: EntitySansId<UserEntity>) {
  const { name, email, password, username } = newUserData;

  try {
    const emailCheckRes = await UserRepo.findOneByEmail(email);
    if (emailCheckRes) {
      throw new ErrorWithStatus(400, "User with this email already exists");
    }

    const addedUser = await UserRepo.create({ name, email, password, username });
    return addedUser;
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      throw error;
    }

    throw new ErrorWithStatus(500, "Something went wrong");
  }
}

/* -------------------------------- Edit user ------------------------------- */

async function edit(userData: UserEntity) {
  try {
    // todo move this validation to controller
    let user = await UserRepo.findOneById(userData.id);
    if (!user) {
      throw new ErrorWithStatus(404, "User not found");
    }

    if (userData.email) {
      let userWithSameEmail = await UserRepo.findOneByEmail(userData.email);
      if (userWithSameEmail && userWithSameEmail.id !== userData.id) {
        throw new ErrorWithStatus(400, "User with this email already exists");
      }
    }

    const updatedUser = await UserRepo.update(userData);
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw new ErrorWithStatus(500, "Something went wrong!");
  }
}

/* ----------------------------- Delete user ------------------------------ */

async function remove(userId: number) {
  try {
    const user = await UserRepo.findOneById(userId);
    if (!user) {
      throw new ErrorWithStatus(404, "User not found");
    }

    await UserRepo.delete(userId);
  } catch (error) {
    throw new ErrorWithStatus(500, "Something went wrong");
  }
}

/* -------------------------------------------------------------------------- */
/*                                 User orders                                */
/* -------------------------------------------------------------------------- */

async function getAllOrders(userId: number) {
  const orders = await OrderRepo.findAllByUserId(userId);
  return orders;
}

export default UserService;
