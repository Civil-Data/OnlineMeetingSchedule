import React, { useEffect, useState } from "react";
import MeetingItem from "../Profile/MeetingItem";
import { useMeetingPopUp } from "../../contexts/MeetingContext";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import serverUrl from "../../utils/config";

const fetchDayMeeting = async (date, monthToDisplay, yearToDisplay) => {
	try {
		const dateString = `${String(yearToDisplay).padStart(2, "0")}-${String(
			monthToDisplay
		).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
		const { data } = await axios.get(serverUrl + `/meeting/date?date=${dateString}`);

		return data;
	} catch (error) {
		console.error(error);
	}
};

const DayOverview = () => {
	const { date, clickedMonth, yearToDisplay } = useMeetingPopUp();
	const [isLoading, setIsLoading] = useState(true);
	const [meetings, setMeetings] = useState();

	// TODO: FETCH Meetings based on the date clicked (use MeetingContext, popUpProvider perhaps)

	useEffect(() => {
		const renderDayMeetings = async () => {
			try {
				const meetings = await fetchDayMeeting(date, clickedMonth, yearToDisplay);
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
					meetings.map(meeting => {
						return <MeetingItem key={uuidv4()} meeting={meeting} />;
					})
				) : (
					<div className="dayOverview">No meetings booked for this day.</div>
				))}
		</div>
	);
};

export default DayOverview;
