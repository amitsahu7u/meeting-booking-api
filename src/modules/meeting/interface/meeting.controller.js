const service = require("../service/meeting.service");

async function createMeeting(req, res) {
  try {
    const meeting = await service.createMeeting(req.body);
    res.status(201).json(meeting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}fdgfdgdfgdfgfdg

async function getMeetings(req, res) {
  const result = await service.getMeetings(req.query);

  res.json({
    success: true,
    ...result,
  });
}


async function updateMeeting(req, res) {
  try {
    const meeting = await service.updateMeeting(
      req.params.id,
      req.body
    );

    if (!meeting)
      return res.status(404).json({ message: "Meeting not found" });

    res.json(meeting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteMeeting(req, res) {
  const deleted = await service.deleteMeeting(req.params.id);

  if (!deleted)
    return res.status(404).json({ message: "Meeting not found" });

  res.status(204).send();
}

module.exports = {
  createMeeting,
  getMeetings,
  updateMeeting,
  deleteMeeting,
};
