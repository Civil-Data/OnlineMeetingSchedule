import React, { useContext } from "react";

const DateContext = React.createContext();
// const DayViewContext = React.createContext();

export function useDateContext() {
    return useContext(DateContext);
}

// export function useDayView() {
//     return useContext(DayViewContext);
// }

export const DateProvider = ({ children }) => {
    // const [dayView, setDayView] = useState(false);
    // const [daysInMonth, setDaysInMonth] = useState();

    function getDaysInMonth(year, month) {
        // JavaScript months are 0-based, so we subtract 1 from the month
        const lastDayOfMonth = new Date(year, month, 0);
        // setDaysInMonth(lastDayOfMonth);
        //console.log(lastDayOfMonth);
        return lastDayOfMonth.getDate();
    }

    // function getDayString(year, month, day = 0) {
    //     // JavaScript months are 0-based, so we subtract 1 from the month
    //     const lastDayOfMonth = new Date(year, month, day);
    //     // setDaysInMonth(lastDayOfMonth);
    //     //console.log(lastDayOfMonth);
    //     return lastDayOfMonth.toLocaleDateString("en-us", { weekday: "long" });
    // }

    function getDate(year, month, day = 0) {
        if (day !== 0) {
            month--;
        }
        // else {
        //     month;
        // }
        // const date = new Date(year, month, day);
        const date = new Date();

        const dayString = date.toLocaleDateString("en-us", { weekday: "long" });
        const monthString = date.toLocaleDateString("en-us", { month: "long" });

        const dateObj = {
            dateString: date.toLocaleDateString(),
            // dayString: getDayString(year, month, day),
            dayString: dayString[0].toUpperCase() + dayString.slice(1),

            year: date.getFullYear(),
            month: date.getMonth(),
            daysInMonth: getDaysInMonth(year, month),
            monthString: monthString[0].toUpperCase() + monthString.slice(1),
            day: date.getDay(),
            time: date.toLocaleTimeString().slice(0, 5),
        };
        // console.log(dayString);
        // setDaysInMonth(getDaysInMonth(dateObj.year, dateObj.month + 1));

        // console.log(dateObj);
        return dateObj;
    }

    return (
        <DateContext.Provider value={{ getDate, getDaysInMonth }}>{children}</DateContext.Provider>
    );
};
