// const express = require("express");
// const app = express();
// const cors = require("cors");
// const mongoose = require("mongoose");
// const User = require("./models/user.model");
// const bcrypt = require("bcryptjs");
// const { body, validationResult } = require("express-validator");

// app.use(cors());
// app.use(express.json());

// mongoose.connect(
//     "mongodb+srv://joelscarinius:leojsuiniracs123@meetingapp.9r6ez1j.mongodb.net/?retryWrites=true&w=majority"
// );

// // const registrationValidation = [
// //     body("name")
// //         .isLength({ min: 2 })
// //         .withMessage("Name must be at least 2 characters"),
// //     body("username")
// //         .isLength({ min: 4 })
// //         .withMessage("Username must be at least 4 characters"),
// //     body("email").isEmail().withMessage("Invalid email address"),
// //     body("confirmEmail").custom((value, { req }) => {
// //         if (value !== req.body.email) {
// //             throw new Error("Email confirmation does not match email");
// //         }
// //         return true;
// //     }),
// //     body("password")
// //         .isLength({ min: 8 })
// //         .withMessage("Password must be at least 8 characters"),
// //     body("confirmPassword").custom((value, { req }) => {
// //         if (value !== req.body.password) {
// //             throw new Error("Password confirmation does not match password");
// //         }
// //         return true;
// //     }),
// // ];

// // app.post("/api/register", registrationValidation, async (req, res) => {
// //     const errors = validationResult(req);
// //     if (!errors.isEmpty()) {
// //         return res.status(400).json({ errors: errors.array() });
// //     }
// //     try {
// //         const newPassword = await bcrypt.hash(req.body.password, 10);
// //         await User.create({
// //             name: req.body.name,
// //             username: req.body.name,
// //             email: req.body.email,
// //             confirmEmail: req.body.confirmEmail,
// //             password: newPassword,
// //             confirmPassword: newPassword,
// //         });
// //         res.json({ status: "ok" });
// //     } catch (err) {
// //         res.json({ status: "error", error: "Duplicate email" });
// //     }
// // });

// app.post("/api/register", async (req, res) => {
//     console.log(req.body);
//     try {
//         const newPassword = await bcrypt.hash(req.body.password, 10);
//         await User.create({
//             name: req.body.name,
//             username: req.body.name,
//             email: req.body.email,
//             confirmEmail: req.body.confirmEmail,
//             password: newPassword,
//             confirmPassword: newPassword,
//         });
//         res.json({ status: "ok" });
//     } catch (err) {
//         res.json({ status: "error", error: "Duplicate email" });
//     }
// });

// app.post("/api/login", async (req, res) => {
//     const user = await User.findOne({
//         email: req.body.email,
//     });

//     if (!user) {
//         return res.json({ status: "error", user: false });
//     }

//     const isPasswordValid = await bcrypt.compare(
//         req.body.password,
//         user.password
//     );

//     if (isPasswordValid) {
//         return res.json({ status: "ok", user: true, password: true });
//     } else {
//         return res.json({ status: "error", user: true, password: false });
//     }
// });

// app.listen(1337, () => {
//     console.log("Server started on 1337");
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const env = require("dotenv");
env.config({ path: "./.env" });
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
const userRoute = require("./routes/userRoutes");
const { DB_USER, DB_PASSWORD, SERVER_PORT } = process.env;

const PORT = SERVER_PORT || 5000;

mongoose
	.connect(
		`mongodb+srv://${DB_USER}:${DB_PASSWORD}@meetingapp.9r6ez1j.mongodb.net/OnlineMeetingSchedulingAppDB?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => console.log("MongoDB is connected successfully \n"))
	.catch((err) => console.error(err));

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});

app.use(
	cors({
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

// Enable CORS for specific origin (http://localhost:3000) and allow credentials
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	// Other CORS headers as needed
	next();
});

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);
app.use("/", userRoute);
