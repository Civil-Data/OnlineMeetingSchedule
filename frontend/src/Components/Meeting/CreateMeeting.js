import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";

import serverUrl from "../../utils/config";
import ConfirmButton from "../ConfirmButton";
import { useUserContext } from "../../contexts/LoginContext";
import { useDayView } from "../../contexts/MeetingContext";
import { useDateContext } from "../../contexts/DateContext";

const fetchUsers = async () => {
	try {
		const listOfUsers = [];
		const { data } = await axios.get(serverUrl + "/users");
		data.forEach(user => {
			if (user.firstName) {
				listOfUsers.push(user);
			}
		});
		return listOfUsers;
	} catch (error) {
		console.error("Could not fetch users.");
		return [];
	}
};

const CreateMeeting = () => {
	const { user } = useUserContext();
	const { date, dayString, clickedMonth, yearToDisplay } = useDayView();
	const { getDate } = useDateContext();
	const dateString = `${yearToDisplay}-${clickedMonth.toString().padStart(2, "0")}-${date
		.toString()
		.padStart(2, "0")}`;

	const [participants, setParticipants] = useState([]); // Array with participant names that the users has added.
	const [users, setUsers] = useState([{}]); // Array with users
	// State for meeting meeting details
	const [meetingDetails, setMeetingDetails] = useState({
		title: "",
		location: "",
		startDate: dateString,
		endDate: "",
		startTime: getDate().currentTime,
		endTime: "",
		description: "",
	});

	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	// Function to handle meeting confirmation
	const bookMeeting = async () => {
		try {
			const participantList = [];
			participants.forEach(participant => {
				participantList.push(participant._id);
			});

			await fetch(serverUrl + "/meeting/create", {
				method: "POST",

				headers: { "Content-type": "application/json" },
				body: JSON.stringify({
					organizer: user._id,
					participants: participantList,
					...meetingDetails,
				}),
			});
		} catch (error) {
			// Handle error
			console.error("An error occurred while meeting the meeting.");
			// setErrorMessage("An error occurred while meeting the meeting.");
		}
	};

	const muiInputStyle = {
		margin: "6px 0",
	};
	const muiInputStyleDescription = {
		// marginBottom: "6px",
		// margin: "0",
		width: "100%",
	};

	const seperateLeft = {
		marginLeft: "12px",
	};

	useEffect(() => {
		fetchUsers().then(users => {
			setUsers(users);
		});
	}, []);

	useEffect(() => {
		// Check if all required fields have valid values
		if (
			meetingDetails.title &&
			meetingDetails.location &&
			meetingDetails.startTime &&
			meetingDetails.endTime &&
			meetingDetails.startDate &&
			meetingDetails.endDate &&
			meetingDetails.endDate >= meetingDetails.startDate &&
			meetingDetails.endTime > meetingDetails.startTime
		) {
			// Enable the button if all fields are filled
			setIsButtonDisabled(false);
			// setErrorMessage("");
		} else {
			// Disable the button if any field is empty
			setIsButtonDisabled(true);
		}
	}, [meetingDetails]);

	return (
		<>
			<div className="calendarDate" style={muiInputStyle}>
				{dayString} {date}
			</div>
			<div>
				<TextField
					sx={muiInputStyle}
					label="Meeting Title"
					value={meetingDetails.title}
					onChange={event =>
						setMeetingDetails({
							...meetingDetails,
							title: event.target.value,
						})
					}
				/>
				<TextField
					sx={{ ...muiInputStyle, ...seperateLeft }}
					label="Location"
					value={meetingDetails.location}
					onChange={event =>
						setMeetingDetails({
							...meetingDetails,
							location: event.target.value,
						})
					}
				/>
				<TextField
					sx={{ ...muiInputStyle, ...seperateLeft }}
					className="calendar_choose_time"
					label="Start Time" // Add Start Time field
					value={meetingDetails.startTime}
					onChange={event =>
						setMeetingDetails({
							...meetingDetails,
							startTime: event.target.value,
						})
					}
					type="time"
					InputLabelProps={{
						shrink: true,
						style: {
							transform: "translate(14px,-6px) scale(0.75)",
						},
					}}
				/>
				<TextField
					sx={{ ...muiInputStyle, ...seperateLeft }}
					label="End Time" // Add End Time field
					value={meetingDetails.endTime}
					onChange={event =>
						setMeetingDetails({
							...meetingDetails,
							endTime: event.target.value,
						})
					}
					type="time"
					InputLabelProps={{
						shrink: true,
						style: {
							transform: "translate(14px,-6px) scale(0.75)",
						},
					}}
				/>

				<Autocomplete
					sx={muiInputStyle}
					multiple
					id="participants"
					options={users} // Add your list of participants here
					getOptionLabel={option =>
						`${option.firstName} ${option.lastName} <${option.email}>`
					}
					onChange={(event, user) => {
						setParticipants(user);
					}}
					renderInput={params => (
						<TextField
							{...params}
							label="Participants"
							placeholder="Select participants"
						/>
					)}
				/>

				<TextField
					sx={{ ...muiInputStyle, ...muiInputStyleDescription }}
					label="Description"
					type="description"
					value={meetingDetails.description}
					onChange={event =>
						setMeetingDetails({
							...meetingDetails,
							description: event.target.value,
						})
					}
					multiline
					rows={3}
				/>

				<TextField
					sx={muiInputStyle}
					label="Start Date"
					type="date"
					value={meetingDetails.startDate}
					onChange={event =>
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
					sx={{ ...muiInputStyle, ...seperateLeft }}
					label="End Date"
					type="date"
					value={meetingDetails.endDate}
					onChange={event =>
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

			<ConfirmButton isDisabled={isButtonDisabled} bookMeeting={bookMeeting} />
		</>
	);
};

export default CreateMeeting;
