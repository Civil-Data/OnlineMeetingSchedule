import React, { useContext, useState } from "react";
import Meeting from "../views/Meeting";
import { useDateContext } from "./DateContext";

const DayViewToggleContext = React.createContext();
const DayViewContext = React.createContext();
const PopUpContext = React.createContext();

export function useDayViewUpdate() {
	return useContext(DayViewToggleContext);
}

export function useDayView() {
	return useContext(DayViewContext);
}

export function useMeetingPopUp() {
	return useContext(PopUpContext);
}

//Context provider for managing day view state
export const MeetingProvider = ({ children }) => {
	const { getDate } = useDateContext();

	const [dayView, setDayView] = useState(false);
	const [date, setDate] = useState("0");
	const [dayString, setDayString] = useState("");
	const [clickedMonth, setClickedMonth] = useState(getDate().month);

	const [monthToDisplay, setMonthToDisplay] = useState(getDate().month);
	const [yearToDisplay, setYearToDisplay] = useState(getDate().year);

	function updateMonthToDisplay(month) {
		setMonthToDisplay(month);
	}
	function updateYearToDisplay(year) {
		setYearToDisplay(year);
	}

	function closeDayView() {
		setDayView(false);
	}

	// Function to open the day view with given date and day string
	function openDayView(dateNum, dayString, month) {
		setDate(dateNum);
		setDayString(dayString);
		setClickedMonth(month);
		setDayView(true);
	}

	// Provide day view state and functions to children components
	return (
		<DayViewContext.Provider
			value={{
				date,
				dayString,
				clickedMonth,
				yearToDisplay,
			}}
		>
			<DayViewToggleContext.Provider
				value={{
					dayView,
					openDayView,
					closeDayView,
					monthToDisplay,
					yearToDisplay,
					updateMonthToDisplay,
					updateYearToDisplay,
				}}
			>
				{children}
				<Meeting />
			</DayViewToggleContext.Provider>
		</DayViewContext.Provider>
	);
};
