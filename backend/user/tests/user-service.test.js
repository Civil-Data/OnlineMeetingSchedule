require("./setup");
const UserService = require("../src/services/user-service");
const User = require("../src/database/models/User"); // Assuming you have a Mongoose model for your users

const service = new UserService();

describe("UserService", () => {
	describe("LogIn", () => {
		test("validate user inputs", async () => {
			const email = "test1@test.com";
			const password = "Password12345";

			const { existingUser } = await service.LogIn({ email, password });
			expect(existingUser.email).toBe(email);
		});

		test("validate user inputs", async () => {
			const email = "test2@test.com";
			const password = "Password123";

			const { existingUser } = await service.LogIn({ email, password });

			expect(existingUser.email).toBe(email);
		});

		test("reject invalid password", async () => {
			const email = "test1@test.com";
			const password = "short";

			await expect(service.LogIn({ email, password })).rejects.toThrow();
		});

		test("reject invalid password", async () => {
			const email = "test2test.com";
			const password = "Password123";

			await expect(service.LogIn({ email, password })).rejects.toThrow();
		});
	});

	describe("service", () => {
		describe("SignUp", () => {
			test("create a new user", async () => {
				const firstName = "test";
				const lastName = "testsson";
				const email = "test3@test.com";
				const password = "Password123";

				const { user } = await service.SignUp({
					firstName,
					lastName,
					email,
					password,
				});

				// Verify that the user was created in the database
				const dbUser = await User.findOne({ email: user.email });
				expect(dbUser).not.toBeNull();

				// Verify that the returned user has the correct email
				expect(user.email).toBe(email);
			});

			test("reject duplicate email", async () => {
				const firstName = "test";
				const lastName = "testsson";
				const email = "test4@test.com";
				const password = "Password123";

				// First registration should succeed
				await service.SignUp({
					firstName,
					lastName,
					email,
					password,
				});

				// Second registration with the same email should fail
				await expect(
					service.SignUp({ firstName, lastName, email, password })
				).rejects.toThrow();
			});

			// Test for invalid email, should throw ValidationError
			test("reject invalid email", async () => {
				const firstName = "test";
				const lastName = "testsson";
				const email = "notAnEmail";
				const password = "Password123";

				await expect(
					service.SignUp({ firstName, lastName, email, password })
				).rejects.toThrow();
			});

			// Test for too short password, should throw ValidationError
			test("reject invalid password", async () => {
				const firstName = "test";
				const lastName = "testsson";
				const email = "test5@test.com";
				const password = "Passwo";

				await expect(
					service.SignUp({ firstName, lastName, email, password })
				).rejects.toThrow();
			});
		});
	});
});
