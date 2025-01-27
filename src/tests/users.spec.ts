import UserService from "../services/UserService";
import { TestDBHandler } from "./testDBHandler";

describe("Users", () => {
  let testDataSource: TestDBHandler;
  let userService: UserService;
  beforeAll(async () => {
    testDataSource = new TestDBHandler();
    await testDataSource.createDB();
    userService = new UserService(testDataSource.testDataSource);
  });

  it("should return a list of users", async () => {
    const users = await userService.getAll();
    console.log(users);
  });
});
