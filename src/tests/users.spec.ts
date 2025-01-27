import UserService from "../services/UserService";
import { TestDBHandler } from "./testDBHandler";

// Note: I use beforeEach and afterEach to create and drop the database before and after each test
// This is to ensure that tests are run in isolation and that the database is clean before each test
// And thus we can use the migrations as the starting point for each test

describe("Users", () => {
  let testDataSource: TestDBHandler;
  let userService: UserService;
  /* ---------------------- Init and drop db after tests ---------------------- */
  beforeEach(async () => {
    testDataSource = new TestDBHandler();
    await testDataSource.createDB();
    userService = new UserService(testDataSource.testDataSource);
  });

  afterEach(async () => {
    await testDataSource.dropDB();
  });

  /* -------------------------------------------------------------------------- */
  /*                               Fetching users                               */
  /* -------------------------------------------------------------------------- */
  it("should return a list of users", async () => {
    const users = await userService.getAll();
    expect(users).toHaveLength(2);
    expect(users[0].name).toBe("John Doe");
  });

  it("should return a single user if limit of 1 is passed into get all", async () => {
    const users = await userService.getAll(1);
    expect(users).toHaveLength(1);
  });

  it("should return a single user by id", async () => {
    const user = await userService.getOneById(2);
    expect(user.name).toBe("Jane Doe");
  });

  /* -------------------------------------------------------------------------- */
  /*                               Creating users                               */
  /* -------------------------------------------------------------------------- */
  it("should add a new user", async () => {
    const newUser = {
      name: "Keanu Reeves",
      email: "keanu@sharklasers.com",
      password: "password",
      username: "keanu",
    };

    const addedUser = await userService.addNew(newUser);
    expect(addedUser.name).toBe("Keanu Reeves");

    const users = await userService.getAll();
    expect(users).toHaveLength(3);

    const user = await userService.getOneById(3);
    expect(user.email).toBe("keanu@sharklasers.com");
  });

  /* -------------------------------------------------------------------------- */
  /*                               Updating users                               */
  /* -------------------------------------------------------------------------- */

  it("should update a user", async () => {
    const user = await userService.getOneById(1);
    user.name = "Johnny Silverhand";
    user.email = "silverhand@sharklasers.com";
    const updatedUser = await userService.edit(user);
    expect(updatedUser.name).toBe("Johnny Silverhand");

    const users = await userService.getAll();
    expect(users).toHaveLength(2);

    const user1 = await userService.getOneById(1);
    expect(user1.name).toBe("Johnny Silverhand");
    expect(user1.email).toBe("silverhand@sharklasers.com");
  });

  /* -------------------------------------------------------------------------- */
  /*                               Deleting users                               */
  /* -------------------------------------------------------------------------- */
  it("should delete a user", async () => {
    await userService.remove(1);
    const users = await userService.getAll();
    expect(users).toHaveLength(1);
    expect(users[0].name).toBe("Jane Doe");
  });
});
