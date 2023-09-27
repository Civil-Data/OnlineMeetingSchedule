const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// Create a new user
router.post("/users", async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Retrieve all users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a user by ID
router.put("/users/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a user by ID
router.delete("/users/:id", async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
