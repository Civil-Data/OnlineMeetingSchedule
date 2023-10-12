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
	const [isLoading, setIsLoading] = useState(true);
	const [cookies, removeCookie] = useCookies([]);
	const [justRegistered, setJustRegistered] = useState(false);
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
			try {
				if (
					cookies.token &&
					!logoutPressed &&
					window.location.pathname !== "/" &&
					window.location.pathname !== "/login" &&
					window.location.pathname !== "/register"
				) {
					updateLoginStatus(true);
					updateLogoutPressed(false);
				} else {
					removeCookie("token");
					updateLoginStatus(false);
				}
				const { data } = await axios.post(serverUrl + "/", {}, { withCredentials: true });
				// const { user } = data;
				// saveUser(user);
				const { status, user } = data;
				status ? saveUser(user) : removeCookie("token");
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};
		verifyCookie();
	}, [cookies.token, logoutPressed, removeCookie, navigate]);

	return (
		<userContext.Provider value={{ user, loginStatus, logoutPressed, justRegistered }}>
			<updateUserContext.Provider
				value={{
					saveUser,
					updateLoginStatus,
					updateLogoutPressed,
					setJustRegistered,
				}}
			>
				{isLoading ? <></> : children}
			</updateUserContext.Provider>
		</userContext.Provider>
	);
};
