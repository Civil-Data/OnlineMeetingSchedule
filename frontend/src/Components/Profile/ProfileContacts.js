import React, { useEffect, useState } from "react";
import axios from "axios";
import serverUrl from "../../utils/config";

const ProfileContacts = () => {
	const [users, setUsers] = useState([]);

	const contacts = async () => {
		try {
			const user = await axios.get(serverUrl + "/users");
			setUsers(user.data);
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	};
	useEffect(() => {
		contacts();
	}, []);

	return (
		<div className="contacts">
			{/* <h2>User List</h2> */}
			<ul>
				{users.map((user) => (
					<li key={user._id}>
						{user.name}
						{/* Add other user properties as needed */}
					</li>
				))}
			</ul>
		</div>
	);
};

export default ProfileContacts;
