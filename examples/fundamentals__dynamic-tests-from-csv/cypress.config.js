/* eslint-disable no-console */
const { defineConfig } = require('cypress')

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const fs = require('fs')
const path = require('path')
const neatCSV = require('neat-csv')

module.exports = defineConfig({
  fixturesFolder: false,
  supportFile: false,
  e2e: {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
    async setupNodeEvents (on, config) {
      // when we load the plugins file, let's load the CSV file
      const filename = path.join(__dirname, 'users.csv')

      console.log('loading file', filename)
      const text = fs.readFileSync(filename, 'utf8')
      const csv = await neatCSV(text)

      console.log('loaded the users')
      console.log(csv)

      // then set it inside the config object under the environment
      // which will make it available via Cypress.env("usersList")
      // before the start of the tests
      config.env.usersList = csv

      return config
    },
  },
})
