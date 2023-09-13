import React from "react";
import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";
import Booking from "./views/Booking";
// import Confirmation from "./views/Confirmation";
import Profile from "./views/Profile";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                {/* <Route path="/confirmation" element={<Confirmation />} /> */}
            </Routes>
        </>
    );
}

export default App;
