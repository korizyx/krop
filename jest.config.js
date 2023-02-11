const config = {
  verbose: true,
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testTimeout: 15000,
};

export default config;
