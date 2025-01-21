import UserService from "../services/UserService";

describe("Users", () => {
  it("should return a list of users", async () => {
    const users = await UserService.getAll();
    console.log(users);
  });
});
