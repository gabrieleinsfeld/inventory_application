const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

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
  res.render("index");
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

  res.send("hello");
}

function addYoutuberGet(req, res) {
  res.render("addYoutuber");
}

module.exports = {
  mainFunction,
  addYoutuberPost: [validateYoutuber, addYoutuberPost],
  addYoutuberGet,
};
