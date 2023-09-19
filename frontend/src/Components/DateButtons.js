import React, { useState, useEffect } from "react";

const DateButtons = ({ date }) => {
	const [dayView, setDayView] = useState(false);
	// const dateLabels = Array.from({ length: 31 }, (_, index) => index + 1);
	function dayOverview() {
		<div className="shadowBooking"></div>;
	}
	useEffect(() => {}, [dayView]);
	return (
		<div
			key={date}
			className="dates"
			onClick={() => {
				setDayView((view) => !view);
			}}
		>
			{date}
		</div>
	);
};

export default DateButtons;
