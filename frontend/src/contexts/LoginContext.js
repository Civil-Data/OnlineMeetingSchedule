import React, { useContext, useState } from "react";
import axios from "axios";
import serverUrl from "../utils/config";

const userContext = React.createContext();
const updateUserContext = React.createContext();

export function useUpdateUserContext() {
    return useContext(updateUserContext);
}

export function useUserContext() {
    return useContext(userContext);
}

export const LoginProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        age: "",
        telephone: "",
        gender: "",
        description: "",
    });
    const [loginStatus, setLoginStatus] = useState(false);

    function updateUserContext(email) {
        setUserEmail(email);
    }

    function updateLoginStatus(status) {
        setLoginStatus(status);
        // if (status === true) {
        //     getUser();
        // }
    }

    async function getUser() {
        try {
            const { name, email, age, telephone, gender, description } =
                await axios.get(
                    serverUrl + "/user",
                    {
                        userEmail,
                    },
                    { withCredentials: true }
                );
            if (userEmail === email) {
                setUser({
                    name: name,
                    email: email,
                    age: age,
                    telephone: telephone,
                    gender: gender,
                    description: description,
                });
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <userContext.Provider value={(user, loginStatus)}>
            <updateUserContext.Provider
                value={(updateUserContext, updateLoginStatus)}
            >
                {children}
            </updateUserContext.Provider>
        </userContext.Provider>
    );
};
