// This doesn't work for some reason... :'(

export default async function () {
  console.log("Tearing down test environment and test database");
  //@ts-ignore
  await globalThis.databaseConfig.dropDB();
}
