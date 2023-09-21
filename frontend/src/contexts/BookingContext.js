import React, { useContext, useState } from "react";
// import Booking from "../views/Booking";

const DayViewToggleContext = React.createContext();

export function useDayViewUpdate() {
	return useContext(DayViewToggleContext);
}

export const BookingProvider = ({ children }) => {
	const [dayView, setDayView] = useState(false);
	let num = 0;

	function closeDayView() {
		console.log(num++);
		console.log("Close view");
		setDayView(false);
	}

	function openDayView() {
		console.log(num++);
		console.log("Open view");
		setDayView(true);
	}

	return (
		<DayViewToggleContext.Provider
			value={{ dayView, openDayView, closeDayView }}
		>
			{children}
			{/* <Booking /> */}
		</DayViewToggleContext.Provider>
	);
};
