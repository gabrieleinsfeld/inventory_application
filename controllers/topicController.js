const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateTopic = [
  body("topic_name")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage(`Topic name has to be between 1 and 30 characters`),
];

function addTopicGet(req, res) {
  res.render("addTopic");
}

async function addTopicPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("addYoutuber", {
      title: "Failed to update Topics:",
      errors: errors.array(),
    });
  }
  await db.insertTopic(req.body.topic_name);

  res.redirect("/");
}

module.exports = {
  addTopicGet,
  addTopicPost: [validateTopic, addTopicPost],
};
