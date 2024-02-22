const { MeetingModel } = require("../models");

// Dealing with data base operations
class MeetingRepository {
	async CreateMeeting({
		organizer,
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
		const meeting = new MeetingModel({
			organizer,
			participants,
			startTime,
			endTime,
			startDate,
			endDate,
			location,
			title,
			description,
			hasPassed,
		});
		return await meeting.save();
	}

	async GetMeetingsByUserId(userId) {
		const existingMeeting = await MeetingModel.find({
			$or: [{ organizer: userId }, { participants: { $in: [userId] } }],
		});
		return existingMeeting;
	}

	async GetMeetingsByDate(date) {
		const existingMeeting = await MeetingModel.find({ startDate: date });
		return existingMeeting;
	}

	async UpdateMeeting({
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
		const updatedMeeting = await MeetingModel.findByIdAndUpdate(
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
		return updatedMeeting;
	}

	async DeleteMeeting(meetingId) {
		const deletedMeeting = await MeetingModel.findByIdAndDelete(meetingId);
		return deletedMeeting;
	}
}

module.exports = MeetingRepository;
