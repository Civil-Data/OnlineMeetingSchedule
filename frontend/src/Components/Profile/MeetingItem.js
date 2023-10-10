import React, { useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

//Component for meeting
const MeetingItem = ({ showVoteButton }) => {
	const [detailIcon, setdetailIcon] = useState(false);
	const toggleState = () => {
		setdetailIcon(!detailIcon);
	};
	return (
		<div className="meeting_item">
			<div className="meeting_item_header">
				<div className="meeting_header_titles">Meeting title</div>
				<div className="meeting_header_titles">When?</div>
				<div className="meeting_header_titles">Where?</div>
			</div>

			<div className="details" style={{ cursor: "pointer" }} onClick={() => toggleState()}>
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
