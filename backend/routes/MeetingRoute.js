const {
	GetMeeting,
	Create,
	Update,
	Delete,
} = require("../controllers/meetingController");
const router = require("express").Router();

//Routes for different paths
router.get("/meeting", GetMeeting);
router.post("/meeting/create", Create);
router.post("/meeting/update", Update);
router.delete("/meeting/delete", Delete);

module.exports = router;
