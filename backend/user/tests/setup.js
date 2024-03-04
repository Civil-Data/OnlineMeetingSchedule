const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongoServer;

beforeAll(async () => {
	mongoServer = new MongoMemoryServer();
	const mongoUri = await mongoServer.getUri();

	const mongooseOpts = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};

	await mongoose.connect(mongoUri, mongooseOpts);
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});
