const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const path = require("node:path");
const validateYoutuber = [
  body("youtuber_name")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage(`Youtuber name has to be between 1 and 30 characters`),
  body("youtuber_channel")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage(`Youtuber Channel has to be between 1 and 30 characters`),
  body("topic_name")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage(`Topic name has to be between 1 and 30 characters`),
];

async function mainFunction(req, res) {
  const topics = await db.getTopics();

  res.render("index", {
    topics: topics,
  });
}

async function addYoutuberPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("addYoutuber", {
      title: "Failed to update Youtuber:",
      errors: errors.array(),
    });
  }
  await db.insertYoutuber(
    req.body.youtuber_name,
    req.body.youtuber_channel,
    req.body.topic_name,
    req.body.channel_followers
  );

  res.redirect("/");
}

function addYoutuberGet(req, res) {
  res.render("addYoutuber");
}

async function getYoutuberByTopic(req, res) {
  const id = req.params.id;
  const topics = await db.getTopics();
  const youtubers = await db.getYoutubersByTopicId(id);

  res.render("viewYoutubers", {
    youtubers: youtubers,
    topics: topics,
  });
}

module.exports = {
  mainFunction,
  addYoutuberPost: [validateYoutuber, addYoutuberPost],
  addYoutuberGet,
  getYoutuberByTopic,
};
