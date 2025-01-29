import UserService from "../services/UserService";
import { TestDBHandler } from "./testDBHandler";

// Note: I use beforeEach and afterEach to create and drop the database before and after each test
// This is to ensure that tests are run in isolation and that the database is clean before each test
// And thus we can use the migrations as the starting point for each test

describe("Users", () => {
  let testDataHandler: TestDBHandler;
  let userService: UserService;
  /* ---------------------- Init and drop db after tests ---------------------- */
  beforeEach(async () => {
    testDataHandler = new TestDBHandler();
    await testDataHandler.createDB();
    userService = new UserService(testDataHandler.testDataSource);
  });

  afterEach(async () => {
    await testDataHandler.dropDB();
  });

  /* -------------------------------------------------------------------------- */
  /*                               Fetching users                               */
  /* -------------------------------------------------------------------------- */
  it("should return a list of users", async () => {
    const users = await userService.getAll();
    expect(users).toHaveLength(12);
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
    expect(users).toHaveLength(13);

    const user = await userService.getOneById(13);
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
    expect(users).toHaveLength(12);

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
    expect(users).toHaveLength(11);
    expect(users[0].name).toBe("Jane Doe");
  });

  /* -------------------------------------------------------------------------- */
  /*                                 Pagination                                 */
  /* -------------------------------------------------------------------------- */

  it("should return a paginated list of users", async () => {
    const response = await userService.getUsersPaginated(1, 5, "id", "ASC");
    const { entries, page, limit, total } = response ?? {};
    const users = entries ?? [];

    console.log(response);
    expect(users).toHaveLength(5);
    expect(entries).toHaveLength(5);
    expect(total).toBe(12);
    expect(users[0].name).toBe("John Doe");
  });

  it("should return a paginated list of users in descending order", async () => {
    const response = await userService.getUsersPaginated(1, 3, "id", "DESC");
    const { entries, page, limit, total } = response ?? {};
    const users = entries ?? [];

    expect(users).toHaveLength(3);
    expect(entries).toHaveLength(3);
    expect(total).toBe(12);
    // first two are John and Jane Doe
    expect(users[0].name).toBe("Person 10");
  });
});
