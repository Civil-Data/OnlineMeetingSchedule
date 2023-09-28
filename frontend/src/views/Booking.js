import React, { useState } from "react";
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
import axios from "axios";
const Booking = () => {
    const { dayView, date, dayString } = useDayView();
    const { getDate } = useDateContext();
    // console.log(getDate);

    // const [monthToDisplay, setMonthToDisplay] = useState(getDate.month);

    // State for booking meeting details
    const [meetingDetails, setMeetingDetails] = useState({
        date: null,
        time: "",
        attendees: [],
        title: "",
        location: "",
    });

    // Function to handle booking confirmation
    const bookMeeting = async () => {
        try {
            // Set the date and time in the meeting details
            setMeetingDetails({
                ...meetingDetails,
                date: date,
                time: meetingDetails.time,
            });

            // Send a POST request to your Node.js backend to save the meeting details
            await axios.post("/api/meetings", meetingDetails);

            // Close the popup and clear the meeting details
            setMeetingDetails({
                date: null,
                time: "",
                attendees: [],
                title: "",
                location: "",
            });

            // You can add more logic here, like showing a success message
        } catch (error) {
            // Handle error (e.g., show an error message)
        }
    };

    const dateLabels = [];
    // const dates = 31;
    const dateObj = getDate(2023, 9, 0);
    console.log(dateObj);
    // const month = dateObj.month + 1;
    // const year = dateObj.year;
    const dates = dateObj.daysInMonth;
    // const dates = getDaysInMonth(year, month);
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

        dateLabels.push(
            <DateButtons
                key={uuidv4()}
                date={dateNum}
                dayString={
                    getDate(dateObj.year, dateObj.month, dateNum).dayString
                }
                theme={bgd}
            />
        );
    }

    const selectOptions = [
        {
            labelText: "Filter by day:",
            options: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "FriJAAY",
                "Saturday",
                "Sunday",
            ],
        },
        {
            labelText: "Filter by person:",
            options: ["Martin", "Joel", "Matilda", "Felix"],
        },
    ];

    return (
        <>
            {dayView && (
                <>
                    <PopUp>
                        <div className="calendarDate">
                            {dayString} {date}
                        </div>
                        <ConfirmButton></ConfirmButton>
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
                        {selectOptions.map((dropdown) => {
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
                    <div className="grid-container">
                        <div className="month">{dateObj.monthString}</div>
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
