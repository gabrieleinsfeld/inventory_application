const { Router } = require("express");
const youtuberController = require("../controllers/youtuberController");
const topicController = require("../controllers/topicController");
const addRouter = Router();

addRouter.post("/youtuber", youtuberController.addYoutuberPost);
addRouter.get("/youtuber", youtuberController.addYoutuberGet);
addRouter.get("/topic", topicController.addTopicGet);
addRouter.post("/topic", topicController.addTopicPost);

module.exports = addRouter;
