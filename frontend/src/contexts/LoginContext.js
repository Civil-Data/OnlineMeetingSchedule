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
<<<<<<< HEAD
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
=======
	// Initialize user state with default values
	const [user, setUser] = useState({
		name: "",
		email: "",
		age: "",
		telephone: "",
		gender: "",
		description: "",
		password: "",
	});
	const [loginStatus, setLoginStatus] = useState(false);
>>>>>>> 119eafefc0218da2b45bdfaf861ba382f03b109d

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
