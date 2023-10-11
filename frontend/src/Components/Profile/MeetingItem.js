import React, { useContext, useEffect, useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Button } from "@mui/material";
import serverUrl from "../../utils/config";

import axios from "axios";
import { useUserContext } from "../../contexts/LoginContext";

//Component for meeting
const deleteMeeting = async (meeting) => {
	try {
		const response = await axios.delete(serverUrl + "/meeting/delete", {
			meetingID: meeting._id, // meetingID
		});
	} catch (error) {
		console.log("Error Deleting Meeting");
	}
};

const getUser = async () => {
	try {
		const user = await axios.get(serverUrl + "/users");
	} catch (error) {
		console.log("Error getting user");
	}
};
const MeetingItem = ({ meetingObj }) => {
	const { user } = useUserContext();
	const isButtonDisabled = meetingObj.organizer === user._id; //is participants or organizer
	const [meeting, setMeeting] = useState(meetingObj);
	const [detailIcon, setdetailIcon] = useState(false);
	const toggleState = () => {
		setdetailIcon(!detailIcon);
	};
	useEffect(() => {
		getUser(); // Call the getUser function to fetch user data
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
						<div>Participants:</div>
						<br></br>
						<div>Information: </div>
						<Button
							className="Button"
							style={isButtonDisabled ? { display: "none" } : {}}
							onClick={async () => await deleteMeeting(meeting)}
						>
							Delete Meeting
						</Button>
					</div>
				</>
			)}
		</div>
	);
};
export default MeetingItem;
