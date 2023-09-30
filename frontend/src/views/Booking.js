import React, { useEffect, useState, useCallback } from "react";
// import React, { useState } from "react";
import TypingEffect from "../Components/TypingEffect";

import PopUp from "../Components/PopUp";

// import ClearIcon from "@mui/icons-material/Clear";
import ConfirmButton from "../Components/ConfirmButton";
import DateButtons from "../Components/DateButtons";
import { useDayView } from "../contexts/BookingContext";
import { v4 as uuidv4 } from "uuid";
import { useDateContext } from "../contexts/DateContext";
import Dropdown from "../Components/Booking/Dropdown";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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

        if (startOfGreyDays + dates > 35) {
            setRows(6);
            dateBlocks = 42;
        } else setRows(5);

        const dateLabels = [];
        let dateIdx = 0;
        let month;

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

    const selectOptions = [
        {
            labelText: "Please choose lenght:",
            options: ["30 min", "45 min", "1h", "2h"],
        },
        {
            labelText: "Please choose person:",
            options: ["Martin", "Joel", "Matilda", "Felix"],
        },
        {
            labelText: "Filter participants by country:",
            options: ["Sweden", "Norway", "Denmark", "Finland"],
        },
    ];

    useEffect(() => {
        renderDates();
    }, [monthToDisplay, renderDates]);

    return (
        <>
            {dayView && (
                <>
                    <PopUp>
                        <div className="calendarDate">
                            {dayString} {date}
                        </div>
                        <div className="time">
                            <button>8:00</button>
                            <button>9:00</button>
                            <button>10:30</button>
                            <button>12:00</button>
                            <button>14:45</button>
                            <ConfirmButton></ConfirmButton>
                        </div>
                    </PopUp>
                </>
            )}

            <div>
                <div className="calender_area">
                    <div className="titles">
                        <h1>Booking Page</h1>
                        <TypingEffect
                            text="Welcome to the booking page! Please choose length of the meeting and choose a valid day to book a meeting."
                            delay={25}
                        />
                    </div>
                    <div className="meeting_options">
                        {selectOptions.map(dropdown => {
                            return (
                                <Dropdown
                                    key={uuidv4()}
                                    id={selectOptions.indexOf(dropdown)}
                                    labelText={dropdown.labelText}
                                    selectOptions={dropdown.options}
                                />
                            );
                        })}
                    </div>
                    <div
                        className="grid-container"
                        style={{ gridTemplateRows: `auto 25px repeat(${rows}, 100px)` }}
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
            </div>
        </>
    );
};

export default Booking;
