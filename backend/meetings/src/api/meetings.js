const MeetingsService = require("../services/meetings-service");
// const UserAuth = require("./middlewares/auth");
const { SubscribeMessage } = require("../utils");

module.exports = (app, channel) => {
	const service = new MeetingsService();

	// To listen
	SubscribeMessage(channel, service);

	// Import the Meeting model
	const Meeting = require("../models/Meeting");

	// Get a specific meeting by userId
	app.get("/meeting/users", async (req, res) => {
		try {
			const userID = req.query.paramName;
			// Find the meeting with the provided ID
			const meeting = await Meeting.find({
				$or: [
					{ organizer: userID },
					{ participants: { $in: [userID] } },
				],
			});
			res.status(200).json(meeting);
		} catch (error) {
			console.error("Unable to find meeting.", error);
		}
	});

	// Get a specific meeting by userId
	app.get("/meeting/date", async (req, res) => {
		try {
			const meetingDate = req.query.date;

			// Find the meeting with the provided ID
			const meeting = await Meeting.find({ startDate: meetingDate });
			res.status(200).json(meeting);
		} catch (error) {
			console.error("Unable to find meeting.", error);
		}
	});

	// Create a new meeting
	app.post("/meeting/create", async (req, res, next) => {
		try {
			// Extract meeting details from the request body
			const {
				organizer,
				participants,
				startTime,
				endTime,
				startDate,
				endDate,
				location,
				title,
				description,
			} = req.body;

			// Create a new meeting in the database
			const meeting = await service.CreateMeeting({
				organizer,
				participants,
				startTime,
				endTime,
				startDate,
				endDate,
				location,
				title,
				description,
			});

			// Send a success response with the created meeting data
			res.status(201).json({
				message: "Meeting was successfully created!",
				meeting,
			});

			next();
		} catch (error) {
			console.error("Unable to create meeting.", error);
		}
	});

	// Update an existing meeting by ID
	app.post("/meeting/update", async (req, res, next) => {
		try {
			// Extract meeting details and the meeting ID from the request body
			const {
				meetingID,
				participants,
				startTime,
				endTime,
				startDate,
				endDate,
				location,
				title,
				description,
			} = req.body;

			// Update the meeting with the provided ID in the database
			await Meeting.updateOne(
				{
					_id: meetingID,
				},
				{
					participants,
					startTime,
					endTime,
					startDate,
					endDate,
					location,
					title,
					description,
				}
			);

			// Send a success response with the updated meeting data
			res.status(200).json({
				message: "Meeting was successfully updated!",
			});
			next();
		} catch (error) {
			console.error("Unable to update meeting.", error);
		}
	});

	// Delete a meeting by ID
	app.delete("/meeting/delete", async (req, res, next) => {
		try {
			// Extract the meeting ID from the request body
			const meetingID = req.query.meetingID;

			// Delete the meeting with the provided ID from the database
			await Meeting.deleteOne({ _id: meetingID });

			// Send a success response
			res.status(200).json({
				message: "Meeting was successfully deleted!",
			});
			next();
		} catch (error) {
			console.error("Unable to delete meeting.", error);
		}
	});

	app.get("/whoami", (req, res) => {
		return res
			.status(200)
			.json({ msg: "/ or /meetings : I am meetings Service" });
	});
};
