/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  // This doesn't work for some reason... :'(
  // globalSetup: "./src/tests/jest.globalSetup.ts",
  // globalTeardown: "./src/tests/jest.globalTeardown.ts",
  openHandlesTimeout: 10000,
};
