import React, { useContext, useEffect, useState } from "react";
import APIHandler from "../utils/api-methods";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { SERVER_URL } from "../config";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import APIHandler from "../utils/api-methods";

const userContext = React.createContext();
const updateUserContext = React.createContext();

export function useUpdateUserContext() {
	return useContext(updateUserContext);
}

export function useUserContext() {
	return useContext(userContext);
}

const validateUserSession = async () => {
	try {
		// const token = localStorage.getItem("token");
		const user = JSON.parse(localStorage.getItem("user"));
		// console.log(token);
		// console.log(user);
		// saveUser(user);

		// Verify jwt token
		// if (token) {
		const api = new APIHandler();
		const res = await api.PostData("/user/", { user: user ? user.firstName : "User" });
		console.log(res);
		// }
		// if (user) return user;
		// else return null;
		return true;
	} catch (error) {
		localStorage.setItem("token", "");
		console.log(error);
		console.log("No user session currently active");
		// navigate("/");
	}
};

export const LoginProvider = ({ children }) => {
	// const navigate = useNavigate();
	const [user, setUser] = useState(() => {
		const storedUser = localStorage.getItem("user");
		// console.log(storedUser);
		return storedUser && storedUser !== undefined
			? JSON.parse(storedUser)
			: {
					firstName: "",
					lastName: "",
					email: "",
					age: "",
					telephone: "",
					gender: "",
					description: "",
					password: "",
			  };
	});

	// const [user, setUser] = useState({
	// 	firstName: "",
	// 	lastName: "",
	// 	email: "",
	// 	age: "",
	// 	telephone: "",
	// 	gender: "",
	// 	description: "",
	// 	password: "",
	// });

	const [loginStatus, setLoginStatus] = useState(false);
	const [logoutPressed, setLogoutPressed] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	// const [cookies, removeCookie] = useCookies([]);
	const [justSignedUp, setJustSignedUp] = useState(false);
	// const navigate = useNavigate();
	// const [api, setApi] = useState(axios.create({
	//     baseURL: SERVER_URL,
	//     timeout: 1000,
	//     headers:
	// }));

	function updateLoginStatus(status) {
		setLoginStatus(status);
		// Redirect to the "/profile" route after successful login
	}

	function saveUser(user) {
		console.log(user);
		setUser(user);
	}

	function updateLogoutPressed(logout) {
		setLogoutPressed(logout);
	}

	function setAuthToken(token) {
		if (token) {
			localStorage.setItem("token", `Bearer ${token}`);
			// api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			// console.log(api);
			// setApi(api);
		} else {
			localStorage.clear();
		}
	}

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(user));
		const verifyCookie = async () => {
			try {
				console.log("I run");
				const result = await validateUserSession();

				// if (result) {
				// const user = await getUser();
				// if (!user) setUser(user);
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
				// }
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
	}, [logoutPressed, user]);

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		navigate("/profile");
	// 	}, 2000);
	// }, [loginStatus, navigate]);

	return isLoading ? (
		<></>
	) : (
		<userContext.Provider value={{ user, loginStatus, logoutPressed, justSignedUp }}>
			<updateUserContext.Provider
				value={{
					saveUser,
					updateLoginStatus,
					updateLogoutPressed,
					setJustSignedUp,
					// setHeader,
					setAuthToken,
				}}
			>
				{children}
				{/* {isLoading ? <></> : children} */}
			</updateUserContext.Provider>
		</userContext.Provider>
	);
};
