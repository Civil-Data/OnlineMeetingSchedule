const {
    Register,
    Login,
    UpdateUser,
} = require("../controllers/AuthController");
const router = require("express").Router();
const { UserVerification } = require("../middleware/AuthMiddleware");

router.post("/register", Register);
router.post("/login", Login);
router.post("/updateUser", UpdateUser);
router.post("/", UserVerification);

module.exports = router;
