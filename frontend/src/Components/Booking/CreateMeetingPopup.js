import React, { useState, useEffect } from "react";
import PopUp from "../PopUp";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";

import serverUrl from "../../utils/config";
import ConfirmButton from "../ConfirmButton";
import { useUserContext } from "../../contexts/LoginContext";

const fetchUsers = async () => {
	try {
		const listOfUsers = [];
		const { data } = await axios.get(serverUrl + "/users");
		data.forEach(user => {
			if (user.name) {
				listOfUsers.push(user);
			}
		});
		return listOfUsers;
	} catch (error) {
		console.error("Could not fetch users.");
		return [];
	}
};

const CreateMeetingPopup = ({ dayString, date }) => {
	const { user } = useUserContext();
	const [participants, setParticipants] = useState([]); // Array with participant names that the users has added.
	const [users, setUsers] = useState([{}]); // Array with users
	// State for booking meeting details
	const [meetingDetails, setMeetingDetails] = useState({
		title: "",
		location: "",
		startDate: "",
		endDate: "",
		startTime: "",
		endTime: "",
		description: "",
	});

	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	// Function to handle booking confirmation
	const bookMeeting = async () => {
		try {
			const participantList = [];
			participants.forEach(participant => {
				users.forEach(user => {
					if (user.name === participant) {
						participantList.push(user.id);
					}
				});
			});

			// Send a POST request to your Node.js backend to save the meeting details
			await axios.post(serverUrl + "/meetings/create", {
				organizer: user._id,
				participants: participantList,
				...meetingDetails,
			});

			// Close the popup and clear the meeting details
			// setMeetingDetails({
			// 	time: "",
			// 	organizer: null,
			// 	participants: [],
			// 	title: "",
			// 	location: "",
			// 	startDate: "",
			// 	endDate: "",
			// 	startTime: "", // Add startTime
			// 	endTime: "", // Add endTime
			// 	description: "",
			// });
		} catch (error) {
			// Handle error
			console.error("An error occurred while booking the meeting.");
			// setErrorMessage("An error occurred while booking the meeting.");
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

	// const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		// const listOfUserNames = [];

		fetchUsers().then(users => {
			console.log(users);
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
			meetingDetails.description &&
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
		<PopUp>
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
					getOptionLabel={option => `${option.name} <${option.email}>`}
					onChange={(event, user) => {
						// console.log(user);

						setParticipants([...participants, user]);
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

			{/* {errorMessage} */}
			<ConfirmButton onClick={bookMeeting} isDisabled={isButtonDisabled} />
		</PopUp>
	);
};

export default CreateMeetingPopup;
