const MeetingService = require("../src/services/meeting-service");
const { MeetingRepository } = require("../src/database");

jest.mock("../src/database");

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
		expect(result).toEqual(mockMeeting);
	});

	test("GetMeetingsByUserId calls repository and returns result", async () => {
		const mockUserId = "123";
		const mockMeetings = [
			{ title: "Test Meeting 1" },
			{ title: "Test Meeting 2" },
		];
		MeetingRepository.prototype.GetMeetingsByUserId.mockResolvedValue(
			mockMeetings
		);

		const result = await service.GetMeetingsByUserId(mockUserId);
		expect(result).toEqual(mockMeetings);
	});

	test("GetMeetingsByDate calls repository and returns result", async () => {
		const mockDate = "2022-01-01";
		const mockMeetings = [
			{ title: "Test Meeting 1" },
			{ title: "Test Meeting 2" },
		];
		MeetingRepository.prototype.GetMeetingsByDate.mockResolvedValue(
			mockMeetings
		);

		const result = await service.GetMeetingsByDate(mockDate);
		expect(result).toEqual(mockMeetings);
	});

	test("UpdateMeeting calls repository and returns result", async () => {
		const mockMeetingData = { meetingId: "123", title: "Updated Meeting" };
		MeetingRepository.prototype.UpdateMeeting.mockResolvedValue(
			mockMeetingData
		);

		const result = await service.UpdateMeeting(mockMeetingData);
		expect(result).toEqual(mockMeetingData);
	});

	test("DeleteMeeting calls repository and returns result", async () => {
		const mockMeetingId = "123";
		MeetingRepository.prototype.DeleteMeeting.mockResolvedValue(true);

		const result = await service.DeleteMeeting(mockMeetingId);
		expect(result).toBe(true);
	});

	test("CreateMeeting handles repository rejection", async () => {
		const mockMeeting = { title: "Test Meeting" };
		MeetingRepository.prototype.CreateMeeting.mockRejectedValue(
			new Error("Test error")
		);

		try {
			await service.CreateMeeting(mockMeeting);
		} catch (e) {
			expect(e).toBeInstanceOf(Error);
			expect(e.message).toBe("Test error");
		}
	});

	test("GetMeetingsByUserId handles repository rejection", async () => {
		const mockUserId = "123";
		MeetingRepository.prototype.GetMeetingsByUserId.mockRejectedValue(
			new Error("Test error")
		);

		try {
			await service.GetMeetingsByUserId(mockUserId);
		} catch (e) {
			expect(e).toBeInstanceOf(Error);
			expect(e.message).toBe("Test error");
		}
	});

	test("DeleteMeeting handles repository rejection", async () => {
		const mockMeetingId = "123";
		MeetingRepository.prototype.DeleteMeeting.mockRejectedValue(
			new Error("Test error")
		);

		try {
			await service.DeleteMeeting(mockMeetingId);
		} catch (e) {
			expect(e).toBeInstanceOf(Error);
			expect(e.message).toBe("Test error");
		}
	});
});
