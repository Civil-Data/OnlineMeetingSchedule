const MeetingService = require("../services/meeting-service");
const { SubscribeMessage, ValidateMeetingInput, PrintFormattedMessage } = require("../utils");
const UserAuth = require("./middlewares/auth");

module.exports = (app, channel) => {
	const service = new MeetingService();

	// To listen
	SubscribeMessage(channel, service);

	// Create a new meeting
	app.post("/create", UserAuth, async (req, res, next) => {
		try {
			const meetingData = req.body;
			await ValidateMeetingInput(meetingData);

			// Create a new meeting in the database
			const meeting = await service.CreateMeeting(meetingData);

			const message = `Meeting: ${meeting.title} was successfully created!`;
			PrintFormattedMessage(message);

			// Send a success response with the created meeting data
			res.status(201).json({
				message,
				meeting,
			});
		} catch (error) {
			next(error);
		}
	});

	// Get meetings associated with the provided user
	app.get("/my-meetings/:userId", UserAuth, async (req, res, next) => {
		try {
			const userId = req.params.userId;
			const meeting = await service.GetMeetingsByUserId(userId);
			res.status(200).json(meeting);
		} catch (error) {
			next(error);
		}
	});

	// Get meetings with the provided date
	app.get("/:date", UserAuth, async (req, res, next) => {
		try {
			const meetingDate = req.params.date;
			const meeting = await service.GetMeetingsByDate(meetingDate);
			res.status(200).json(meeting);
		} catch (error) {
			next(error);
		}
	});

	// Update an existing meeting
	app.post("/update", UserAuth, async (req, res, next) => {
		try {
			const meetingData = req.body;
			await ValidateMeetingInput(meetingData);

			// Update the meeting with the provided id in the database
			const updatedMeeting = await service.UpdateMeeting(meetingData);

			const message = `Meeting: ${updatedMeeting.title} was successfully updated!`;
			PrintFormattedMessage(message);
			// Send a success response with the updated meeting data
			res.status(200).json({
				message,
				updatedMeeting,
			});
		} catch (error) {
			next(error);
		}
	});

	// Delete a meeting by id
	app.delete("/delete/:meetingId", UserAuth, async (req, res, next) => {
		try {
			const meetingId = req.params.meetingId;
			const deletedMeeting = await service.DeleteMeeting(meetingId);

			const message = `Meeting: ${deletedMeeting.title} was successfully deleted!`;
			PrintFormattedMessage(message);
			res.status(200).json({
				message,
			});
		} catch (error) {
			next(error);
		}
	});
};
