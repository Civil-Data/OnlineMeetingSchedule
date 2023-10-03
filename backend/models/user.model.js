// const mongoose = require("mongoose");

// const User = new mongoose.Schema(
//     {
//         // userId: new mongoose.Types.ObjectId(),
//         name: { type: String, required: true },
//         username: { type: String, unique: true, required: true },
//         email: { type: String, required: true, unique: true },
//         confirmEmail: { type: String, required: true },
//         password: { type: String, required: true },
//         confirmPassword: { type: String, required: true },

//         // address: { type: String, required: true },

//         // phone: { type: String, required: true },
//         // dateOfBirth: Date,
//         // contacts: { type: String },
//         // meetings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meeting" }],
//         // role: { type: String, required: true },
//         // Additional fields as needed
//     },
//     { collection: "user-data" }
// );

// const model = mongoose.model("UserData", User);

// module.exports = model;

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Your username is required"],
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
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
