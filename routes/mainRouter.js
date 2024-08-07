const { Router } = require("express");
const youtuberController = require("../controllers/youtuberController");
const mainRouter = Router();

mainRouter.get("/", youtuberController.mainFunction);

module.exports = mainRouter;
