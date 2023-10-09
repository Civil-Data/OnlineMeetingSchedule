// Import the Meeting model
const Meeting = require("../models/meeting.model");

// Get a specific meeting by ID
module.exports.GetMeeting = async (req, res) => {
	try {
		// Extract the meeting ID from the request body
		const { meetingID } = req.body;

		// Find the meeting with the provided ID
		const meeting = await Meeting.findOne({
			_id: meetingID,
		});

		res.status(200).json(meeting);
	} catch (error) {
		console.error("Unable to find meeting.", error);
	}
};

// Create a new meeting
module.exports.Create = async (req, res, next) => {
	try {
		// console.log(req.body);
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
		const meeting = await Meeting.create({
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

		await meeting.save();

		// Send a success response with the created meeting data
		res.status(201).json({
			message: "Meeting was successfully created!",
			meeting,
		});

		next();
	} catch (error) {
		console.error("Unable to create meeting.", error);
	}
};

// Update an existing meeting by ID
module.exports.Update = async (req, res, next) => {
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
		const meeting = await Meeting.updateOne(
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
			meeting,
		});
		next();
	} catch (error) {
		console.error("Unable to update meeting.", error);
	}
};

// Delete a meeting by ID
module.exports.Delete = async (req, res, next) => {
	try {
		// Extract the meeting ID from the request body
		const { meetingID } = req.body;

		// Delete the meeting with the provided ID from the database
		const meeting = await Meeting.deleteOne({ _id: meetingID });

		// Log the result of the deletion and send a success response
		console.log("Deleted:", meeting);
		res.status(200).json({
			message: "Meeting was successfully deleted!",
		});
		next();
	} catch (error) {
		console.error("Unable to delete meeting.", error);
	}
};
