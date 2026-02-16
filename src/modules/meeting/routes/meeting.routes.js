const express = require("express");
const router = express.Router();
const controller = require("../interface/meeting.controller");
const { validateMeeting } = require("../../../middlewares/validateRequest");

router.post("/", validateMeeting, controller.createMeeting);
router.put("/:id", validateMeeting, controller.updateMeeting);

router.post("/", controller.createMeeting);
router.get("/", controller.getMeetings);
router.put("/:id", controller.updateMeeting);
router.delete("/:id", controller.deleteMeeting);
fdzgfgdfgdfgdf
module.exports = router;
