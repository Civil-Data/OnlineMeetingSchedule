import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Register from "./views/Register";
import NavigationBar from "./Components/NavigationBar";
import { ProfileProvider } from "./contexts/ProfileContext";
import Login from "./views/Login";
import { BookingProvider } from "./contexts/BookingContext";
import Pages from "./Components/Pages";
// import "./css/App.css";
// import "./css/Toast.css";

function App() {
    return (
        <>
            <NavigationBar />
            <Pages>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/booking" element={<BookingProvider />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<ProfileProvider />} />
                </Routes>
            </Pages>
        </>
    );
}

export default App;
