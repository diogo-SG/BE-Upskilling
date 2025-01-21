import { TestDBHandler } from "./testDBHandler";

export default async function () {
  console.log("Setting up test environment and creating test database");
  //@ts-ignore
  globalThis.databaseConfig = new TestDBHandler();
  //@ts-ignore

  await globalThis.databaseConfig.createDB();
}
