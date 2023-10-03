const { Register, Login } = require("../controllers/AuthController");
const router = require("express").Router();
const { UserVerification } = require("../middleware/AuthMiddleware");

router.post("/register", Register);
router.post("/login", Login);
router.post("/", UserVerification);

module.exports = router;
