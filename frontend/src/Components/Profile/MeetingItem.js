import React, { useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
// import { useMeetingUpdate } from "../../contexts/MeetingContext";
import EditIcon from "@mui/icons-material/Edit";
// import ClearIcon from "@mui/icons-material/Clear";
import { ToastContainer } from "react-toastify";

//Component for meeting
const MeetingItem = ({ showVoteButton, meeting }) => {
	const [detailIcon, setDetailIcon] = useState(false);
	// const [editIcon, setEditIcon] = useState(false);
	const toggleState = () => {
		setDetailIcon(!detailIcon);
	};
	const [editButtonClicked, setEditButtonClicked] = useState(false);
	// const toggleState1 = () => {
	// 	setEditIcon(!editIcon);
	// };

	// const { clickedIcon, updateClickedIcon } = useMeetingUpdate();

	return (
		<div className="meeting_item">
			<div className="meeting_item_header">
				<div className="meeting_header_titles">Meeting title</div>
				<div className="meeting_header_titles">When?</div>
				<div className="meeting_header_titles">Where?</div>
			</div>
			<div className="meeting_list_sub_item_description">
				<div>{meeting.title}</div>
				<div>{meeting.startDate}</div>
				<div>{meeting.startTime}</div>
				<div>{meeting.location}</div>
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
								<form action="">
									<div className="profile_info">
										<label htmlFor="organizer">
											Organizer:
										</label>
										<input
											type="text"
											name="organizer"
											id="organizer"
										/>
										<label htmlFor="participants">
											Participants:
										</label>
										<input
											type="text"
											name="participants"
											id="participants"
										/>
										<label htmlFor="information">
											Information:
										</label>
										<input
											type="text"
											name="information"
											id="information"
										/>
										<button
											onClick={() => {
												setEditButtonClicked(
													!editButtonClicked
												);
											}}
											className="edit_button"
										>
											Save
											<EditIcon />
										</button>
									</div>
								</form>
								<ToastContainer />
							</>
						)}
					</div>
				</>
			)}
		</div>
	);
};
export default MeetingItem;
