import React, { useContext, useState } from "react";

const userContext = React.createContext();
const updateUserContext = React.createContext();

export function useUpdateUserContext() {
	return useContext(updateUserContext);
}

export function useUserContext() {
	return useContext(userContext);
}

export const LoginProvider = ({ children }) => {
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		age: "",
		telephone: "",
		gender: "",
		description: "",
		password: "",
	});
	const [loginStatus, setLoginStatus] = useState(false);

	function updateLoginStatus(status) {
		setLoginStatus(status);
	}

	function saveUser(user) {
		setUser(user);
	}

	return (
		<userContext.Provider value={{ user, loginStatus }}>
			<updateUserContext.Provider value={{ saveUser, updateLoginStatus }}>
				{children}
			</updateUserContext.Provider>
		</userContext.Provider>
	);
};
