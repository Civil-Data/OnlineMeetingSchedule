import React, { useEffect, useState } from "react";
import MeetingItem from "../Profile/MeetingItem";
import { useMeetingPopUp } from "../../contexts/MeetingContext";
import { v4 as uuidv4 } from "uuid";
import { SERVER_URL } from "../../config";
import { useUpdateUserContext } from "../../contexts/LoginContext";

const fetchDayMeeting = async (api, date, monthToDisplay, yearToDisplay) => {
	try {
		const dateString = `${String(yearToDisplay).padStart(2, "0")}-${String(
			monthToDisplay
		).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
		const { data } = await api.get(
			SERVER_URL + `/meeting/meeting/date?date=${dateString}`
		);

		return data;
	} catch (error) {
		console.error(error);
	}
};

const DayOverview = () => {
	const { date, clickedMonth, yearToDisplay } = useMeetingPopUp();
	const [isLoading, setIsLoading] = useState(true);
	const [meetings, setMeetings] = useState();
	const { api } = useUpdateUserContext();

	useEffect(() => {
		const renderDayMeetings = async () => {
			try {
				const meetings = await fetchDayMeeting(
					api,
					date,
					clickedMonth,
					yearToDisplay
				);
				setMeetings(meetings);
			} catch (error) {
				console.error("Error fetching meetings", error);
			} finally {
				setIsLoading(false);
			}
		};
		renderDayMeetings();
	}, [date, clickedMonth, yearToDisplay]);

	return (
		<div className="calender_meeting_overview">
			{!isLoading &&
				(meetings.length > 0 ? (
					meetings.map((meeting) => {
						return <MeetingItem key={uuidv4()} meeting={meeting} />;
					})
				) : (
					<div className="dayOverview">
						No meetings booked for this day.
					</div>
				))}
		</div>
	);
};

export default DayOverview;
