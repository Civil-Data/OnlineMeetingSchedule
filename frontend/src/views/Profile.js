import React from "react";
import ProfileContacts from "../Components/Profile/Contacts";
import ProfileInformation from "../Components/Profile/Information";
import ProfileTab from "../Components/Profile/ProfileTab";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddSharpIcon from "@mui/icons-material/PersonAddSharp";
import { useProfileUpdate, useTabContext } from "../contexts/ProfileContext";
import { useUserContext } from "../contexts/LoginContext";
import ProfileMeetings from "../Components/Profile/Meetings";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";

const Profile = () => {
	const { user, loginStatus } = useUserContext();
	const tabContext = useTabContext();
	const { showUpdateView, isUpdateView } = useProfileUpdate();

	return (
		<>
			<div className="profile_container">
				<div className="top_section">
					{loginStatus && <span>{user.firstName + " " + user.lastName}</span>}
					{tabContext === "info" && (
						<>
							{isUpdateView ? (
								<div style={{ display: "flex" }}>
									<div
										onClick={() => {
											showUpdateView(false);
										}}
										className="icon"
									>
										<ClearIcon titleAccess="Exit" />
									</div>
								</div>
							) : (
								<div
									onClick={() => {
										showUpdateView(true);
									}}
									className="icon"
								>
									<EditIcon titleAccess="Edit" />
								</div>
							)}
						</>
					)}
					{tabContext === "contacts" && (
						<div className="icon">
							<PersonAddSharpIcon />
						</div>
					)}
					{tabContext === "my_meetings" && (
						<div className="icon">
							<Link to="/meeting" type="button">
								<AddIcon titleAccess="Add Meeting" />
							</Link>
						</div>
					)}
				</div>
				<div className="tab_area">
					<ProfileTab
						tab_text="My Meetings"
						is_active={tabContext === "my_meetings"}
						tab_name="my_meetings"
					/>
					<ProfileTab
						tab_text="Profile information"
						is_active={tabContext === "info"}
						tab_name="info"
					/>
					<ProfileTab
						tab_text="Contacts"
						is_active={tabContext === "contacts"}
						tab_name="contacts"
					/>
				</div>
				{tabContext === "info" && <ProfileInformation />}
				{tabContext === "contacts" && <ProfileContacts />}
				{tabContext === "my_meetings" && <ProfileMeetings />}
			</div>
		</>
	);
};
export default Profile;
