const { PORT } = require("../src/config");

describe("metadata microservice", () => {
	//
	// Setup mocks.
	//

	const mockListenFn = jest.fn((port, callback) => callback());
	const mockGetFn = jest.fn();

	jest.doMock("express", () => {
		// Mock the Express module.
		const express = () => {
			// The Express module is a factory function that creates an Express app object.
			return {
				// Mock Express app object.
				listen: mockListenFn, // Mock listen function.
				get: mockGetFn, // Mock get function.
				use: () => {}, // Mock use function.
			};
		};
		express.json = () => {}; // Mock json function.
		return express;
	});

	// Import the module we are testing.
	const { StartServer } = require("../src/index");

	//
	// Define tests.
	//

	test("microservice starts user server on startup", async () => {
		await StartServer(PORT);

		expect(mockListenFn.mock.calls.length).toEqual(1); // Check only 1 call to 'listen'.
		expect(mockListenFn.mock.calls[0][0]).toEqual(5000); // Check for port 5000.
	});

	test("/signup route is handled", async () => {
		await StartServer(PORT);

		const user = mockGetFn.mock.calls[0][0];
		expect(user).toEqual("/signup");
	});
});
