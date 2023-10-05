import React, { useState, useEffect, useCallback } from "react";
import PopUp from "../PopUp";
import { Autocomplete, Box, TextField } from "@mui/material";
import axios from "axios";

import serverUrl from "../../utils/config";
import ConfirmButton from "../ConfirmButton";
import { useUserContext } from "../../contexts/LoginContext";

const CreateMeetingPopup = ({ dayString, date }) => {
	const { user } = useUserContext();
	const [participants, setParticipants] = useState([]); // Array with participant names that the users has added.
	const [users, setUsers] = useState([{}]); // Array with users
	const [listOfUserNames, setListOfUserNames] = useState([]); // Array with users
	// State for booking meeting details
	const [meetingDetails, setMeetingDetails] = useState({
		// time: "",
		// organizer: null, // add function to automatically add organizer throug logged in user
		// participants: [],
		title: "",
		location: "",
		startDate: "",
		endDate: "",
		startTime: "",
		endTime: "",
		description: "",
	});

	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	// const listOfUserNames = [];

	const fetchUsers = useCallback(async () => {
		try {
			const usersArray = await axios.get(serverUrl + "/users");
			usersArray.forEach(user => {
				setListOfUserNames([...listOfUserNames, user.name]);
			});
			setUsers(usersArray);
			// usersArray.forEach(user => {
			// 	setParticipants(users => [...users, user.name]);
			// });
		} catch (error) {
			console.error("Could not fetch users.");
			return "No users found";
		}
	}, [listOfUserNames]);

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
		marginBottom: "6px",
	};
	const muiInputStyleDescription = {
		marginBottom: "6px",
		width: "100%",
	};

	// const [errorMessage, setErrorMessage] = useState("");

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
		fetchUsers();
	}, [meetingDetails, fetchUsers]);

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
					sx={muiInputStyle}
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
					sx={muiInputStyle}
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
					sx={muiInputStyle}
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
				{/* <Autocomplete/> */}

				<Autocomplete
					sx={muiInputStyle}
					multiple
					id="participants"
					options={listOfUserNames} // Add your list of participants here
					value={
						// Array.isArray(meetingDetails.participants)
						// 	? meetingDetails.participants
						// 	: []

						participants

						// users.map(user => user.name)
					}
					onChange={(event, user) => {
						console.log(user);
						console.log(event);
						// setParticipants([
						// 	...participants,
						// 	newValue,
						// 	// {
						// 	// 	participants: newValue, // newValue will be an array of selected participants
						// 	// },
						// ]);

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
				<Box>
					<TextField
						sx={muiInputStyleDescription}
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
				</Box>
				<TextField
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
