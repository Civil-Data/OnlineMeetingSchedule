import React, { useEffect, useState } from "react";
// import { SERVER_URL } from "../../config";
import APIHandler from "../../utils/api-methods";

const api = new APIHandler();
// import { useUpdateUserContext } from "../../contexts/LoginContext";

//Component for Profile contacts
const ProfileContacts = () => {
	const [users, setUsers] = useState([]);
	// const { api } = useUpdateUserContext();

	const contacts = async () => {
		try {
			// Send a GET request to get all users
			const existingUser = await api.GetData("/user/users");
			setUsers(existingUser.data);
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	};
	useEffect(() => {
		contacts();
	}, []);

	return (
		//Return the contacts in a list
		<div className="contacts">
			<ul>
				{users.map(user => (
					<li key={user._id}>{user.firstName + " " + user.lastName}</li>
				))}
			</ul>
		</div>
	);
};

export default ProfileContacts;
