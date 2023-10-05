import React, { useEffect, useState, useCallback } from "react";

import DateButtons from "../Components/DateButtons";
import { useDayView } from "../contexts/BookingContext";
import { v4 as uuidv4 } from "uuid";
import { useDateContext } from "../contexts/DateContext";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import CreateMeetingPopup from "../Components/Booking/CreateMeetingPopup";

const Booking = () => {
	const { dayView, date, dayString } = useDayView();
	const { getDate } = useDateContext();
	// console.log(getDate());

	const [monthToDisplay, setMonthToDisplay] = useState(getDate().month);
	const [yearToDisplay, setYearToDisplay] = useState(getDate().year);
	const [monthString, setMonthString] = useState(
		getDate(yearToDisplay, monthToDisplay).monthString
	);
	const [rows, setRows] = useState(0);
	const [dateLabels, setDateLabels] = useState([]);

	function updateMonth(monthStep) {
		if (monthToDisplay === 0 && monthStep < 0) {
			setYearToDisplay(year => year - 1);
			setMonthToDisplay(11);
		} else if (monthToDisplay === 11 && monthStep > 0) {
			setYearToDisplay(year => year + 1);
			setMonthToDisplay(0);
		} else {
			setMonthToDisplay(month => month + monthStep);
		}
	}

	const renderDates = useCallback(() => {
		const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
		const dateObj = getDate(yearToDisplay, monthToDisplay);
		setMonthString(dateObj.monthString);
		const dates = dateObj.daysInMonth;
		const startDay = dateObj.startDayOfMonth;

		const startOfGreyDays = days.findIndex(day => day === startDay);

		let dateBlocks = 35;
		const dateLabels = [];
		let dateIdx = 0;
		let month;

		if (startOfGreyDays + dates > 35) {
			setRows(6);
			dateBlocks = 42;
		} else setRows(5);

		if (startOfGreyDays > 0) month = -1;
		else {
			month = 0;
			dateIdx = 1;
		}

		for (let i = 0; i < dateBlocks; i++) {
			let switch_month = false;
			let bgd;
			let dateNum;

			switch (month) {
				case -1:
					bgd = "grey";
					dateNum = dateObj.daysInPrevMonth - startOfGreyDays + 1 + i;
					if (dateNum === dateObj.daysInPrevMonth) {
						switch_month = true;
					}
					break;

				case 0:
					bgd = "dark";
					dateNum = dateIdx;
					if (dateNum === dates) {
						switch_month = true;
					}
					break;

				case 1:
					bgd = "grey";
					dateNum = dateIdx;
					break;

				default:
					break;
			}

			dateLabels.push(
				<DateButtons
					key={uuidv4()}
					date={dateNum}
					dayString={getDate(dateObj.year, dateObj.month + month, dateNum).dayString}
					theme={bgd}
				/>
			);

			if (switch_month) {
				month++;
				dateIdx = 0;
			}
			dateIdx++;
		}
		setDateLabels(dateLabels);
	}, [getDate, monthToDisplay, yearToDisplay]);

	useEffect(() => {
		renderDates();
	}, [monthToDisplay, renderDates]);

	return (
		<>
			{dayView && <CreateMeetingPopup date={date} dayString={dayString} />}

			<div className="calender_area">
				<div
					className="grid-container"
					style={{
						gridTemplateRows: `auto 25px repeat(${rows}, 100px)`,
					}}
				>
					<div className="month">
						<div className="arrowBox" onClick={() => updateMonth(-1)}>
							<ArrowBackIosNewIcon />
						</div>
						<div style={{ width: "300px" }}>
							{monthString} {yearToDisplay}
						</div>
						<div className="arrowBox" onClick={() => updateMonth(1)}>
							<ArrowForwardIosIcon />
						</div>
					</div>
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
		</>
	);
};

export default Booking;
