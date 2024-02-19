import React, { useContext, useState, useEffect } from "react";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import serverUrl from "../utils/config";
// import { useNavigate } from "react-router-dom";
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
	// const [cookies, removeCookie] = useCookies([]);
	const [justRegistered, setJustRegistered] = useState(false);
	// const navigate = useNavigate();

	function updateLoginStatus(status) {
		setLoginStatus(status);
	}

	function saveUser(user) {
		console.log("User saved: ", user);
		setUser(user);
	}

	function updateLogoutPressed(logout) {
		setLogoutPressed(logout);
	}

	function setHeader() {
		const token = localStorage.getItem("token");
		if (token) {
			api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			console.log("Token set to: " + token);
		}
		return token;
	}

	useEffect(() => {
		const verifyCookie = async () => {
			try {
				setHeader();
				if (
					// cookies.token &&
					!logoutPressed &&
					window.location.pathname !== "/" &&
					window.location.pathname !== "/login" &&
					window.location.pathname !== "/register"
				) {
					updateLoginStatus(true);
					updateLogoutPressed(false);
				} else {
					// removeCookie("token");
					updateLoginStatus(false);
				}
				// const { data } = await axios.get(
				// 	serverUrl + "/user/user",
				// 	{},
				// 	{ withCredentials: true }
				// );
				// const { user } = data;
				// const token = localStorage.getItem("token");
				// if (token) saveUser(user);
				// status ? saveUser(user) : removeCookie("token");
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
