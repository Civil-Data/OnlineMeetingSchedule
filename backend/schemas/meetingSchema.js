const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    // meetingId: new mongoose.Types.ObjectId(),
    email: { type: String, unique: true, required: true },
    organizer: { type: String, required: true },
    participants: { type: String, required: true },
    date: Date,
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    hasPassed: { type: Boolean, required: true },
});

module.exports = mongoose.model("User", userSchema);
