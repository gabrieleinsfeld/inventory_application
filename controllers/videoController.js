const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateVideo = [
  body("video_name")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage(`Video name has to be between 1 and 30 characters`),
  body("youtuber_channel")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage(`Channel name has to be between 1 and 30 characters`),
];

function addVideoGet(req, res) {
  res.render("addVideo");
}

async function addVideoPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("addVideo", {
      title: "Failed to update Videos:",
      errors: errors.array(),
    });
  }
  await db.insertVideo(req.body.video_name, req.body.youtuber_channel);

  res.redirect("/");
}

async function getVideoByYoutuberName(req, res) {
  const encodedTopicName = req.params.youtuber_channel;
  const youtuber_channel = decodeURIComponent(encodedTopicName);
  const videos = await db.getVideoByYoutuberName(youtuber_channel);
  res.render("viewVideos", {
    videos: videos,
  });
}

module.exports = {
  addVideoGet,
  addVideoPost: [validateVideo, addVideoPost],
  getVideoByYoutuberName,
};
