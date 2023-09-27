const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    // other fields...
});

module.exports = mongoose.model("User", userSchema);
