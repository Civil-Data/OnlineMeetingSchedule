// const mongoose = require("mongoose");
const { MeetingModel } = require("../models");

//Dealing with data base operations
class MeetingsRepository {
	async CreateMeeting({
		organizer,
		participants,
		startTime,
		endTime,
		startDate,
		salt,
		endDate,
		location,
		title,
		description,
		hasPassed,
	}) {
		const user = new MeetingModel({
			participants,
			startTime,
			endTime,
			startDate,
			endDate,
			location,
			title,
			description,
			hasPassed,
			organizer,
			salt,
		});

		const meetingResult = await user.save();
		return meetingResult;
	}

	async FindUser({ email }) {
		const existingMeeting = await MeetingModel.findOne({ email: email });
		return existingMeeting;
	}

	async FindUserById({ id }) {
		const existingMeeting = await MeetingModel.findById(id).populate(
			"address"
		);

		return existingMeeting;
	}
}

module.exports = MeetingsRepository;
