const {
	Create,
	Update,
	Delete,
	GetMeetingsByUserId,
} = require("../controllers/meetingController");
const router = require("express").Router();

//Routes for different paths
router.get("/meeting/users", GetMeetingsByUserId);
router.post("/meeting/create", Create);
router.post("/meeting/update", Update);
router.post("/meeting/delete", Delete);

module.exports = router;
