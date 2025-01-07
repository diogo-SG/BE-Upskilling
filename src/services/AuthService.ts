import SessionRepository from "../database/repositories/Users/Sessions/SessionRepository";
import UserRepository from "../database/repositories/Users/UserRepository";
import { accessTokenMaxAge } from "../middleware/deserializeUser";
import { ErrorWithStatus } from "../middleware/errorHandler";
import { signJWT } from "../utils/jwt-utils";

const AuthService = {
  login,
  logout,
};

const UserRepo = new UserRepository();
const SessionRepo = new SessionRepository();

/* -------------------------------------------------------------------------- */
/*                                Auth handling                               */
/* -------------------------------------------------------------------------- */
async function login(email: string, password: string) {
  // implement more authentication logic here

  const user = await UserRepo.findOneByEmail(email);
  if (!user) {
    throw new ErrorWithStatus(401, "Invalid email or password");
  }

  // todo encrypt/decrypt password
  if (password !== user.password) {
    throw new ErrorWithStatus(401, "Invalid email or password");
  }

  const session = await SessionRepo.create({ userId: user.id, isValid: true });
  const accessToken = signJWT({ userId: Number(user.id), sessionId: session.id }, accessTokenMaxAge.expiresIn);
  const refreshToken = signJWT({ sessionId: session.id }, "1y");

  return { accessToken, refreshToken };
}

async function logout(userId: number) {
  try {
    // invalidate session
    const sessions = await SessionRepo.findAllBy({ userId, isValid: true });
    await Promise.all(sessions.map((session) => SessionRepo.update({ ...session, isValid: false })));
  } catch (error) {
    console.log(error);
    throw new ErrorWithStatus(500, "Error logging out");
  }

  return { message: "Logout successful" };
}

export default AuthService;
