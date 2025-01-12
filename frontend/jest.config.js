module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  testMatch: ["**/__tests__/**/*.(test|spec).(ts|tsx|js|jsx)"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
