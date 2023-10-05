const mongoose = require("mongoose");
const User = require("../models/user.model");

const meetingSchema = new mongoose.Schema({
    // meetingId: new mongoose.Types.ObjectId(),
    // email: { type: String, unique: true, required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // date: Date,
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },

    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    location: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    hasPassed: { type: Boolean, required: true },
});

module.exports = mongoose.model("Meeting", meetingSchema);
