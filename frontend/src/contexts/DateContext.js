import React, { useContext } from "react";

const DateContext = React.createContext();

export function useDateContext() {
	return useContext(DateContext);
}

// Context provider component for managing date-related functionality
export const DateProvider = ({ children }) => {
	function getDaysInMonth(year, month) {
		const lastDayOfMonth = new Date(year, month + 1, 0);
		return lastDayOfMonth.getDate();
	}

	function getCurrentYear() {
		const date = new Date();
		return date.getFullYear();
	}

	function getCurrentMonth() {
		const date = new Date();
		return date.getMonth();
	}

	function getCurrentTime() {
		return new Date().toLocaleTimeString().slice(0, 5);
	}

	// Function to get the name of the first day of the month for a given year and month
	function getStartDayOfMonth(year, month) {
		const date = new Date(year, month, 1);
		const dayString = date.toLocaleDateString("en-us", { weekday: "long" });
		const startDayOfMonth = dayString[0].toUpperCase() + dayString.slice(1);
		return startDayOfMonth;
	}

	// Function to get a date object with various date-related properties
	function getDate(year = getCurrentYear(), month = getCurrentMonth(), day = 0) {
		let date;
		if (day === 0) {
			date = new Date(year, month);
		} else {
			date = new Date(year, month, day);
		}

		const dayString = date.toLocaleDateString("en-us", { weekday: "long" });
		const monthString = date.toLocaleDateString("en-us", { month: "long" });

		const dateObj = {
			currentDate: new Date().getDate(),
			currentDateString: new Date().toLocaleDateString(),
			dayString: dayString[0].toUpperCase() + dayString.slice(1),
			startDayOfMonth: getStartDayOfMonth(year, month),

			year: year,
			month: month,
			daysInPrevMonth: getDaysInMonth(year, month - 1),
			daysInMonth: getDaysInMonth(year, month),
			monthString: monthString[0].toUpperCase() + monthString.slice(1),
			day: date.getDay(),
			// time: date.toLocaleTimeString().slice(0, 5),
			currentTime: getCurrentTime(),
		};

		return dateObj;
	}

	return (
		<DateContext.Provider
			value={{
				getDate,
				getDaysInMonth,
				getCurrentTime,
			}}
		>
			{children}
		</DateContext.Provider>
	);
};
