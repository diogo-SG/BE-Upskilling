import User from "../entities/users/user";
import { UserSchema } from "../types/user";
import { DataSource } from "typeorm";

// todo create base repository class

class UserRepository {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async create(user: Partial<UserSchema>): Promise<UserSchema> {
    const newUser = await this.dataSource.getRepository(User).save(user);
    return newUser;
  }

  async findAll(limit?: number): Promise<UserSchema[]> {
    const users = await this.dataSource.getRepository(User).find({
      take: limit,
    });
    return users;
  }

  async findOneByEmail(email: string): Promise<UserSchema | null> {
    const user = await this.dataSource.getRepository(User).findOne({ where: { email } });
    return user;
  }

  async findOneById(id: number): Promise<UserSchema | null> {
    const user = await this.dataSource.getRepository(User).findOneBy({ id });
    return user;
  }

  async update(user: UserSchema): Promise<UserSchema> {
    const updatedUser = await this.dataSource.getRepository(User).save(user);
    return updatedUser;
  }

  async delete(id: number): Promise<void> {
    await this.dataSource.getRepository(User).delete(id);
  }
}

export default UserRepository;
