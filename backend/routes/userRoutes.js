const express = require("express");
const router = express.Router();
const User = require("../schemas/userSchema");
const bcrypt = require("bcrypt");

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

router.get("/users", async (req, res) => {
    // console.log(req);
    // console.log(res);
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Retrieve one user matching email
router.get("/users/:email", async (req, res) => {
    try {
        console.log(req);
        console.log(res);
        //     const { email } = req.body;

        //     // Check if the username or email is already in use
        //     const existingUser = await User.findOne({
        //         email: email,
        //     });
        //     if (existingUser) {
        //         return res.status(400).json({ message: "Email is already in use" });
        //     }
        // } catch (error) {
        //     console.error("Registration error:", error);
        //     res.status(500).json({
        //         message: "Registration failed YOU DUMB ASS!!!!",
        //     });
    } catch {}
});

// Insert one user in DB
router.post("/users", async (req, res) => {
    try {
        console.log(req.body);
        console.log(res);
        // const { email } = req.body;

        //     // Check if the username or email is already in use
        //     const existingUser = await User.findOne({
        //         email: email,
        //     });
        //     if (existingUser) {
        //         return res.status(400).json({ message: "Email is already in use" });
        //     }
        // } catch (error) {
        //     console.error("Registration error:", error);
        //     res.status(500).json({
        //         message: "Registration failed YOU DUMB ASS!!!!",
        //     });

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            message: "Registration failed YOU DUMB ASS!!!!",
        });
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
