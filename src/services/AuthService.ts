import UserRepository from "../database/repositories/Users/UserRepository";
import { ErrorWithStatus } from "../middleware/errorHandler";
import * as jwt from "jsonwebtoken";

const AuthService = {
  login,
  logout,
  generateAccessToken,
};

const UserRepo = new UserRepository();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ?? "secret";

function generateAccessToken(email: string, password: string) {
  return jwt.sign({ email, password }, ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
}

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

  const accessToken = generateAccessToken(email, password);

  return accessToken;
}

//todo
async function logout() {
  return { message: "Logout successful" };
}

export default AuthService;
