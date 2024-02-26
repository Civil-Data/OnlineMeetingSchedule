import React, { useEffect, useState } from "react";
import APIHandler from "../../../utils/api-methods";

//Component for Profile contacts
const ProfileContacts = () => {
	const [users, setUsers] = useState([]);

	const contacts = async () => {
		try {
			// Send a GET request to get all users
			const api = new APIHandler();
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
