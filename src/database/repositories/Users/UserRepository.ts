import { DataSource, FindOptionsOrder } from "typeorm";
import UserEntity from "../../entities/users/UserEntity";
import BaseRepository from "../BaseRepository";
import { PaginatedQueryResponse } from "../../types/types";

class UserRepository extends BaseRepository<UserEntity> {
  constructor(dataSource?: DataSource) {
    super(UserEntity, dataSource);
  }

  async findAll(limit?: number): Promise<UserEntity[]> {
    const users = await this.repository.find({
      take: limit ? limit : 100,
      relations: ["orders"],
    });
    return users;
  }

  // todo find way to extend this to avoid copy paste job from BaseRepository just to add relations
  async findAllPaginated(
    page?: number,
    limit?: number,
    sortField?: string,
    sortOrder?: "ASC" | "DESC"
  ): Promise<PaginatedQueryResponse<UserEntity> | null> {
    if (!sortField) sortField = "id";
    if (!sortOrder) sortOrder = "ASC";
    if (!limit) limit = 10;
    if (!page) page = 1;

    const order = {
      [sortField]: sortOrder,
    } as FindOptionsOrder<UserEntity>;

    const [entries, total] = await this.repository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      order,
      relations: ["orders"],
    });
    return { entries, total, page, limit };
  }

  async findOneById(id: number): Promise<UserEntity | null> {
    const user = await this.repository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });
    return user;
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }
}

export default UserRepository;
