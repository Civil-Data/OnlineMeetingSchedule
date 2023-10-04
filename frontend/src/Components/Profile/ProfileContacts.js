import React, { useEffect, useState } from "react";
import axios from "axios"; // You may need to install axios if you haven't already
import serverUrl from "../../utils/config";

const ProfileContacts = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(serverUrl + "/users");
				setUsers(res.data);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchData();
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
