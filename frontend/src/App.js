import React from "react";
import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import Home from "./views/Home";
import Register from "./views/Register";
import Booking from "./views/Booking";
import NavigationBar from "./Components/NavigationBar";
import { ProfileProvider } from "./contexts/ProfileContext";
import Login from "./views/Login";

function App() {
    return (
        <>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<ProfileProvider />} />
            </Routes>
        </>
    );
}

export default App;
