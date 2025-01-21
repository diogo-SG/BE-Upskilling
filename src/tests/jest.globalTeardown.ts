export default async function () {
  console.log("Tearing down test environment and test database");
  //@ts-ignore
  await globalThis.databaseConfig.dropDB();
}
