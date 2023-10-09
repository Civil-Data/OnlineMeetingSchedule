// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useUserContext } from "../contexts/LoginContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { loginStatus } = useUserContext();

	return (
		<Route
			{...rest}
			render={(props) => {
				return loginStatus ? (
					<Component {...props} />
				) : (
					<Navigate to="/login" />
				);
			}}
		/>
	);
};

export default PrivateRoute;
