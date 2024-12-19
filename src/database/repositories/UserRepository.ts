import User from "../entities/user";
import { UserSchema } from "../types/user";
import { DataSource } from "typeorm";

class UserRepository {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async create(user: UserSchema): Promise<UserSchema> {
    const newUser = await this.dataSource.getRepository(User).save(user);
    return newUser;
  }

  async findByEmail(email: string): Promise<UserSchema | null> {
    const user = await this.dataSource.getRepository(User).findOne({ where: { email } });
    return user;
  }

  async findById(id: number): Promise<UserSchema | null> {
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
