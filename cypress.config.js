const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {},
  viewportHeight: 880,
  viewportWidth: 1280
});

// {
//   "baseUrl":"https:ticket-box.s3.eu-central-1.amazonaws.com",
//   "fixturesFolder": false,
//   "pluginsFile": false
// }