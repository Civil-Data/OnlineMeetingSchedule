const {
	Create,
	Update,
	Delete,
	GetMeetingsByUserId,
	GetMeetingsByDate,
} = require("../controllers/meetingController");
const router = require("express").Router();

//Routes for different paths
router.get("/meeting/users", GetMeetingsByUserId);
router.get("/meeting/date", GetMeetingsByDate);
router.post("/meeting/create", Create);
router.post("/meeting/update", Update);
router.delete("/meeting/delete", Delete);

module.exports = router;
