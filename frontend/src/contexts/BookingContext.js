import React, { useContext, useState } from "react";
import Booking from "../views/Booking";

const DayViewToggleContext = React.createContext();
const DayViewContext = React.createContext();

export function useDayViewUpdate() {
	return useContext(DayViewToggleContext);
}

export function useDayView() {
	return useContext(DayViewContext);
}

//Context provider for managing day view state
export const BookingProvider = ({ children }) => {
	const [dayView, setDayView] = useState(false);
	const [date, setDate] = useState("0");
	const [dayString, setDayString] = useState("");

	function closeDayView() {
		setDayView(false);
	}

	// Function to open the day view with given date and day string
	function openDayView(dateNum, dayString) {
		setDate(dateNum);
		setDayString(dayString);
		setDayView(true);
	}

	// Provide day view state and functions to children components
	return (
		<DayViewContext.Provider value={{ dayView, date, dayString }}>
			<DayViewToggleContext.Provider
				value={{ openDayView, closeDayView }}
			>
				{children}
				<Booking />
			</DayViewToggleContext.Provider>
		</DayViewContext.Provider>
	);
};
