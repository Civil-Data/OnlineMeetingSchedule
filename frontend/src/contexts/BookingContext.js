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

export const BookingProvider = ({ children }) => {
    const [dayView, setDayView] = useState(false);
    const [date, setDate] = useState("0");

    function closeDayView() {
        setDayView(false);
    }

    function openDayView(dateNum) {
        setDate(dateNum);
        setDayView(true);
    }

    return (
        <DayViewContext.Provider value={{ dayView, date }}>
            <DayViewToggleContext.Provider value={{ openDayView, closeDayView }}>
                {children}
                <Booking />
            </DayViewToggleContext.Provider>
        </DayViewContext.Provider>
    );
};
