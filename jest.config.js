const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleDirectories: ["node_modules", __dirname],
  setupFiles: ["<rootDir>/src/test/setEnvVars.js"],
  setupFilesAfterEnv: ["<rootDir>/src/test/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  modulePathIgnorePatterns: ["<rootDir>/src/components/ui/"],
};

module.exports = createJestConfig(customJestConfig);
