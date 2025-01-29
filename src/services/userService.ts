import UserRepository from "../database/repositories/Users/UserRepository";
import { ErrorWithStatus } from "../middleware/errorHandler";
import OrderRepository from "../database/repositories/Orders/OrderRepository";
import UserEntity from "../database/entities/users/UserEntity";
import { EntityNoMetadata, PaginatedQueryResponse } from "../database/types/types";
import { BaseService } from "./BaseService";
import { DataSource } from "typeorm";
import dataSource from "../database/dataSource";

/* -------------------------------------------------------------------------- */
/*                                Users Service                               */
/* -------------------------------------------------------------------------- */

class UserService extends BaseService {
  private UserRepo: UserRepository;
  private OrderRepo: OrderRepository;

  constructor(activeDataSource: DataSource = dataSource) {
    super(activeDataSource);
    this.UserRepo = new UserRepository(activeDataSource);
    this.OrderRepo = new OrderRepository(activeDataSource);
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Methods                                  */
  /* -------------------------------------------------------------------------- */
  async getAll(limit?: number) {
    const users = await this.UserRepo.findAll(limit);
    return users;
  }

  // Paginated fetch
  async getUsersPaginated(
    page: number,
    limit: number,
    sortField: keyof UserEntity,
    sortOrder: "ASC" | "DESC"
  ): Promise<PaginatedQueryResponse<UserEntity> | null> {
    const users = await this.UserRepo.findAllPaginated(page, limit, sortField, sortOrder);
    return users;
  }

  async getOneById(userId: number) {
    const user = await this.UserRepo.findOneById(userId);
    if (!user) {
      throw new ErrorWithStatus(404, "User not found");
    }
    return user;
  }

  async addNew(newUserData: EntityNoMetadata<UserEntity>) {
    const { name, email, password, username } = newUserData;

    try {
      const emailCheckRes = await this.UserRepo.findOneByEmail(email);
      if (emailCheckRes) {
        throw new ErrorWithStatus(400, "User with this email already exists");
      }

      const addedUser = await this.UserRepo.create({ name, email, password, username });
      return addedUser;
    } catch (error) {
      if (error instanceof ErrorWithStatus) {
        throw error;
      }

      throw new ErrorWithStatus(500, `Something went wrong: ${error})}`);
    }
  }

  async edit(userData: UserEntity) {
    try {
      // todo move this validation to controller
      let user = await this.UserRepo.findOneById(userData.id);
      if (!user) {
        throw new ErrorWithStatus(404, "User not found");
      }

      if (userData.email) {
        let userWithSameEmail = await this.UserRepo.findOneByEmail(userData.email);
        if (userWithSameEmail && userWithSameEmail.id !== userData.id) {
          throw new ErrorWithStatus(400, "User with this email already exists");
        }
      }

      const updatedUser = await this.UserRepo.update(userData);
      return updatedUser;
    } catch (error) {
      console.log(error);
      throw new ErrorWithStatus(500, "Something went wrong!");
    }
  }

  async remove(userId: number) {
    try {
      const user = await this.UserRepo.findOneById(userId);
      if (!user) {
        throw new ErrorWithStatus(404, "User not found");
      }

      await this.UserRepo.delete(userId);
    } catch (error) {
      throw new ErrorWithStatus(500, "Something went wrong");
    }
  }

  async getAllOrders(userId: number) {
    const orders = await this.OrderRepo.findAllByUserId(userId);
    return orders;
  }
}

export default UserService;
