import React, { useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
// import { useMeetingUpdate } from "../../contexts/MeetingContext";
import EditIcon from "@mui/icons-material/Edit";
// import ClearIcon from "@mui/icons-material/Clear";
import { ToastContainer } from "react-toastify";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDateContext } from "../../contexts/DateContext";
import { useEffect } from "react";
import axios from "axios";
import serverUrl from "../../utils/config";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const fetchUsers = async () => {
	try {
		const listOfUsers = [];
		const { data } = await axios.get(serverUrl + "/users");
		data.forEach((user) => {
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

const handleSuccess = (msg) =>
	toast.success(msg, {
		position: "bottom-right",
	});

const deleteMeeting = async (meeting) => {
	try {
		const { data } = await axios.delete(
			serverUrl + `/meeting/delete?meetingID=${meeting._id}`
		);
		handleSuccess(data.message);
	} catch (error) {
		console.log("Error Deleting Meeting");
	}
};
//Component for meeting
const MeetingItem = ({ meeting }) => {
	const navigate = useNavigate();
	const [detailIcon, setDetailIcon] = useState(false);
	const { getDate } = useDateContext();

	// const [editIcon, setEditIcon] = useState(false);
	const toggleState = () => {
		setDetailIcon(!detailIcon);
	};
	const [users, setUsers] = useState([{}]); // Array with users

	const [meetingDetails, setMeetingDetails] = useState({
		title: "",
		location: "",
		startDate: "",
		endDate: "",
		startTime: getDate().currentTime,
		endTime: "",
		description: "",
	});
	const [editButtonClicked, setEditButtonClicked] = useState(false);
	const [participants, setParticipants] = useState([]); // Array with participant names that the users has added.
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

	const updateMeeting = async () => {
		try {
			const participantList = [];
			participants.forEach((participant) => {
				participantList.push(participant._id);
			});
			const { data } = await axios.post(
				serverUrl + "/meeting/update",
				{
					meetingID: meeting._id,
					participants: participantList,
					...meetingDetails,
				},
				{ withCredentials: true }
			);
			handleSuccess(data.message);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchUsers().then((users) => {
			setUsers(users);
		});
	}, []);

	return (
		<div className="meeting_item">
			<div className="meeting_item_header">
				<div className="meeting_header_titles">Meeting title</div>
				<div className="meeting_header_titles">When?</div>
				<div className="meeting_header_titles">Where?</div>
			</div>

			<div
				className="details"
				style={{ cursor: "pointer" }}
				onClick={() => toggleState()}
			>
				<ArrowRightIcon />
				Details
			</div>

			{detailIcon && (
				<>
					<div className="participants">
						{!editButtonClicked ? (
							<>
								<div>Organizer:</div>
								<div>Participants:</div>
								<br></br>
								<div>Information: </div>
								<br></br>
								<button
									onClick={() => {
										setEditButtonClicked(
											!editButtonClicked
										);
									}}
									className="edit_button"
								>
									Edit
									<EditIcon />
								</button>
							</>
						) : (
							<>
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
										sx={{
											...muiInputStyle,
											...seperateLeft,
										}}
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
										sx={{
											...muiInputStyle,
											...seperateLeft,
										}}
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
										sx={{
											...muiInputStyle,
											...seperateLeft,
										}}
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
										id="participants"
										options={users} // Add your list of participants here
										getOptionLabel={(option) =>
											`${option.firstName} ${option.lastName} <${option.email}>`
										}
										onChange={(event, user) => {
											setParticipants(user);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Participants"
												placeholder="Select participants"
											/>
										)}
									/>

									<TextField
										sx={{
											...muiInputStyle,
											...muiInputStyleDescription,
										}}
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

									<TextField
										sx={muiInputStyle}
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
										sx={{
											...muiInputStyle,
											...seperateLeft,
										}}
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
								<button
									type="submit"
									onClick={() => {
										setEditButtonClicked(
											!editButtonClicked
										);
										updateMeeting();
									}}
									className="edit_button"
								>
									Save
									<EditIcon />
								</button>
								<Button
									className="edit_button"
									onClick={() => {
										deleteMeeting(meeting);
										navigate("/profile");
									}}
								>
									DELETE MEETING
								</Button>
							</>
						)}
						<ToastContainer />
					</div>
				</>
			)}
		</div>
	);
};
export default MeetingItem;
