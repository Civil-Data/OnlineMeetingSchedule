import React, { useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer } from "react-toastify";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect } from "react";
import axios from "axios";
import serverUrl from "../../utils/config";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/LoginContext";

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

const handleSuccess = msg =>
	toast.success(msg, {
		position: "bottom-right",
	});

const deleteMeeting = async meeting => {
	try {
		const { data } = await axios.delete(serverUrl + `/meeting/delete?meetingID=${meeting._id}`);
		handleSuccess(data.message);
	} catch (error) {
		console.log("Error Deleting Meeting");
	}
};
//Component for meeting
const MeetingItem = ({ meeting }) => {
	const { user } = useUserContext();
	const navigate = useNavigate();
	const [detailViewState, setDetailViewState] = useState(false);

	const [isLoading, setIsLoading] = useState(true);

	const [users, setUsers] = useState([{}]); // Array with users

	const [meetingDetails, setMeetingDetails] = useState(meeting);
	const [editButtonClicked, setEditButtonClicked] = useState(false);
	const [participants, setParticipants] = useState([]); // Array with participant names that the users has added.

	const muiInputStyle = {
		margin: "6px 0",
		border: "1px solid white",
		color: "white",
	};
	const muiInputStyleDescription = {
		width: "100%",
	};

	const seperateLeft = {
		marginLeft: "12px",
	};

	const editIcon = {
		marginLeft: "8px",
	};

	const updateMeeting = async () => {
		try {
			const participantList = [];
			participants.forEach(participant => {
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
			console.error(error);
		}
	};

	useEffect(() => {
		const getUsers = async () => {
			try {
				const users = await fetchUsers();
				setUsers(users);
			} catch (error) {
				console.error("Error fetching meetings", error);
			} finally {
				setIsLoading(false);
			}
		};
		getUsers();
	}, []);

	return (
		<div className="meeting_item">
			{!isLoading && (
				<>
					<div className="meeting_top">
						<span>
							<label htmlFor="meeting_title">
								<b>Meeting Title: </b>
							</label>
							<div>{meetingDetails.title}</div>
						</span>

						<span>
							<label htmlFor="location">
								<b>Location:</b>
							</label>
							<div>{meetingDetails.location}</div>
						</span>
						<span>
							<label htmlFor="time_details">
								<b>Date:</b>
							</label>
							<div id="time_details">
								{meetingDetails.startDate} {" to "}
								{meetingDetails.endDate}
							</div>
						</span>

						<span>
							<label htmlFor="time_details">
								<b>From - To:</b>
							</label>
							<div id="time_details">
								{meetingDetails.startTime} - {meetingDetails.endTime}
							</div>
						</span>

						<span>
							<b>Participants:</b> {meetingDetails.participants.length}
						</span>

						<div style={{ display: "inherit" }}>
							{meetingDetails.organizer === user._id && (
								<button
									style={editButtonClicked ? { backgroundColor: "black" } : {}}
									onClick={() => {
										setEditButtonClicked(!editButtonClicked);
										// setDetailViewState(true);
									}}
									className="edit_button"
								>
									EDIT
									<EditIcon sx={editIcon} />
								</button>
							)}
							<div
								className="details"
								onClick={() => setDetailViewState(!detailViewState)}
							>
								<ArrowRightIcon
									sx={detailViewState ? { transform: "rotate(90deg)" } : {}}
								/>
								Details
							</div>
						</div>
					</div>

					{(detailViewState || editButtonClicked) && (
						<>
							<div className="meeting_details">
								{!editButtonClicked ? (
									<>
										<br />
										<h4>Organizer:</h4>
										<div>
											{users
												.map(user => {
													if (user._id === meetingDetails.organizer)
														return `${user.firstName} ${user.lastName} <${user.email}>`;
													else return "";
												})
												.filter(Boolean)
												.join(", ")}
										</div>
										{/* <br /> */}
										<div>
											<br></br>
											<h4>Participants:</h4>
											<div>
												{meetingDetails.participants
													.map(participant => {
														const user = users.find(
															user => user._id === participant
														);

														return user
															? `${user.firstName} ${user.lastName} <${user.email}>`
															: "";
													})
													.filter(Boolean)
													.join(", ")}
											</div>
										</div>
										<br />
										<h4>Description: </h4>
										<div>{meetingDetails.description}</div>
										<br />
									</>
								) : (
									<>
										<div className="edit_meeting_fields">
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
												sx={{
													...muiInputStyle,
													...seperateLeft,
												}}
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
												sx={{
													...muiInputStyle,
													...seperateLeft,
												}}
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
												getOptionLabel={option =>
													`${option.firstName} ${option.lastName} <${option.email}>`
												}
												value={meetingDetails.participant}
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
												sx={{
													...muiInputStyle,
													...muiInputStyleDescription,
												}}
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
												sx={{
													...muiInputStyle,
													...seperateLeft,
												}}
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
										<div className="meeting_btn_area">
											<button
												type="submit"
												onClick={() => {
													setEditButtonClicked(!editButtonClicked);
													setDetailViewState(true);
													updateMeeting();
												}}
												className="edit_button"
											>
												SAVE
												<EditIcon sx={editIcon} />
											</button>
											<Button
												style={muiInputStyle}
												className="delete_button"
												onClick={() => {
													deleteMeeting(meeting);
													navigate("/profile");
												}}
											>
												DELETE MEETING
											</Button>
										</div>
									</>
								)}
								<ToastContainer />
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
};
export default MeetingItem;
