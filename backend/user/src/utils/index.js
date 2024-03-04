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

module.exports.GeneratePassword = async (password, salt) => {
	if (!password) {
		throw new Error("Password is undefined");
	}
	const newPassword = await bcrypt.hash(password, salt);
	return newPassword;
};

module.exports.ValidatePassword = async (
	enteredPassword,
	savedPassword,
	salt
) => {
	return (
		(await this.GeneratePassword(enteredPassword, salt)) === savedPassword
	);
};

module.exports.GenerateSignature = async (payload) => {
	try {
		return await jwt.sign(payload, APP_SECRET, {
			expiresIn: "2h",
		});
	} catch (error) {
		console.log(error);
		return error;
	}
};

module.exports.ValidateSignature = async (req) => {
	try {
		const signature = req.get("Authorization");
		if (signature === undefined) {
			throw new ValidationError("No valid session token provided.");
		}
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
		if (!isMobilePhone(newTelephone) && newTelephone != "")
			throw new ValidationError("Not a valid telephone number.");

		// Check if a gender option is specified
		if (
			newGender !== "Male" &&
			newGender !== "Female" &&
			newGender !== "Other" &&
			newGender !== ""
		)
			throw new ValidationError("Invalid gender input.");

		// Check if age is valid
		if (newAge != 0 && isNaN(+newAge) && +newAge < 0)
			throw new ValidationError("Invalid age input.");
	}
};

module.exports.PrintFormattedMessage = (message) => {
	const currentDate = new Date();

	// Get hours, minutes, day, month, and year
	const hours = currentDate.getHours().toString().padStart(2, "0");
	const minutes = currentDate.getMinutes().toString().padStart(2, "0");
	const day = currentDate.getDate().toString().padStart(2, "0");
	const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
	const year = currentDate.getFullYear();

	const formattedMessage = `[${hours}:${minutes} - ${year}-${month}-${day}]: ${message}`;
	console.log(formattedMessage);
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
