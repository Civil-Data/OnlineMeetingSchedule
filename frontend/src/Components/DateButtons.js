import React from "react";
import { useDayViewUpdate } from "../contexts/BookingContext";

//Component for a date button
const DateButtons = ({ date, dayString, theme }) => {
	const { openDayView } = useDayViewUpdate();

	return (
		<div
			className={`dates ${theme === "grey" ? "grey_dates" : ""}`}
			onClick={() => {
				openDayView(date, dayString);
			}}
		>
			{date}
		</div>
	);
};

export default DateButtons;
