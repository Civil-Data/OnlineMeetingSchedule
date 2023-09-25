import React from "react";
import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import Home from "./views/Home";
import Register from "./views/Register";
// import Booking from "./views/Booking";
import NavigationBar from "./Components/NavigationBar";
import { ProfileProvider } from "./contexts/ProfileContext";
import Login from "./views/Login";
import { BookingProvider } from "./contexts/BookingContext";
import Pages from "./Components/Pages";

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
