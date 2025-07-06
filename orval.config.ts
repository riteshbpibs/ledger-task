const config = {
  ledger: {
    output: {
      target: "./src/api/ledger-api.ts",
      client: "swr",
      schemas: "./src/api/model",
    },
    input: {
      target: "./ledger-api.yaml",
    },
  },
};

export default config;
