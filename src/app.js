const meetingRoutes = require("./modules/meeting/routes/meeting.routes");
const express = require("express");
const cors = require("cors");
require("./modules");

const userRoutes = require("./modules/user/routes/user.routes");

const app = express();
const errorHandler = require("./middlewares/errorHandler");

app.use(errorHandler);

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/meetings", meetingRoutes);


app.get("/", (req, res) => {
  res.json({ message: "API running 🚀" });
});

module.exports = app;
