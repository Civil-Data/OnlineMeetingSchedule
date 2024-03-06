const { MeetingRepository } = require("../database");
const { NotFoundError, APIError } = require("../utils/error/app-errors");

// Handles the different services that the API provides
class MeetingService {
	constructor() {
		this.repository = new MeetingRepository();
	}

	async CreateMeeting(meetingData) {
		const meeting = await this.repository.CreateMeeting(meetingData);
		if (!meeting)
			throw new APIError("Something went wrong when creating a meeting.");
		return meeting;
	}

	async GetMeetingsByUserId(userId) {
		const meeting = await this.repository.GetMeetingsByUserId(userId);
		if (!meeting) throw new NotFoundError("No meetings found.");
		return meeting;
	}

	async GetMeetingsByDate(date) {
		const meeting = await this.repository.GetMeetingsByDate(date);
		if (!meeting) throw new NotFoundError("No meetings found.");
		return meeting;
	}

	async UpdateMeeting(meetingData) {
		const updatedMeeting = await this.repository.UpdateMeeting(meetingData);
		if (!updatedMeeting)
			throw new APIError(
				`Something went wrong when updating meeting: ${meetingData.title} - (${meetingData.meetingId})`
			);
		return updatedMeeting;
	}

	async DeleteMeeting(meetingId) {
		const deletedMeeting = await this.repository.DeleteMeeting(meetingId);
		if (!deletedMeeting)
			throw new APIError(
				"Something went wrong when trying to delete meeting."
			);
		return deletedMeeting;
	}
}

module.exports = MeetingService;
