import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";

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

	function sendToastError(error) {
		toast.error(error, {
			position: "bottom-left",
		});
	}

	return (
		<ToastContext.Provider value={{ sendToastError, sendToastSuccess }}>
			<div className="page">
				{children}
				<ToastContainer />
			</div>
		</ToastContext.Provider>
	);
};
