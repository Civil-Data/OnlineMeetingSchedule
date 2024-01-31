const express = require("express");

const app = express();

app.use(express.json());

app.use("/", (req, res) => {
	return res.status(200).json({ msg: "Hello from Meetings" });
});

app.listen(5002, () => {
	console.log("Meetings is Listening to Port 5002");
});
