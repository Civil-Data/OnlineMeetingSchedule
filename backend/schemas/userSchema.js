const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: String,
    dateOfBirth: Date,
    // Additional fields as needed
});

module.exports = mongoose.model("User", userSchema);
