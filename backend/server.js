const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/schedularDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

// Use the userRoutes router for user-related routes
app.use("/api", userRoutes);

// Define other middleware and routes as needed

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
