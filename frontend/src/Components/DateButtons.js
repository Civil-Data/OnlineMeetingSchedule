import React, { useState } from "react";
import ConfirmButton from "./ConfirmButton";
import ClearIcon from "@mui/icons-material/Clear";
// import { Link, useNavigate } from "react-router-dom";

const DateButtons = ({ date, confirm, theme }) => {
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

	function closeDayView() {
		// console.log(bool);
		setDayView(false);
	}

	function openDayView() {
		setDayView(true);
	}
	return (
		<div
			key={date}
			className={`dates ${theme === "grey" ? "grey_dates" : ""}`}
			onClick={() => {
				// openDayView();
				openDayView();
			}}
		>
			{date}
			<div className="date_info">Meeting 9:00am</div>
			{dayView && (
				<div className="viewShadow">
					<div className="dayView">
						<div
							onClick={() => {
								closeDayView();
							}}
						>
							<ClearIcon />
						</div>
						<div className="calendarDate">Monday {date}</div>
						<div className="time">
							<button>8:00</button>
							<button>9:00</button>
							<button>10:30</button>
							<button>12:00</button>
							<button>14:45</button>
						</div>
						<ConfirmButton
							closePopup={closeDayView}
						></ConfirmButton>
					</div>
				</div>
			)}
		</div>
	);
};

export default DateButtons;
