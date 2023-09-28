const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config({ path: "../.env" });
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/schedularDB", {
mongoose.connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

// Use the userRoutes router for user-related routes
// app.use("/api", userRoutes);
app.use(
    cors({
        origin: "http://localhost:3000/register",
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);
app.use("/api", userRoutes);

// Define other middleware and routes as needed

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
