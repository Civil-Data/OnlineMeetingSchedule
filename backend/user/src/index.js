const express = require("express");
const { PORT } = require("./config");
const { databaseConnection } = require("./database");
const expressApp = require("./express-app");
const { CreateChannel } = require("./utils");

const StartServer = async () => {
	const app = express();

	await databaseConnection();

	await expressApp(app);

	// Catch application errors and deliver to logger
	app.use((error, req, res, next) => {
		const STATUS_CODE = error.statusCode || 500;
		const data = error.data || error.message;
		return res.status(STATUS_CODE).json(data);
	});

	app.listen(PORT, () => {
		console.log(`listening to port ${PORT}`);
	})
		.on("error", err => {
			console.log(err);
			process.exit();
		})
		.on("close", () => {
			channel.close();
		});
};

StartServer();
