import React from "react";
import { useDayViewUpdate } from "../contexts/BookingContext";

const DateButtons = ({ date, confirm, theme }) => {
    const { openDayView } = useDayViewUpdate();

    // # TODO: FIGURE OUT HOW TO GET GRID COLUMN INDEX AND PASS IT AS PROP TO DATEBUTTON COMPONENT. #
    // # THEN GET THE CORRECT DAY BY THAT INDEX #

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
            className={`dates ${theme === "grey" ? "grey_dates" : ""}`}
            onClick={() => {
                openDayView(date);
            }}
        >
            {date}
            <div className="date_info">Meeting 9:00am</div>
        </div>
    );
};

export default DateButtons;
