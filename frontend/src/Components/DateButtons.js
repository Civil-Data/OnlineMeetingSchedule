import React from "react";
import { useDayViewUpdate } from "../contexts/BookingContext";

//Component for a date button
const DateButtons = ({ date, dayString, month, theme }) => {
	const { openDayView } = useDayViewUpdate();

	return (
		<div
			className={`dates ${theme === "grey" ? "grey_dates" : ""}`}
			onClick={() => {
				openDayView(date, dayString, month);
			}}
		>
			<div>{date}</div>
			{/* <div>Meeting at 9:00 am</div> */}
		</div>
	);
};

export default DateButtons;
