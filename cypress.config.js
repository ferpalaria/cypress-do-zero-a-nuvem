const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {},

  // Cypress Cloud
  projectId: "fyqcdg",
  retries: {
    runMode: 5,
    openMode: 2,
  }
});

// {
//   "baseUrl":"https:ticket-box.s3.eu-central-1.amazonaws.com",
//   "fixturesFolder": false,
//   "pluginsFile": false
// }