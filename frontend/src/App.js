import React from "react";
import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import Home from "./views/Home";
import Login from "./views/Login";
import Booking from "./views/Booking";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/booking" element={<Booking />} />
            </Routes>
        </>
    );
}

export default App;
