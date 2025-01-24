//@ts-nocheck
import { TestDBHandler } from "./testDBHandler";

export default async function () {
  console.log("Setting up test environment and creating test database");

  globalThis.databaseConfig = new TestDBHandler();
  globalThis.testDataSource = globalThis.databaseConfig.testDataSource;

  await globalThis.databaseConfig.createDB();
}
