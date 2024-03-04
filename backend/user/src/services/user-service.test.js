const UserService = require("./user-service");
const User = require("../database/models/User"); // Assuming you have a Mongoose model for your users

describe("UserService", () => {
	beforeAll(async () => {
		// Create test users
		await User.create({
			firstName: "test",
			lastName: "testsson",
			email: "test1@test.com",
			password: "Password12345",
		});

		await User.create({
			firstName: "test",
			lastName: "testsson",
			email: "test2@test.com",
			password: "Password123",
		});
	});

	describe("LogIn", () => {
		test("validate user inputs", async () => {
			const email = "test1@test.com";
			const password = "Password12345";

			const user = await UserService.login(email, password);

			expect(user.email).toBe(email);
			expect(user.password).toBe(password);
		});

		test("validate user inputs", async () => {
			const email = "test2@test.com";
			const password = "Password123";

			const user = await UserService.login(email, password);

			expect(user.email).toBe(email);
			expect(user.password).toBe(password);
		});

		test("reject invalid password", async () => {
			const email = "test1@test.com";
			const password = "short";

			await expect(UserService.login(email, password)).rejects.toThrow();
		});

		test("reject invalid password", async () => {
			const email = "test2test.com";
			const password = "Password123";

			await expect(UserService.login(email, password)).rejects.toThrow();
		});
	});

	describe("UserService", () => {
		describe("SignUp", () => {
			test("create a new user", async () => {
				const email = "test3@test.com";
				const password = "Password123";

				const user = await UserService.signup(email, password);

				// Verify that the user was created in the database
				const dbUser = await User.findOne({ email });
				expect(dbUser).not.toBeNull();

				// Verify that the returned user has the correct email
				expect(user.email).toBe(email);
			});

			test("reject duplicate email", async () => {
				const email = "test@test.com";
				const password = "password123";

				// First registration should succeed
				await UserService.signup(email, password);

				// Second registration with the same email should fail
				await expect(
					UserService.signup(email, password)
				).rejects.toThrow();
			});

			test("reject invalid email", async () => {
				const email = "not-an-email";
				const password = "password123";

				await expect(
					UserService.signup(email, password)
				).rejects.toThrow();
			});

			test("reject invalid password", async () => {
				const email = "test@test.com";
				const password = "short";

				await expect(
					UserService.signup(email, password)
				).rejects.toThrow();
			});
		});
	});
});
