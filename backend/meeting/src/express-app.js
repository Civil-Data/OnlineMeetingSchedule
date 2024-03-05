const express = require("express");
const cors = require("cors");
const { meeting } = require("./api");
const { CreateChannel } = require("./utils");

module.exports = async (app) => {
	app.use(express.json());
	app.use(
		cors({
			origin: ["http://108.141.158.1:3000", "http://localhost:3000"],
			methods: ["GET", "POST", "PUT", "DELETE"],
			credentials: true,
		})
	);
	app.use(express.static(__dirname + "/public"));

	const channel = await CreateChannel();

	meeting(app, channel);
	// error handling
};
