import React, { useEffect, useState, useCallback } from "react";
// import React, { useState } from "react";
import TypingEffect from "../Components/TypingEffect";

import PopUp from "../Components/PopUp";
import ConfirmButton from "../Components/ConfirmButton";
import DateButtons from "../Components/DateButtons";
import { useDayView } from "../contexts/BookingContext";
import { v4 as uuidv4 } from "uuid";
import { useDateContext } from "../contexts/DateContext";

import axios from "axios";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Autocomplete, Box, TextField } from "@mui/material";

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
    // State for booking meeting details
    const [meetingDetails, setMeetingDetails] = useState({
        time: "",
        attendees: [],
        title: "",
        location: "",
        startDate: "",
        endDate: "",
        startTime: "", // Add startTime
        endTime: "", // Add endTime
        description: "",
    });

    function updateMonth(monthStep) {
        if (monthToDisplay === 0 && monthStep < 0) {
            setYearToDisplay((year) => year - 1);
            setMonthToDisplay(11);
        } else if (monthToDisplay === 11 && monthStep > 0) {
            setYearToDisplay((year) => year + 1);
            setMonthToDisplay(0);
        } else {
            setMonthToDisplay((month) => month + monthStep);
        }
    }

    const [errorMessage, setErrorMessage] = useState("");

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        // Check if all required fields have valid values
        if (
            meetingDetails.title &&
            meetingDetails.location &&
            meetingDetails.startTime &&
            meetingDetails.endTime &&
            meetingDetails.startDate &&
            meetingDetails.endDate &&
            meetingDetails.description &&
            meetingDetails.endDate >= meetingDetails.startDate &&
            meetingDetails.endTime > meetingDetails.startTime
        ) {
            // Enable the button if all fields are filled
            setIsButtonDisabled(false);
            setErrorMessage("");
        } else {
            // Disable the button if any field is empty
            setIsButtonDisabled(true);
        }
    }, [meetingDetails]);

    // Function to handle booking confirmation
    const bookMeeting = async () => {
        try {
            // // Set the date and time in the meeting details
            // setMeetingDetails({
            //     ...meetingDetails,
            //     date: date,
            //     time: meetingDetails.time,
            // });

            // Send a POST request to your Node.js backend to save the meeting details
            await axios.post("/api/meetings", meetingDetails);

            // Close the popup and clear the meeting details
            setMeetingDetails({
                time: "",
                attendees: [],
                title: "",
                location: "",
                startDate: "",
                endDate: "",
                startTime: "", // Add startTime
                endTime: "", // Add endTime
                description: "",
            });
        } catch (error) {
            // Handle error
            setErrorMessage("An error occurred while booking the meeting.");
        }
    };

    const renderDates = useCallback(() => {
        const days = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ];
        const dateObj = getDate(yearToDisplay, monthToDisplay);
        console.log(dateObj);
        setMonthString(dateObj.monthString);
        const dates = dateObj.daysInMonth;
        const startDay = dateObj.startDayOfMonth;

        const startOfGreyDays = days.findIndex((day) => day === startDay);

        let dateBlocks = 35;
        const dateLabels = [];
        let dateIdx = 0;
        let month;

        if (startOfGreyDays + dates > 35) {
            setRows(6);
            dateBlocks = 42;
        } else setRows(5);

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
                    dayString={
                        getDate(dateObj.year, dateObj.month + month, dateNum)
                            .dayString
                    }
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

    useEffect(() => {
        renderDates();
    }, [monthToDisplay, renderDates]);

    const muiInputStyle = {
        marginBottom: "6px",
    };
    const muiInputStyleDescription = {
        marginBottom: "6px",
        width: "100%",
    };

    return (
        <>
            {dayView && (
                <PopUp>
                    <div className="calendarDate" style={muiInputStyle}>
                        {dayString} {date}
                    </div>
                    <div>
                        <TextField
                            sx={muiInputStyle}
                            label="Meeting Title"
                            value={meetingDetails.title}
                            onChange={(event) =>
                                setMeetingDetails({
                                    ...meetingDetails,
                                    title: event.target.value,
                                })
                            }
                        />
                        <TextField
                            sx={muiInputStyle}
                            label="Location"
                            value={meetingDetails.location}
                            onChange={(event) =>
                                setMeetingDetails({
                                    ...meetingDetails,
                                    location: event.target.value,
                                })
                            }
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
                        {/* <Autocomplete/> */}

                        <Autocomplete
                            sx={muiInputStyle}
                            multiple
                            id="attendees"
                            options={["Martin", "Noel"]} // Add your list of attendees here
                            value={
                                Array.isArray(meetingDetails.attendees)
                                    ? meetingDetails.attendees
                                    : []
                            }
                            onChange={(event, newValue) =>
                                setMeetingDetails({
                                    ...meetingDetails,
                                    attendees: newValue, // newValue will be an array of selected attendees
                                })
                            }
                            // value={meetingDetails.attendees}
                            // onChange={(event) =>
                            //     setMeetingDetails({
                            //         ...meetingDetails,
                            //         attendees: event.target.value,
                            //     })
                            // }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Attendees"
                                    placeholder="Select attendees"
                                />
                            )}
                        />
                        <Box>
                            {/* <div> */}
                            <TextField
                                sx={muiInputStyleDescription}
                                label="Description"
                                type="description"
                                value={meetingDetails.description}
                                onChange={(event) =>
                                    setMeetingDetails({
                                        ...meetingDetails,
                                        description: event.target.value,
                                    })
                                }
                                multiline
                                rows={3}
                            />
                            {/* </div> */}
                        </Box>
                        <TextField
                            label="Start Date"
                            type="date"
                            value={meetingDetails.startDate}
                            onChange={(event) =>
                                setMeetingDetails({
                                    ...meetingDetails,
                                    startDate: event.target.value,
                                })
                            }
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="End Date"
                            type="date"
                            value={meetingDetails.endDate}
                            onChange={(event) =>
                                setMeetingDetails({
                                    ...meetingDetails,
                                    endDate: event.target.value,
                                })
                            }
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>

                    <ConfirmButton
                        onClick={bookMeeting}
                        isDisabled={isButtonDisabled}
                    />
                </PopUp>
            )}

            {/* <div> */}
            <div className="calender_area">
                <div
                    className="grid-container"
                    style={{
                        gridTemplateRows: `auto 25px repeat(${rows}, 100px)`,
                    }}
                >
                    <div className="month">
                        <div
                            className="arrowBox"
                            onClick={() => updateMonth(-1)}
                        >
                            <ArrowBackIosNewIcon />
                        </div>
                        <div style={{ width: "300px" }}>
                            {monthString} {yearToDisplay}
                        </div>
                        <div
                            className="arrowBox"
                            onClick={() => updateMonth(1)}
                        >
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
        </>
    );
};

export default Booking;
