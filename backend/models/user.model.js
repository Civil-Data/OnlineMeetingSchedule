const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Your name is required"],
    },
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    // username: {
    //     type: String,
    //     required: [true, "Your username is required"],
    // },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
    telephone: {
        type: String,
    },
    gender: {
        type: String,
    },
    description: {
        type: String,
    },
    age: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);
