import UserRepository from "../database/repositories/Users/UserRepository";
import { ErrorWithStatus } from "../middleware/errorHandler";
import { signJWT } from "../utils/jwt-utils";

const AuthService = {
  login,
  logout,
};

const UserRepo = new UserRepository();

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

  const accessToken = signJWT({ email, id: Number(user.id) }, "1h");

  return accessToken;
}

//todo
async function logout() {
  return { message: "Logout successful" };
}

export default AuthService;
