/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  globalSetup: "./src/tests/jest.globalSetup.ts",
  globalTeardown: "./src/tests/jest.globalTeardown.ts",
  openHandlesTimeout: 10000,
};
