import { DataSource } from "typeorm";
import SessionRepository from "../database/repositories/Users/Sessions/SessionRepository";
import UserRepository from "../database/repositories/Users/UserRepository";
import { accessTokenMaxAge } from "../middleware/deserializeUser";
import { ErrorWithStatus } from "../middleware/errorHandler";
import { signJWT } from "../utils/jwt-utils";
import { BaseService } from "./BaseService";
import dataSource from "../database/dataSource";

class AuthService extends BaseService {
  private UserRepo: UserRepository;
  private SessionRepo: SessionRepository;

  constructor(activeDataSource: DataSource = dataSource) {
    super(activeDataSource);
    this.UserRepo = new UserRepository(activeDataSource);
    this.SessionRepo = new SessionRepository(activeDataSource);
  }
  async login(email: string, password: string) {
    // implement more authentication logic here

    const user = await this.UserRepo.findOneByEmail(email);
    if (!user) {
      throw new ErrorWithStatus(401, "Invalid email or password");
    }

    // todo encrypt/decrypt password
    if (password !== user.password) {
      throw new ErrorWithStatus(401, "Invalid email or password");
    }

    const session = await this.SessionRepo.create({ userId: user.id, isValid: true });
    const accessToken = signJWT({ userId: Number(user.id), sessionId: session.id }, accessTokenMaxAge.expiresIn);
    const refreshToken = signJWT({ sessionId: session.id }, "1y");

    return { accessToken, refreshToken };
  }

  async logout(userId: number) {
    try {
      // invalidate session
      const sessions = await this.SessionRepo.findAllBy({ userId, isValid: true });
      await Promise.all(sessions.map((session) => this.SessionRepo.update({ ...session, isValid: false })));
    } catch (error) {
      console.log(error);
      throw new ErrorWithStatus(500, "Error logging out");
    }

    return { message: "Logout successful" };
  }
}

export default AuthService;
