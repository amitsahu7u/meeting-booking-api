const { Op } = require("sequelize");
const Meeting = require("../model/meeting.model");

async function hasConflict(userId, startTime, endTime, excludeId = null) {
  return Meeting.findOne({
    where: {
      userId,
      ...(excludeId && { id: { [Op.ne]: excludeId } }),
      startTime: { [Op.lt]: endTime },
      endTime: { [Op.gt]: startTime },
    },
  });
}

async function createMeeting(data) {
  const conflict = await hasConflict(
    data.userId,
    data.startTime,
    data.endTime
  );

  if (conflict) {
    throw new Error("Time slot already booked");
  }

  return Meeting.create(data);
}

async function getMeetings(filters) {
  const where = {};
  const page = parseInt(filters.page) || 1;
  const limit = parseInt(filters.limit) || 5;
  const offset = (page - 1) * limit;

  if (filters.userId) where.userId = filters.userId;

  const meetings = await Meeting.findAndCountAll({
    where,
    limit,
    offset,
    order: [["startTime", "ASC"]],
  });

  return {
    total: meetings.count,
    page,
    pages: Math.ceil(meetings.count / limit),
    data: meetings.rows,
  };
}


async function updateMeeting(id, data) {
  const meeting = await Meeting.findByPk(id);
  if (!meeting) return null;

  const conflict = await hasConflict(
    data.userId,
    data.startTime,
    data.endTime,
    id
  );

  if (conflict) {
    throw new Error("Time slot already booked");
  }

  return meeting.update(data);
}

async function deleteMeeting(id) {
  const meeting = await Meeting.findByPk(id);
  if (!meeting) return null;

  await meeting.destroy();
  return true;
}

module.exports = {
  createMeeting,
  getMeetings,
  updateMeeting,
  deleteMeeting,
};
