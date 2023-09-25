import React from "react";
// import React, { useState } from "react";
import Title from "../Components/Title";
import TypingEffect from "../Components/TypingEffect";

import ClearIcon from "@mui/icons-material/Clear";
import ConfirmButton from "../Components/ConfirmButton";
import DateButtons from "../Components/DateButtons";
import { useDayViewUpdate, useDayView } from "../contexts/BookingContext";
import { v4 as uuidv4 } from "uuid";
import { useDateContext } from "../contexts/DateContext";

const Booking = () => {
    const { dayView, date } = useDayView();
    const { closeDayView } = useDayViewUpdate();
    const { getDate, getDaysInMonth } = useDateContext();
    // console.log(getDate);
    // const [a, b] = [1, 2];

    // const [monthToDisplay, setMonthToDisplay] = useState(getDate.month);

    const dateLabels = [];
    // const dates = 31;
    const dates = getDaysInMonth(2023, 3);
    console.log(dates);
    let bgd = "dark";
    let dateIdx = 0;
    for (let index = 0; index < 35; index++) {
        let dateNum = dateIdx + 1;
        if (dateNum > dates) {
            bgd = "grey";
            dateIdx = 0;
            dateNum = 1;
        }
        dateIdx++;
        dateLabels.push(<DateButtons key={uuidv4()} date={dateNum} theme={bgd} />);
    }
    // const [day, setDay] = useState(false);
    return (
        <>
            <button onClick={() => getDate()}>Click for date</button>
            {/* <p>{dateString.toString()}</p> */}
            {dayView && (
                <div className="viewShadow">
                    <div className="dayView">
                        <div
                            className="cross"
                            onClick={() => {
                                closeDayView();
                            }}
                        >
                            <ClearIcon />
                        </div>
                        <div className="calendarDate">Monday {date}</div>
                        <div className="time">
                            <button>8:00</button>
                            <button>9:00</button>
                            <button>10:30</button>
                            <button>12:00</button>
                            <button>14:45</button>
                        </div>
                        <ConfirmButton></ConfirmButton>
                    </div>
                </div>
            )}

            <div>
                <div className="titles">
                    <Title title="Booking page" className="titles" />
                    <TypingEffect
                        text="Welcome to the booking page! Please choose length of the meeting and choose a valid day to book a meeting."
                        delay={25}
                    />
                </div>
                <div className="calender_area">
                    <div className="meeting_options">
                        <label htmlFor="dropdown"> Please choose lenght: </label>
                        <select id="dropdown">
                            <option value="30 minutes"> 30 Minutes</option>
                            <option value="45min"> 45 Minutes</option>
                            <option value="1h"> 1 Hour</option>
                            <option value="2h"> 2 Hours</option>
                        </select>
                        <label htmlFor="dropdown"> Please choose person: </label>
                        <select id="dropdown">
                            <option value="Martin"> Martin</option>
                            <option value="Joel"> Joel</option>
                            <option value="Matilda"> Matilda</option>
                            <option value="Felix"> Felix</option>
                        </select>
                    </div>
                    <div className="grid-container">
                        <div className="month">Month Year</div>
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
