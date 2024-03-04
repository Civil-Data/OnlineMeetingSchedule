const UserService = require("./user-service");
const User = require("../database/models/User"); // Assuming you have a Mongoose model for your users

const service = new UserService();

describe("UserService", () => {
	// beforeAll(async () => {
	// 	// Create test users
	// 	await User.create({
	// 		firstName: "test",
	// 		lastName: "testsson",
	// 		email: "test1@test.com",
	// 		password: "Password12345",
	// 	});

	// 	await User.create({
	// 		firstName: "test",
	// 		lastName: "testsson",
	// 		email: "test2@test.com",firstName, lastName, email, password
	// 		password: "Password123",
	// 	});
	// });

	describe("LogIn", () => {
		test("validate user inputs", async () => {
			const email = "test1@test.com";
			const password = "Password12345";

			const user = await service.LogIn({ email, password });

			expect(user.email).toBe(email);
			expect(user.password).toBe(password);
		});

		test("validate user inputs", async () => {
			const email = "test2@test.com";
			const password = "Password123";

			const user = await service.LogIn({ email, password });

			expect(user.email).toBe(email);
			expect(user.password).toBe(password);
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
				console.log("I run");

				const { user } = await service.SignUp({
					firstName,
					lastName,
					email,
					password,
				});
				console.log("I run2 for fuck sake");
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

			test("reject invalid email", async () => {
				const firstName = "test";
				const lastName = "testsson";
				const email = "notAnEmail";
				const password = "Password123";

				await expect(
					service.SignUp({ firstName, lastName, email, password })
				).rejects.toThrow();
			});

			test("reject invalid password", async () => {
				const firstName = "test";
				const lastName = "testsson";
				const email = "test5@test.com";
				const password = "password123";

				await expect(
					service.SignUp({ firstName, lastName, email, password })
				).rejects.toThrow();
			});
		});
	});
});
