import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import serverUrl from "../utils/config";
import { useNavigate } from "react-router-dom";

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
	const [cookies, removeCookie] = useCookies([]);
	const navigate = useNavigate();

	function updateLoginStatus(status) {
		setLoginStatus(status);
	}

	function saveUser(user) {
		setUser(user);
	}

	function updateLogoutPressed(logout) {
		setLogoutPressed(logout);
	}

	useEffect(() => {
		const verifyCookie = async () => {
			if (
				cookies.token &&
				!logoutPressed &&
				window.location.pathname !== "/" &&
				window.location.pathname !== "/login" &&
				window.location.pathname !== "/register"
			) {
				updateLoginStatus(true);
			} else {
				removeCookie("token");
				updateLoginStatus(false);
			}
			const { data } = await axios.post(
				serverUrl + "/",
				{},
				{ withCredentials: true }
			);
			const { status, user } = data;
			return status ? saveUser(user) : removeCookie("token");
		};
		verifyCookie();
	}, [cookies.token, logoutPressed, removeCookie, navigate]);

	return (
		<userContext.Provider value={{ user, loginStatus, logoutPressed }}>
			<updateUserContext.Provider
				value={{ saveUser, updateLoginStatus, updateLogoutPressed }}
			>
				{children}
			</updateUserContext.Provider>
		</userContext.Provider>
	);
};
