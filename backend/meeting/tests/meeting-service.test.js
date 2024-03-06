require("./setup");
const { MeetingService } = require("../src/services/meeting-service");
const { MeetingRepository } = require("../src/database/models/Meeting");
// const {
// 	NotFoundError,
// 	APIError,
// } = require("../path/to/utils/error/app-errors");

jest.mock("../src/database/models/Meeting");

describe("MeetingService", () => {
	let service;

	beforeEach(() => {
		service = new MeetingService();
	});

	test("CreateMeeting calls repository and returns result", async () => {
		const mockMeeting = { title: "Test Meeting" };
		MeetingRepository.prototype.CreateMeeting.mockResolvedValue(
			mockMeeting
		);

		const result = await service.CreateMeeting(mockMeeting);

		expect(MeetingRepository.prototype.CreateMeeting).toHaveBeenCalledWith(
			mockMeeting
		);
		expect(result).toEqual(mockMeeting);
	});

	test("GetMeetingsByUserId calls repository and returns result", async () => {
		const mockUserId = 1;
		const mockMeetings = [
			{ title: "Test Meeting 1" },
			{ title: "Test Meeting 2" },
		];
		MeetingRepository.prototype.GetMeetingsByUserId.mockResolvedValue(
			mockMeetings
		);

		const result = await service.GetMeetingsByUserId(mockUserId);

		expect(
			MeetingRepository.prototype.GetMeetingsByUserId
		).toHaveBeenCalledWith(mockUserId);
		expect(result).toEqual(mockMeetings);
	});
});
