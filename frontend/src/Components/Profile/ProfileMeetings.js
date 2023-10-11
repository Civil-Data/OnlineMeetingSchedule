import React, { useEffect, useState } from "react";
import MeetingItem from "./MeetingItem";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// import { LoginProvider, useUserContext } from "../../contexts/LoginContext";
// import { useMeetingUpdate } from "../../contexts/MeetingContext";
import { useUserContext } from "../../contexts/LoginContext";
import serverUrl from "../../utils/config";

const GetMeetings = async (user) => {
	// console.log(user);
	try {
		// const meetings = await axios.get(serverUrl + `/meeting/${user._id}`);
		const { data } = await axios.get(
			serverUrl + `/meeting/users?paramName=${user._id}`
		);

		// const meetings = await axios.get(serverUrl + "/meeting/users", {
		// 	params: user._id,
		// });
		return data;
	} catch (error) {
		console.error(error);
	}
	//if participant in meeting then show
};

//Component for Meeting overview
const ProfileMeetings = () => {
	// const { user } = useUserContext();
	const { user } = useUserContext();
	const [meetings, setMeetings] = useState([{}]);
	// const meetings = useMeetingUpdate();

	useEffect(() => {
		GetMeetings(user).then((meeting) => {
			setMeetings(meeting);
		});
	}, [user]);

	return (
		<>
			<div className="profile_container">
				<div className="top_section">
					{meetings.map((meeting) => {
						return <MeetingItem key={uuidv4()} meeting={meeting} />;
					})}
				</div>
			</div>
		</>
	);
};

export default ProfileMeetings;
