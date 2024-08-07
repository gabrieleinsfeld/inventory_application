const { Router } = require("express");
const youtuberController = require("../controllers/youtuberController");
const addRouter = Router();

addRouter.post("/youtuber", youtuberController.addYoutuberPost);
addRouter.get("/youtuber", youtuberController.addYoutuberGet);

module.exports = addRouter;
