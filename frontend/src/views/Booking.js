import React from "react";
// import React, { useState } from "react";
import TypingEffect from "../Components/TypingEffect";

import PopUp from "../Components/PopUp";

// import ClearIcon from "@mui/icons-material/Clear";
import ConfirmButton from "../Components/ConfirmButton";
import DateButtons from "../Components/DateButtons";
import { useDayView } from "../contexts/BookingContext";
import { v4 as uuidv4 } from "uuid";
import { useDateContext } from "../contexts/DateContext";
import Dropdown from "../Components/Booking/Dropdown";

const Booking = () => {
	const { dayView, date, dayString } = useDayView();
	const { getDate } = useDateContext();
	// console.log(getDate);

	// const [monthToDisplay, setMonthToDisplay] = useState(getDate.month);

	const dateLabels = [];
	// const dates = 31;
	const dateObj = getDate(2023, 9, 0);
	console.log(dateObj);
	// const month = dateObj.month + 1;
	// const year = dateObj.year;
	const dates = dateObj.daysInMonth;
	// const dates = getDaysInMonth(year, month);
	console.log(dates);
	let bgd = "dark";
	let dateIdx = 0;
	for (let index = 0; index < 35; index++) {
		let dateNum = dateIdx + 1;
		if (dateNum > dates) {
			bgd = "grey";
			dateIdx = 0;
			dateNum = 1;
		}
		dateIdx++;

		dateLabels.push(
			<DateButtons
				key={uuidv4()}
				date={dateNum}
				dayString={
					getDate(dateObj.year, dateObj.month, dateNum).dayString
				}
				theme={bgd}
			/>
		);
	}

	const selectOptions = [
		{
			labelText: "Please choose lenght:",
			options: ["30 min", "45 min", "1h", "2h"],
		},
		{
			labelText: "Please choose person:",
			options: ["Martin", "Joel", "Matilda", "Felix"],
		},
		{
			labelText: "Filter participants by country:",
			options: ["Sweden", "Norway", "Denmark", "Finland"],
		},
	];

	return (
		<>
			{dayView && (
				<>
					<PopUp>
						<div className="calendarDate">
							{dayString} {date}
						</div>
						<div className="time">
							<button>8:00</button>
							<button>9:00</button>
							<button>10:30</button>
							<button>12:00</button>
							<button>14:45</button>
							<ConfirmButton></ConfirmButton>
						</div>
					</PopUp>
				</>
			)}

			<div>
				<div className="calender_area">
					<div className="titles">
						<h1>Booking Page</h1>
						<TypingEffect
							text="Welcome to the booking page! Please choose length of the meeting and choose a valid day to book a meeting."
							delay={25}
						/>
					</div>
					<div className="meeting_options">
						{selectOptions.map((dropdown) => {
							return (
								<Dropdown
									key={uuidv4()}
									id={selectOptions.indexOf(dropdown)}
									labelText={dropdown.labelText}
									selectOptions={dropdown.options}
								/>
							);
						})}
					</div>
					<div className="grid-container">
						<div className="month">{dateObj.monthString}</div>
						<div className="day">Monday</div>
						<div className="day">Tuesday</div>
						<div className="day">Wednesday</div>
						<div className="day">Thursday</div>
						<div className="day">Friday</div>
						<div className="day">Saturday</div>
						<div className="day">Sunday</div>
						{dateLabels}
					</div>
				</div>
			</div>
		</>
	);
};

export default Booking;
