import React, { useContext, useState } from "react";
import Login from "../views/Login";

const LoginStatusContext = React.createContext();
const UpdateLoginStatusContext = React.createContext();

export function useLoginStatusContext() {
    return useContext(LoginStatusContext);
}
export function useUpdateLoginStatus() {
    return useContext(UpdateLoginStatusContext);
}

export const LoginProvider = ({ children }) => {
    const [loginStatus, setLoginStatus] = useState("martin@ju.se");

    function updateLoginContext(status) {
        setLoginStatus(status);
    }

    return (
        <LoginStatusContext.Provider value={loginStatus}>
            <UpdateLoginStatusContext.Provider value={updateLoginContext}>
                {children}
                <Login />
            </UpdateLoginStatusContext.Provider>
        </LoginStatusContext.Provider>
    );
};
