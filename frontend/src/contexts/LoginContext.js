import React, { useContext, useState, useEffect } from "react";
import api from "axios";

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
	const [logoutPressed, setLogoutPressed] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [justRegistered, setJustRegistered] = useState(false);

	function updateLoginStatus(status) {
		setLoginStatus(status);
	}

	function saveUser(user) {
		setUser(user);
	}

	function updateLogoutPressed(logout) {
		setLogoutPressed(logout);
	}

	function setHeader() {
		const token = localStorage.getItem("token");
		if (token) {
			api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		}
	}

	useEffect(() => {
		const verifyCookie = async () => {
			try {
				setHeader();
				if (
					!logoutPressed &&
					window.location.pathname !== "/" &&
					window.location.pathname !== "/login" &&
					window.location.pathname !== "/register"
				) {
					updateLoginStatus(true);
					updateLogoutPressed(false);
				} else {
					updateLoginStatus(false);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};
		verifyCookie();
	}, [logoutPressed]);

	return (
		<userContext.Provider
			value={{ user, loginStatus, logoutPressed, justRegistered }}
		>
			<updateUserContext.Provider
				value={{
					saveUser,
					updateLoginStatus,
					updateLogoutPressed,
					setJustRegistered,
					setHeader,
				}}
			>
				{isLoading ? <></> : children}
			</updateUserContext.Provider>
		</userContext.Provider>
	);
};
