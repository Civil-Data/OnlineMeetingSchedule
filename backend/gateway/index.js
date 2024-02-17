const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(
	cors({
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);
app.use(express.json());

app.use("/user", proxy("http://localhost:5001"));
app.use("/meeting", proxy("http://localhost:5002"));
// app.use("/", proxy("http://localhost:5001")); // user service

app.listen(5000, () => {
	console.log("Gateway is Listening to Port 5000");
});
