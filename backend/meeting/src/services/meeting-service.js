const { MeetingRepository } = require("../database");
const { FormateData } = require("../utils");

// All Business logic will be here
class MeetingService {
	constructor() {
		this.repository = new MeetingRepository();
	}

	async CreateMeeting(payload) {
		const meeting = await this.repository.CreateMeeting(payload);
		return meeting;
	}

	async GetMeeting(payload) {
		const { meetingId } = payload;
		const meeting = await this.repository.GetMeeting({ meetingId });
		return FormateData(meeting);
	}

	async UpdateMeeting(payload) {
		const { meetingId, meetingPassword } = payload;
		const meeting = await this.repository.UpdateMeeting({
			meetingId,
			meetingPassword,
		});
		return FormateData(meeting);
	}

	async DeleteMeeting(payload) {
		const { meetingId } = payload;
		const meeting = await this.repository.DeleteMeeting({ meetingId });
		return FormateData(meeting);
	}

	// async SubscribeEvents(payload){

	// 	console.log("Triggering.... User Events");

	// 	payload = JSON.parse(payload);

	// 	const { event, data } =  payload;

	// 	const { userId} = data;

	// 	switch(event){
	// 	case "Login":
	// 		break;
	// 	case "Sign up":
	// 		break;
	// 	default:
	// 		break;
	// 	}

	// }
}

module.exports = MeetingService;
