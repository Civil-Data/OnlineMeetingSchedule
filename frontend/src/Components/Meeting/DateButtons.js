import React, { useEffect, useState } from "react";
import { useDayViewUpdate } from "../../contexts/MeetingContext";
import { v4 as uuidv4 } from "uuid";
import APIHandler from "../../utils/api-methods";

const fetchDayMeeting = async (date, monthToDisplay, yearToDisplay) => {
	try {
		const dateString = `${String(yearToDisplay).padStart(2, "0")}-${String(
			monthToDisplay
		).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
		const api = new APIHandler();
		const { data } = await api.GetData(`/meeting/${dateString}`);

		return data;
	} catch (error) {
		console.error(error);
	}
};
const isTodaysDate = (date, month, year) => {
	const today = new Date();
	const todaysYear = today.getFullYear();
	const todaysMonth = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
	const todaysDayNum = today.getDate().toString().padStart(2, "0");

	const customFormattedDate = `${todaysYear}-${todaysMonth}-${todaysDayNum}`;
	const itemDate = `${year}-${month.toString().padStart(2, "0")}-${date
		.toString()
		.padStart(2, "0")}`;
	if (customFormattedDate === itemDate) return true;
	else return false;
};

//Component for a date button
const DateButtons = ({ date, dayString, month, year, theme }) => {
	const { openDayView } = useDayViewUpdate();

	const [isLoading, setIsLoading] = useState(true);
	const [meetings, setMeetings] = useState();
	const [isToday, setIsToday] = useState(false);

	useEffect(() => {
		const renderDayMeetings = async () => {
			setIsToday(isTodaysDate(date, month, year));
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
	}, [date, month, year, isToday]);

	return (
		<div
			className={`dates ${theme === "grey" ? "grey_dates" : ""}`}
			onClick={() => {
				openDayView(date, dayString, month);
			}}
		>
			<div className="place-center">
				<div className={`today ${isToday ? "active" : ""}`}>
					<b>{date}</b>
				</div>
			</div>
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
