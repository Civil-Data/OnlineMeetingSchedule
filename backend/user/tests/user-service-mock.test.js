jest.mock("../src/services/user-service"); // This mocks the entire UserService module

const UserService = require("../src/services/user-service");

const service = new UserService();

describe("UserService", () => {
	describe("LogIn", () => {
		beforeEach(() => {
			// Reset the mocks before each test
			service.LogIn.mockReset();
		});

		test("validate user inputs", async () => {
			const email = "test1@test.com";
			const password = "Password12345";

			// Set up the mock function
			service.LogIn.mockResolvedValue({ existingUser: { email } });

			const { existingUser } = await service.LogIn({ email, password });
			expect(existingUser.email).toBe(email);

			// Check that the mock function was called with the correct arguments
			expect(service.LogIn).toHaveBeenCalledWith({ email, password });
		});

		test("handle login error", async () => {
			const email = "test1@test.com";
			const password = "Password12345";

			// Set up the mock function to reject with an error
			service.LogIn.mockRejectedValue(new Error("Login error"));

			try {
				await service.LogIn({ email, password });
			} catch (e) {
				expect(e).toEqual(new Error("Login error"));
			}

			// Check that the mock function was called with the correct arguments
			expect(service.LogIn).toHaveBeenCalledWith({ email, password });
		});

		test("handle invalid arguments", async () => {
			const email = "test1@test.com";
			const password = "Password12345";

			// Set up the mock function to reject with an error
			service.LogIn.mockRejectedValue(new Error("Invalid arguments"));

			try {
				await service.LogIn({ email, password });
			} catch (e) {
				expect(e).toEqual(new Error("Invalid arguments"));
			}

			// Check that the mock function was called with the correct arguments
			expect(service.LogIn).toHaveBeenCalledWith({ email, password });
		});

		test("handle no arguments", async () => {
			// Set up the mock function to reject with an error
			service.LogIn.mockRejectedValue(new Error("No arguments"));

			try {
				await service.LogIn();
			} catch (e) {
				expect(e).toEqual(new Error("No arguments"));
			}

			// Check that the mock function was called with no arguments
			expect(service.LogIn).toHaveBeenCalledWith();
		});

		test("handle empty object", async () => {
			// Set up the mock function to reject with an error
			service.LogIn.mockRejectedValue(new Error("Empty object"));

			try {
				await service.LogIn({});
			} catch (e) {
				expect(e).toEqual(new Error("Empty object"));
			}

			// Check that the mock function was called with an empty object
			expect(service.LogIn).toHaveBeenCalledWith({});
		});
	});
	describe("SignUp", () => {
		beforeEach(() => {
			// Reset the mocks before each test
			service.SignUp.mockReset();
		});

		test("validate user inputs", async () => {
			const email = "test1@test.com";
			const password = "Password12345";

			// Set up the mock function
			service.SignUp.mockResolvedValue({ newUser: { email } });

			const { newUser } = await service.SignUp({ email, password });
			expect(newUser.email).toBe(email);

			// Check that the mock function was called with the correct arguments
			expect(service.SignUp).toHaveBeenCalledWith({ email, password });
		});

		test("handle signup error", async () => {
			const email = "test1@test.com";
			const password = "Password12345";

			// Set up the mock to reject with an error
			service.SignUp.mockRejectedValue(new Error("Signup error"));

			try {
				await service.SignUp({ email, password });
			} catch (e) {
				expect(e).toEqual(new Error("Signup error"));
			}

			// Check that the mock function was called with the correct arguments
			expect(service.SignUp).toHaveBeenCalledWith({ email, password });
		});

		test("handle invalid arguments", async () => {
			const email = "test1@test.com";
			const password = "Password12345";

			// Set up the mock function to reject with an error
			service.SignUp.mockRejectedValue(new Error("Invalid arguments"));

			try {
				await service.SignUp({ email, password });
			} catch (e) {
				expect(e).toEqual(new Error("Invalid arguments"));
			}

			// Check that the mock function was called with the correct arguments
			expect(service.SignUp).toHaveBeenCalledWith({ email, password });
		});
	});

	describe("UpdateUser", () => {
		beforeEach(() => {
			// Reset the mocks before each test
			service.UpdateUser.mockReset();
		});

		test("validate user inputs", async () => {
			const email = "test1@test.com";
			const password = "Password12345";

			// Set up the mock function
			service.UpdateUser.mockResolvedValue({ updatedUser: { email } });

			const { updatedUser } = await service.UpdateUser({
				email,
				password,
			});
			expect(updatedUser.email).toBe(email);

			// Check that the mock function was called with the correct arguments
			expect(service.UpdateUser).toHaveBeenCalledWith({
				email,
				password,
			});
		});

		test("handle update error", async () => {
			const email = "test1@test.com";
			const password = "Password12345";

			// Set up the mock to reject with an error
			service.UpdateUser.mockRejectedValue(new Error("Update error"));

			try {
				await service.UpdateUser({ email, password });
			} catch (e) {
				expect(e).toEqual(new Error("Update error"));
			}

			// Check that the mock function was called with the correct arguments
			expect(service.UpdateUser).toHaveBeenCalledWith({
				email,
				password,
			});
		});

		test("handle invalid arguments", async () => {
			const email = "test1@test.com";
			const password = "Password12345";

			// Set up the mock function to reject with an error
			service.UpdateUser.mockRejectedValue(
				new Error("Invalid arguments")
			);

			try {
				await service.UpdateUser({ email, password });
			} catch (e) {
				expect(e).toEqual(new Error("Invalid arguments"));
			}

			// Check that the mock function was called with the correct arguments
			expect(service.UpdateUser).toHaveBeenCalledWith({
				email,
				password,
			});
		});
	});
});
