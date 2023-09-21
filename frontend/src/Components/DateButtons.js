import React, { useState } from "react";
import ConfirmButton from "./ConfirmButton";
import ClearIcon from "@mui/icons-material/Clear";
// import { Link, useNavigate } from "react-router-dom";

const DateButtons = ({ date }) => {
	const [dayView, setDayView] = useState(false);
	// const [time, setTime] = useState(false);
	// const timeSlots = [
	// 	{ time: "8:00" },
	// 	{ time: "9:00" },
	// 	{ time: "10:30" },
	// 	{ time: "12:00" },
	// 	{ time: "14:45" },
	// ];
	// const [selectedTime, setSelectedTime] = useState(null);

	// const handleTimeClick = (time) => {
	// 	setSelectedTime(time === selectedTime ? null : time);
	// };
	// const navigate = useNavigate();

	// const handleClearClick = () => {
	// 	// Go back to the previous route
	// 	navigate("/booking");
	// };

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
						<ClearIcon></ClearIcon>

						<div className="calendarDate">Monday {date}</div>
						<div className="time">
							<button>8:00</button>
							<button>9:00</button>
							<button>11:30</button>
							<button>13:00</button>
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
