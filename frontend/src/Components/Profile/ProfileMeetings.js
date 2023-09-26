import React from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useTabContext, useProfileUpdate } from "../../contexts/ProfileContext";

// import PopUp from "../PopUp";

const ProfileMeetings = () => {
	const tabContext = useTabContext();
	const { updateMyMeetings, details } = useProfileUpdate();

	return (
		<>
			<div className="profile_container">
				<div className="top_section">
					{/* {tabContext === "myMeetings" && ( */}
					<>
						{details ? (
							<div className="meeting_list">
								<div className="meeting_list_item  ">
									<div className="meeting_list_sub_item">
										Event name
									</div>
									<div className="meeting_list_sub_item">
										When?
									</div>
									<div className="meeting_list_sub_item">
										Where?
									</div>
								</div>
								<div
									className="details"
									style={{ cursor: "pointer" }}
									onClick={() => {
										updateMyMeetings(false);
									}}
								>
									<ArrowRightIcon />
									Details
								</div>
								<div className="participants">
									Participants: Martin, Joel, Felix, Matilda
								</div>
							</div>
						) : (
							<div className="meeting_list">
								<div className="meeting_list_item  ">
									<div className="meeting_list_sub_item">
										Event name
									</div>
									<div className="meeting_list_sub_item">
										When?
									</div>
									<div className="meeting_list_sub_item">
										Where?
									</div>
								</div>
								<div
									className="details"
									style={{ cursor: "pointer" }}
									onClick={() => {
										updateMyMeetings(true);
									}}
								>
									<ArrowRightIcon />
									Details
								</div>
							</div>
						)}
					</>
					{/* )} */}
				</div>
			</div>
		</>
	);
};

export default ProfileMeetings;
