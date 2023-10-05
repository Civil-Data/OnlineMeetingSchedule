const { Register, Login } = require("../controllers/authController");
const router = require("express").Router();
const { UserVerification } = require("../middleware/AuthMiddleware");

//Routes for different paths
router.post("/register", Register);
router.post("/login", Login);
router.post("/", UserVerification);

module.exports = router;
