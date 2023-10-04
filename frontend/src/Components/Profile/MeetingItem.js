import React, { useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
// import { useProfileUpdate } from "../../contexts/ProfileContext";

const MeetingItem = ({ showVoteButton }) => {
	// const { updateClickedIcon } = useProfileUpdate();
	const [detailIcon, setdetailIcon] = useState(false);
	const toggleState = () => {
		setdetailIcon(!detailIcon);
	};
	return (
		<div className="meeting_list">
			<div className="meeting_list_item">
				<div className="meeting_list_sub_item">Event name</div>
				<div className="meeting_list_sub_item">When?</div>
				<div className="meeting_list_sub_item">Where?</div>
			</div>
			{showVoteButton && (
				<div className="vote">
					<button>Vote!</button>
				</div>
			)}

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
					</div>
				</>
			)}
		</div>
	);
};
export default MeetingItem;
