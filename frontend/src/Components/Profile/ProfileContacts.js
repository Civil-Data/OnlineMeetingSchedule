import React, { useEffect, useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import { SERVER_URL } from "../../config";
=======
import serverUrl from "../../utils/config";
import { useUpdateUserContext } from "../../contexts/LoginContext";
>>>>>>> fix/sessionValidation

//Component for Profile contacts
const ProfileContacts = () => {
	const [users, setUsers] = useState([]);
	const { setHeader } = useUpdateUserContext();

	const contacts = async () => {
		try {
			setHeader();
			// Send a GET request to get all users
<<<<<<< HEAD
			const user = await axios.get(SERVER_URL + "/user/users");
			setUsers(user.data);
=======
			const user = await axios.get(serverUrl + "/user/users");
			setUsers(user.data.data);
>>>>>>> fix/sessionValidation
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	};
	useEffect(() => {
		contacts();
	}, [setHeader]);

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
