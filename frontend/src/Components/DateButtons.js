import React, { useEffect, useState } from "react";
import { useDayViewUpdate } from "../contexts/MeetingContext";
import serverUrl from "../utils/config";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

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

//Component for a date button
const DateButtons = ({ date, dayString, month, year, theme }) => {
	const { openDayView } = useDayViewUpdate();

	const [isLoading, setIsLoading] = useState(true);
	const [meetings, setMeetings] = useState();
	useEffect(() => {
		const renderDayMeetings = async () => {
			try {
				const meetings = await fetchDayMeeting(date, month, year);
				setMeetings(meetings);
			} catch (error) {
				console.error("Error fetching meetings", error);
			} finally {
				setIsLoading(false);
			}
		};
		renderDayMeetings();
	}, [date, month, year]);

	return (
		<div
			className={`dates ${theme === "grey" ? "grey_dates" : ""}`}
			onClick={() => {
				openDayView(date, dayString, month);
			}}
		>
			{date}
			{isLoading ? (
				<></>
			) : (
				meetings.map(meeting => {
					return (
						<div key={uuidv4()}>
							{meeting.title} at {meeting.startTime}
							{/* <div>Meeting at 9:00 am</div> */}
						</div>
					);
				})
			)}
		</div>
	);
};

export default DateButtons;
