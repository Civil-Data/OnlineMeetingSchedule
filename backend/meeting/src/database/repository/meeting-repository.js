// const mongoose = require("mongoose");
const { MeetingModel } = require("../models");

//Dealing with data base operations
class MeetingRepository {
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
		const meeting = new MeetingModel({
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
		return await meeting.save();
	}

	async FindMeetingByUserId({ userId }) {
		const existingMeeting = await MeetingModel.find({
			$or: [{ organizer: userId }, { participants: { $in: [userId] } }],
		});
		return existingMeeting;
	}

	// delete meeting by id
	async DeleteMeetingById({ meetingId }) {
		const existingMeeting = await MeetingModel.findByIdAndDelete(meetingId);

		return existingMeeting;
	}

	// update meeting by id
	async UpdateMeetingById({
		meetingId,
		participants,
		startTime,
		endTime,
		startDate,
		endDate,
		location,
		title,
		description,
		hasPassed,
	}) {
		const existingMeeting = await MeetingModel.findByIdAndUpdate(
			meetingId,
			{
				participants,
				startTime,
				endTime,
				startDate,
				endDate,
				location,
				title,
				description,
				hasPassed,
			},
			{ new: true }
		);

		return existingMeeting;
	}
}

module.exports = MeetingRepository;
