const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const amqplib = require("amqplib");
const { isAlpha, isEmail, isMobilePhone } = require("validator");

const {
	APP_SECRET,
	EXCHANGE_NAME,
	USER_SERVICE,
	MSG_QUEUE_URL,
} = require("../config");
const { ValidationError } = require("./error/app-errors");

/* ==================== Utility functions ========================== */

module.exports.GenerateSalt = async () => {
	return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (newPassword, salt) => {
	if (!newPassword) {
		throw new Error("Password is undefined");
	}
	return await bcrypt.hash(newPassword, salt);
};

module.exports.ValidatePassword = async (
	enteredPassword,
	savedPassword,
	salt
) => {
	console.log(enteredPassword);
	console.log(savedPassword);
	console.log(salt);
	return (
		(await this.GeneratePassword(enteredPassword, salt)) === savedPassword
	);
};

module.exports.GenerateSignature = async (payload) => {
	try {
		return await jwt.sign(payload, APP_SECRET, {
			expiresIn: "2min",
		});
	} catch (error) {
		console.log(error);
		return error;
	}
};

module.exports.ValidateSignature = async (req) => {
	try {
		const signature = req.get("Authorization");
		const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
		req.user = payload;
		return true;
	} catch (error) {
		return false;
	}
};

module.exports.ValidateUserInput = async (
	type = "SIGNUP",
	{
		newFirstName,
		newLastName,
		newEmail,
		newPassword,
		newAge,
		newGender,
		newTelephone,
	}
) => {
	// Check if all required fields are provided
	if (!newFirstName || !newLastName || !newEmail || !newPassword) {
		throw new ValidationError("All fields are required");
	}

	// Check if the first name and last name are letters
	if (!isAlpha(newFirstName) || !isAlpha(newLastName)) {
		throw new ValidationError("First name and last name should be letters");
	}

	// Check if the newEmail format is valid
	if (!isEmail(newEmail)) {
		throw new ValidationError("Email is not valid");
	}

	// Check if the newPassword meets the minimum length requirement
	if (newPassword.length < 8) {
		throw new ValidationError("Password should be at least 8 characters");
	}

	if (type === "UPDATE") {
		// Validate telephone number
		if (!isMobilePhone(newTelephone))
			throw new ValidationError("Not a valid telephone number.");

		// Check if a gender option is specified
		if (
			newGender !== "Male" ||
			newGender !== "Female" ||
			newGender !== "Other"
		)
			throw new ValidationError("Invalid gender input.");

		// Check if the newPassword meets the minimum length requirement
		if (isNaN(+newAge) || +newAge < 0)
			throw new ValidationError("Invalid age input.");
	}
};

/* ==================== Utility functions ========================== */
/* ==================== Message Broker ========================== */

module.exports.CreateChannel = async () => {
	const connection = await amqplib.connect(MSG_QUEUE_URL);
	const channel = await connection.createChannel();
	await channel.assertQueue(EXCHANGE_NAME, "direct", { durable: true });
	return channel;
};

module.exports.PublishMessage = (channel, service, msg) => {
	channel.publish(EXCHANGE_NAME, service, Buffer.from(msg));
	console.log("Sent: ", msg);
};

module.exports.SubscribeMessage = async (channel, service) => {
	await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
	const q = await channel.assertQueue("", { exclusive: true });
	console.log(` Waiting for messages in queue: ${q.queue}`);

	channel.bindQueue(q.queue, EXCHANGE_NAME, USER_SERVICE);

	channel.consume(
		q.queue,
		(msg) => {
			if (msg.content) {
				console.log("the message is:", msg.content.toString());
				service.SubscribeEvents(msg.content.toString());
			}
			console.log("[X] received");
		},
		{
			noAck: true,
		}
	);
};

/* ==================== Message Broker ========================== */
