import React, { useEffect, useState } from "react";
import axios from "axios"; // You may need to install axios if you haven't already
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
		<div>
			{/* <h1>Contact List</h1> */}
			<ul className="contact_list">
				{users.map((user, index) => (
					<li className="list_item" key={index}>
						<span>{user.name}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ProfileContacts;
