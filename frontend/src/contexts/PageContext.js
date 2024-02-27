import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavigationBar from "../Components/NavigationBar";

const ToastContext = React.createContext();

export function useToastUpdate() {
	return useContext(ToastContext);
}

// Context provider component for managing application
// messages displayed in a toast container
export const PageProvider = ({ children }) => {
	function sendToastSuccess(message) {
		toast.success(message, {
			position: "bottom-right",
		});
	}

	function sendToastInfo(message) {
		toast.info(message, {
			position: "bottom-right",
		});
	}

	function sendToastError(error) {
		toast.error(error, {
			position: "bottom-left",
		});
	}

	return (
		<ToastContext.Provider value={{ sendToastError, sendToastSuccess, sendToastInfo }}>
			{window.location.pathname === "/" && <NavigationBar />}
			{window.location.pathname === "/login" && <NavigationBar />}
			{window.location.pathname === "/signup" && <NavigationBar />}
			{window.location.pathname === "/meeting" && <NavigationBar />}
			{window.location.pathname === "/profile" && <NavigationBar />}
			<div className="page">
				{children}
				<ToastContainer />
			</div>
		</ToastContext.Provider>
	);
};
