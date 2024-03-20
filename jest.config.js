module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy", // Mock CSS imports
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // setupFilesAfterEnv: ["<rootDir>/setupTests.ts"], // File with setup configurations
  testMatch: [`**/*.test.(tsx|ts)`],
  globals: {  //can add custom tsconfig.json if present
    "ts-jest": {
      tsconfig: "tsconfig.json", // Path to your tsconfig.json file
    },
  },
};
