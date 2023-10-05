const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
    name: {
        type: String,
        required: [true, "Your name is required"],
    },
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
    telephone: {
        type: Number,
        default: 46700000000,
    },
    gender: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: "The description of me should be here!",
    },
    age: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
=======
	// _id: new mongoose.Types.ObjectId(),
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
		default: "The description is of me should be here!",
	},
	age: {
		type: Number,
	},
	createdAt: {
		type: Date,
		default: new Date().toLocaleDateString(),
	},
>>>>>>> a083665a1e0d9f464176001b2e15268f750999c8
});

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);
