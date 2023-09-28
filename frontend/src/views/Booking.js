import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import PopUp from "../Components/PopUp";
import ConfirmButton from "../Components/ConfirmButton";
import DateButtons from "../Components/DateButtons";
import { useDayView } from "../contexts/BookingContext";
import { v4 as uuidv4 } from "uuid";
import { useDateContext } from "../contexts/DateContext";

import axios from "axios";

const Booking = () => {
    const { dayView, date, dayString } = useDayView();
    const { getDate } = useDateContext();
    const [errorMessage, setErrorMessage] = useState("");
    const handleTitleChange = (event) => {
        setMeetingDetails({ ...meetingDetails, title: event.target.value });
    };

    const handleLocationChange = (event) => {
        setMeetingDetails({ ...meetingDetails, location: event.target.value });
    };

    const handleAttendeesChange = (event, values) => {
        setMeetingDetails({ ...meetingDetails, attendees: values });
    };
    const handleStartDateChange = (event) => {
        setMeetingDetails({ ...meetingDetails, startDate: event.target.value });
    };

    const handleEndDateChange = (event) => {
        setMeetingDetails({ ...meetingDetails, endDate: event.target.value });
    };

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        // Check if all required fields have valid values
        if (
            meetingDetails.title &&
            meetingDetails.location &&
            meetingDetails.startTime &&
            meetingDetails.endTime &&
            meetingDetails.startDate &&
            meetingDetails.endDate
        ) {
            // Enable the button if all fields are filled
            setIsButtonDisabled(false);
            setErrorMessage("");
        } else {
            // Disable the button if any field is empty
            setIsButtonDisabled(true);
        }
    }, [meetingDetails]);

    // State for booking meeting details
    const [meetingDetails, setMeetingDetails] = useState({
        date: null,
        time: "",
        attendees: [],
        title: "",
        location: "",
        startTime: "", // Add startTime
        endTime: "", // Add endTime
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
                startTime: "",
                endTime: "", // Clear startTime and endTime
            });

            // You can add more logic here, like showing a success message
        } catch (error) {
            // Handle error (e.g., show an error message)
            setErrorMessage("An error occurred while booking the meeting.");
        }
    };

    const dateLabels = [];
    const dateObj = getDate(2023, 9, 0);
    const dates = dateObj.daysInMonth;
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
            labelText: "Filter events by day:",
            options: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "FriJAY",
                "Saturday",
                "Sunday",
            ],
        },
        {
            labelText: "Filter events by person:",
            options: ["Martin", "Joel", "Matilda", "Felix"],
        },
    ];

    const muiInputStyle = {
        marginBottom: "6px",
    };

    return (
        <>
            {dayView && (
                <>
                    <PopUp>
                        <div className="calendarDate" style={muiInputStyle}>
                            {dayString} {date}
                        </div>
                        <div>
                            <TextField
                                sx={muiInputStyle}
                                label="Meeting Title"
                                value={meetingDetails.title}
                                onChange={handleTitleChange}
                            />
                            <TextField
                                sx={muiInputStyle}
                                label="Location"
                                value={meetingDetails.location}
                                onChange={handleLocationChange}
                            />
                            <TextField
                                sx={muiInputStyle}
                                className="calendar_choose_time"
                                label="Start Time" // Add Start Time field
                                value={meetingDetails.startTime}
                                onChange={(event) =>
                                    setMeetingDetails({
                                        ...meetingDetails,
                                        startTime: event.target.value,
                                    })
                                }
                                type="time"
                                InputLabelProps={{
                                    shrink: true,
                                    style: {
                                        transform:
                                            "translate(14px,-6px) scale(0.75)",
                                    },
                                }}
                            />
                            <TextField
                                sx={muiInputStyle}
                                label="End Time" // Add End Time field
                                value={meetingDetails.endTime}
                                onChange={(event) =>
                                    setMeetingDetails({
                                        ...meetingDetails,
                                        endTime: event.target.value,
                                    })
                                }
                                type="time"
                                InputLabelProps={{
                                    shrink: true,
                                    style: {
                                        transform:
                                            "translate(14px,-6px) scale(0.75)",
                                    },
                                }}
                            />
                            <Autocomplete
                                sx={muiInputStyle}
                                multiple
                                id="attendees"
                                options={[]} // Add your list of attendees here
                                value={meetingDetails.attendees}
                                onChange={handleAttendeesChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Attendees"
                                        placeholder="Select attendees"
                                    />
                                )}
                            />
                            <TextField
                                label="Start Date"
                                type="date"
                                value={meetingDetails.startDate}
                                onChange={handleStartDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                label="End Date"
                                type="date"
                                value={meetingDetails.endDate}
                                onChange={handleEndDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <ConfirmButton
                            onClick={bookMeeting}
                            disabled={isButtonDisabled}
                        />
                    </PopUp>
                </>
            )}

            <div>
                <div className="calender_area">
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
