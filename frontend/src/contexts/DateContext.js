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
    // const [date, setDate] = useState("0");
    function getDaysInMonth(year, month) {
        // JavaScript months are 0-based, so we subtract 1 from the month
        const lastDayOfMonth = new Date(year, month, 0);
        console.log(lastDayOfMonth);
        return lastDayOfMonth.getDate();
    }

    function getDate() {
        const date = new Date();
        const dayString = date.toLocaleDateString("en-us", { weekday: "long" });
        const monthString = date.toLocaleDateString("en-us", { month: "long" });

        const dateObj = {
            dateString: date.toLocaleDateString(),
            dayString: dayString[0].toUpperCase() + dayString.slice(1),

            year: date.getFullYear(),
            month: date.getMonth(),
            daysInMonth: date.getDate(),
            monthString: monthString[0].toUpperCase() + monthString.slice(1),
            day: date.getDay(),
            time: date.toLocaleTimeString().slice(0, 5),
        };

        // const year = 2023;
        // const month = 2; // (0-based index)

        // const daysInMonth = getDaysInMonth(dateObj.year, dateObj.month);
        // console.log(`There are ${daysInMonth} days in ${dateObj.monthString}.`);
        // const daysInMonth = getDaysInMonth(dateObj.year, month);
        // console.log(`There are ${daysInMonth} days in ${month}.`);

        console.log(dateObj);
        return dateObj;
    }

    return (
        <DateContext.Provider value={{ getDate, getDaysInMonth }}>{children}</DateContext.Provider>
    );
};
