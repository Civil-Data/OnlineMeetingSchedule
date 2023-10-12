import React, { useCallback, useEffect, useState } from "react";
import { useDayViewUpdate } from "../../contexts/MeetingContext";
import { useDateContext } from "../../contexts/DateContext";
import { v4 as uuidv4 } from "uuid";
import DateButtons from "../../Components/DateButtons";

const useCalendarRender = () => {
	const { monthToDisplay, yearToDisplay } = useDayViewUpdate();

	const { getDate } = useDateContext();
	// console.log(getDate());

	const [monthString, setMonthString] = useState(
		getDate(yearToDisplay, monthToDisplay).monthString
	);
	const [rows, setRows] = useState(0);
	const [dateElementList, setDateElementList] = useState([]);

	const renderDates = useCallback(() => {
		const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
		const dateObj = getDate(yearToDisplay, monthToDisplay);
		setMonthString(dateObj.monthString);
		const daysInMonth = dateObj.daysInMonth;
		const startDay = dateObj.startDayOfMonth;

		const startOfGreyDays = days.findIndex(day => day === startDay);

		let dateBlocks = 35; // Default displayed calender size
		const dateList = [];
		let dateIdx = 0;
		let month;

		if (startOfGreyDays + daysInMonth > 35) {
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
					if (dateNum === daysInMonth) {
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

			dateList.push(
				<DateButtons
					key={uuidv4()}
					date={dateNum}
					month={dateObj.month + 1 + month}
					year={yearToDisplay}
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
		setDateElementList(dateList);
	}, [getDate, monthToDisplay, yearToDisplay]);

	useEffect(() => {
		renderDates();
	}, [monthToDisplay, renderDates]);

	return { rows, dateElementList, monthString };
};

export default useCalendarRender;
