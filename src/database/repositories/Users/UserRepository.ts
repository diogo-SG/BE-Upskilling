import UserEntity from "../../entities/users/UserEntity";
import BaseRepository from "../BaseRepository";

class UserRepository extends BaseRepository<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }
}

export default UserRepository;
