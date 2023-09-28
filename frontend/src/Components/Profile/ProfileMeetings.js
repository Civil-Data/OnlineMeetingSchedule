import React from "react";
// import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useProfileUpdate } from "../../contexts/ProfileContext";
import ProfileTab from "./ProfileTab";
import MeetingItem from "./MeetingItem";

const ProfileMeetings = () => {
	const { details, updateSubTabContext } = useProfileUpdate();

	return (
		<>
			<div className="tab_area">
				<ProfileTab
					tab_text="Upcoming"
					is_active={details === "upcoming"}
					tab_name="upcoming"
					toggleFunc={updateSubTabContext}
				/>
				<ProfileTab
					tab_text="Pending"
					is_active={details === "pending"}
					tab_name="pending"
					toggleFunc={updateSubTabContext}
				/>
			</div>
			<div className="profile_container">
				<div className="top_section">
					{details === "upcoming" ? <MeetingItem /> : null}

					{details === "pending" ? <MeetingItem /> : null}
				</div>
			</div>
		</>
	);
};

export default ProfileMeetings;
