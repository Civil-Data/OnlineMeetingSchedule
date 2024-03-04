const express = require("express");

const { PORT } = require("./config");

const { databaseConnection } = require("./database");

const expressApp = require("./express-app");

const { CreateChannel } = require("./utils");

const fs = require("node:fs");

const HEALTHZ_TIME = 40000; // 40000 milliseconds

const StartServer = async () => {
	const app = express();

	await databaseConnection();

	const channel = await CreateChannel();

	await expressApp(app);

	// Catch application errors and deliver to logger

	app.use((error, req, res, next) => {
		const STATUS_CODE = error.statusCode || 500;

		const data = error.data || error.message;

		return res.status(STATUS_CODE).json(data);
	});

	// Set timestamp "startupTimestamp" of when the microservice started

	const startupTimestamp = new Date();

	console.log(
		`Set startupTimestamp to ${startupTimestamp.toLocaleTimeString(
			"sv-SE"
		)}`
	);

	// This is a normal HTTP Get route (path) for the microservice (part of the microservice's functionality)

	app.get("/", async (req, res) => {
		res.sendStatus(200);
	});

	// Respond to HTTP GET requests on route (path) "/healthz" to indicate "alive" (this is what the livenessProbe checks)

	app.get("/healthz", async (req, res) => {
		const current = new Date();

		console.log(
			`Route /healthz hit at time ${current.toLocaleTimeString(
				"sv-SE"
			)}, Elapsed seconds since startup: ${
				(current - startupTimestamp) / 1000
			}`
		);

		if (current - startupTimestamp < HEALTHZ_TIME) {
			console.log("Route /healthz returning status 200");

			res.sendStatus(200); // If within 40 seconds of the microservice's "startupTimestamp", return status "200" (ok)
		} else {
			console.log("Route /healthz returning status 500");

			res.sendStatus(500); // If not within 40 seconds of the microservice's "startupTimestamp", return status "500" (internal server error)
		}
	});

	// Write file "/tmp/started" to indicate "started" (this is what the startupProbe checks)

	try {
		fs.writeFileSync("/tmp/started", "started");

		console.log("Wrote file /tmp/started.");
	} catch (err) {
		console.error(err);
	}

	app.listen(PORT, () => {
		console.log(`listening to port ${PORT}`);
	})

		.on("error", (err) => {
			console.log(err);

			process.exit();
		})

		.on("close", () => {
			channel.close();
		});
};

StartServer();
