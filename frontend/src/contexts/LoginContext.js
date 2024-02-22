import React, { useContext, useEffect, useState } from "react";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { SERVER_URL } from "../config";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

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
	const [justSignedUp, setJustSignedUp] = useState(false);
	// const navigate = useNavigate();
	const [api, setApi] = useState(axios);

	function updateLoginStatus(status) {
		setLoginStatus(status);
	}

	function saveUser(user) {
		setUser(user);
	}

	function updateLogoutPressed(logout) {
		setLogoutPressed(logout);
	}

	// function setHeader() {
	// 	const token = localStorage.getItem("token");
	// 	if (token) {
	// 		api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	// 		setApi(api);
	// 	}
	// }

	function setAuthToken(token) {
		if (token) {
			localStorage.setItem("token", token);
			api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			console.log(api);
			setApi(api);
		} else {
			localStorage.clear();
		}
	}

	useEffect(() => {
		const verifyCookie = async () => {
			try {
				// setHeader();
				if (
					!logoutPressed &&
					window.location.pathname !== "/" &&
					window.location.pathname !== "/login" &&
					window.location.pathname !== "/signup"
				) {
					updateLoginStatus(true);
					updateLogoutPressed(false);
				} else {
					updateLoginStatus(false);
				}
				// const { data } = await axios.post(SERVER_URL + "/", {}, { withCredentials: true });
				// const { status, user } = data;
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
			value={{ user, loginStatus, logoutPressed, justSignedUp }}
		>
			<updateUserContext.Provider
				value={{
					saveUser,
					updateLoginStatus,
					updateLogoutPressed,
					setJustSignedUp,
					// setHeader,
					setAuthToken,
					api,
				}}
			>
				{isLoading ? <></> : children}
			</updateUserContext.Provider>
		</userContext.Provider>
	);
};
