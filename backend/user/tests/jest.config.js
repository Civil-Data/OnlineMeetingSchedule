// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
const path = require("../tests/setup.js");

module.exports = {
	// Automatically clear mock calls and instances between every test
	clearMocks: true,

	// The test environment that will be used for testing
	testEnvironment: "node",
	setupFilesAfterEnv: [path], // Path to your setup file
};
