const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { createSecretToken } = require("../utils/SecretToken");

// Insert one user in DB
module.exports.GetUsers = async (req, res) => {
    try {
        console.log(req.body);
        console.log(res);
        // const { email } = req.body;

        // Check if the username or email is already in use
        const users = await User.find();
        if (!users) {
            return res.status(400).json({ message: "Email is already in use" });
        }
        res.json(users);
    } catch (error) {
        console.error("Could not find any users", error);
        res.status(400);
    }
};

// Insert one user in DB
module.exports.InsertOneUser = async (req, res) => {
    try {
        console.log(req.body);
        console.log(res);
        const { email } = req.body;

        // Check if the username or email is already in use
        const existingUser = await User.findOne({
            email: email,
        });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" });
        }
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            message: "Registration failed YOU DUMB ASS!!!!",
        });

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
    }
};

module.exports.UpdateUser = async (req, res, next) => {
    console.log(req.body);
    try {
        const {
            newName,
            newGender,
            newEmail,
            newTelephone,
            newAge,
            newDescription,
            newPassword,
            emailChanged,
        } = req.body;

        const existingUser = await User.findOne({ email: newEmail });
        console.log(existingUser);
        if (existingUser && emailChanged) {
            return res.json({ message: "User already exists" });
        }

        if (!newName || !newEmail || !newPassword) {
            return res.json({ message: "All fields are required" });
        }

        if (newPassword.length < 8) {
            return res.json({
                message: "Password should be at least 8 characters",
            });
        }

        if (!newEmail.includes("@")) {
            return res.json({ message: "Email is not valid" });
        }

        const apa = await User.updateOne(
            { email: newEmail },
            {
                name: newName,
                gender: newGender,
                email: newEmail,
                telephone: newTelephone,
                age: newAge,
                description: newDescription,
                password: newPassword,
            }
        );
        console.log(apa);
        const user = await User.findOne({ email: newEmail });
        console.log(user);

        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });

        res.status(201).json({
            message: "User updated successfully",
            success: true,
            user,
        });
        next();
    } catch (error) {
        console.error(error);
    }
};
