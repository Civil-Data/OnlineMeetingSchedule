import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDayViewUpdate } from "../contexts/BookingContext"; //, openDayView

const PopUp = ({ children }) => {
    const { closeDayView } = useDayViewUpdate();
    const [meetingDetails, setMeetingDetails] = useState({
        title: "",
        location: "",
        attendees: [],
    });

    const handleTitleChange = (event) => {
        setMeetingDetails({ ...meetingDetails, title: event.target.value });
    };

    const handleLocationChange = (event) => {
        setMeetingDetails({ ...meetingDetails, location: event.target.value });
    };

    const handleAttendeesChange = (event, values) => {
        setMeetingDetails({ ...meetingDetails, attendees: values });
    };

    return (
        <div className="viewShadow">
            <div className="popUp">
                <div
                    style={{ cursor: "pointer", width: "fit-content" }}
                    onClick={() => {
                        closeDayView();
                    }}
                >
                    <ClearIcon />
                </div>
                {children}
                <div className="meeting-details">
                    <TextField
                        label="Meeting Title"
                        value={meetingDetails.title}
                        onChange={handleTitleChange}
                    />
                    <TextField
                        label="Location"
                        value={meetingDetails.location}
                        onChange={handleLocationChange}
                    />
                    <Autocomplete
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
                </div>
            </div>
        </div>
    );
};

export default PopUp;
