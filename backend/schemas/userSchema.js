const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    // userId: new mongoose.Types.ObjectId(),
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: String,
    dateOfBirth: Date,
    contact: { type: String, required: true },
    meetings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meeting" }],
    role: { type: String, required: true },
    // Additional fields as needed
});

module.exports = mongoose.model("User", userSchema);
