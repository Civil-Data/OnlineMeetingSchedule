const bcrypt = require("bcryptjs");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const User = require("../src/database/models/User");
let mongoServer;

beforeEach(async () => {
	mongoServer = new MongoMemoryServer();
	await mongoServer.start();
	const uri = await mongoServer.getUri();
	await mongoose.connect(uri, {});

	// Generate a salt for the users
	const salt = await bcrypt.genSalt();
	// Hash the password
	const password1 = await bcrypt.hash("Password12345", salt);
	const password2 = await bcrypt.hash("Password123", salt);

	// Create a few users
	await User.create([
		{
			firstName: "test",
			lastName: "testsson",
			email: "test1@test.com",
			password: password1,
			salt: salt,
		},
		{
			firstName: "test",
			lastName: "testsson",
			email: "test2@test.com",
			password: password2,
			salt: salt,
		},
	]);
});

afterEach(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});
