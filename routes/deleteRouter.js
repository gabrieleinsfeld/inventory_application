const { Router } = require("express");
const topicController = require("../controllers/topicController");
const deleteRouter = Router();

// deleteRouter.post("/", youtuberController.addYoutuberPost);
deleteRouter.post("/topic/:id", topicController.deleteTopic);

module.exports = deleteRouter;
