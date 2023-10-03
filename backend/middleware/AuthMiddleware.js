const User = require("../models/user.model");
require("dotenv").config({ path: "./.env" });
const jwt = require("jsonwebtoken");

module.exports.UserVerification = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ status: false });
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false });
        } else {
            const user = await User.findById(data.id);
            if (user) return res.json({ status: true, user: user.username });
            else return res.json({ status: false });
        }
    });
};
