const AuthService = {
  login,
  logout,
};

async function login(username: string, password: string) {
  return { message: "Login successful" };
}

async function logout() {
  return { message: "Logout successful" };
}

export default AuthService;
