const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mongoServer = new MongoMemoryServer();

mongoose.Promise = Promise;
mongoServer.getUri().then((mongoUri) => {
	const mongooseOpts = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};

	mongoose.connect(mongoUri, mongooseOpts, (err) => {
		if (err) console.error(err);
	});
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});
