import React, { useEffect, useState } from "react";
import MeetingItem from "./MeetingItem";
import { v4 as uuidv4 } from "uuid";

import { useUserContext } from "../../contexts/LoginContext";
// import { SERVER_URL } from "../../config";
// import { useUpdateUserContext } from "../../contexts/LoginContext";
import APIHandler from "../../utils/api-methods";

const api = new APIHandler();

const GetMeetings = async user => {
	try {
		const { data } = await api.GetData(`/meeting/my-meetings/${user._id}`);
		console.log(data);

		return data;
	} catch (error) {
		console.error(error);
	}
	//if participant in meeting then show
};

//Component for Meeting overview
const ProfileMeetings = () => {
	// const { api } = useUpdateUserContext();
	const { user } = useUserContext();
	const [meetings, setMeetings] = useState([{}]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchMeetings = async () => {
			try {
				const meeting = await GetMeetings(user);
				setMeetings(meeting);
			} catch (error) {
				console.error("Error fetching meetings", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchMeetings();
	}, [user]);

	return (
		<>
			<div className="profile_container">
				{/* <div className="top_section"> */}
				{!isLoading ? (
					meetings.map(meeting => {
						return <MeetingItem key={uuidv4()} meeting={meeting} />;
					})
				) : (
					<></>
				)}
			</div>
			{/* </div> */}
		</>
	);
};

export default ProfileMeetings;
