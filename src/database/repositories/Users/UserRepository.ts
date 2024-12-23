import UserEntity from "../../entities/users/user";
import { UserSchema } from "../../types/user";
import { DataSource } from "typeorm";
import BaseRepository from "../BaseRepository";

class UserRepository extends BaseRepository<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  async findOneByEmail(email: string): Promise<UserSchema | null> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }
}

export default UserRepository;
