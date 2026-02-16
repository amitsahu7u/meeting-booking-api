function validateMeeting(req, res, next) {
  const { startTime, endTime } = req.body;

  if (!startTime || !endTime) {
    return res.status(400).json({
      message: "startTime and endTime are required",
    });
  }

  if (new Date(startTime) >= new Date(endTime)) {
    return res.status(400).json({
      message: "startTime must be before endTime",
    });
  }

  next();
}

module.exports = {
  validateMeeting,
};
