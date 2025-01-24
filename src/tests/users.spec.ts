import UserService from "../services/UserService";

describe("Users", () => {
  //@ts-ignore
  // globalThis.testDataSource.initialize();
  //@ts-ignore
  const userService = new UserService(globalThis.testDataSource);
  it("should return a list of users", async () => {
    const users = await userService.getAll();
    console.log(users);
  });
});
