const UserService = require("./user-service"); // Path to your user service file
const db = require("./db"); // Path to your database file

jest.mock("./db"); // Mock the database

describe("UserService", () => {
	describe("LogIn", () => {
		test("validate user inputs", async () => {
			const email = "joel@ju.se";
			const password = "Password123";

			db.getUser.mockResolvedValue({ email, password }); // Mock the getUser function in db

			const user = await UserService.login(email, password);

			expect(user.email).toBe(email);
			expect(user.password).toBe(password);
		});

		test("Validate response", async () => {
			const email = "joel@ju.se";
			const password = "Password123";
			const token = "token123";

			db.getUser.mockResolvedValue({ email, password, token }); // Mock the getUser function in db

			const { existingUser, userToken } = await UserService.login(
				email,
				password
			);

			expect(existingUser.email).toBe(email);
			expect(userToken).toBe(token);
		});
	});
});
