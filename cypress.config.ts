module.exports = {
  e2e: {
    setupNodeEvents(on:any, config:any) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/integration/test.spec.ts",
  },
};