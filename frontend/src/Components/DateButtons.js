import React, { useState } from "react";
import ConfirmButton from "./ConfirmButton";
// import Confirmation from "./Confirmation";

const DateButtons = ({ date, confirm }) => {
	const [dayView, setDayView] = useState(false);

	// const dateLabels = Array.from({ length: 31 }, (_, index) => index + 1);
	// function dayOverview() {}
	// useEffect(() => {}, [dayView]);
	// const getDayOfWeek = (dateString) => {
	// 	const daysOfWeek = [
	// 		"Monday",
	// 		"Tuesday",
	// 		"Wednesday",
	// 		"Thursday",
	// 		"Friday",
	// 		"Saturday",
	// 		"Sunday",
	// 	];
	// 	const date = new Date(dateString);
	// 	const dayOfWeekIndex = date.getDay();
	// 	return daysOfWeek[dayOfWeekIndex];
	// };
	return (
		<div
			key={date}
			className="dates"
			onClick={() => {
				setDayView((view) => true);
			}}
		>
			{date}
			{dayView && (
				<div className="viewShadow">
					<div className="dayView">
						<div className="calendarDate">Monday {date}</div>
						<div className="time">
							<button>8:00</button>
							<button>9:00</button>
							<button>10:30</button>
							<button>12:00</button>
							<button>14:45</button>
						</div>
						<ConfirmButton></ConfirmButton>
					</div>
				</div>
			)}
		</div>
	);
};

export default DateButtons;
