const { Router } = require("express");
const youtuberController = require("../controllers/youtuberController");
const topicController = require("../controllers/topicController");
const videoController = require("../controllers/videoController");
const getRouter = Router();

// getRouter.post("/", youtuberController.addYoutuberPost);
getRouter.get("/:id", youtuberController.getYoutuberByTopic);
getRouter.get(
  "/videos/:youtuber_channel",
  videoController.getVideoByYoutuberName
);
module.exports = getRouter;
