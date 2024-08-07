const db = require("../db/queries");

async function userFunction(req, res) {
  const youtubers = await db.getAll();
  console.log(youtubers);
  res.send("hello");
}

async function addYoutuberPost(req, res) {
  await db.insertYoutuber(
    req.body.youtuber_name,
    req.body.youtuber_channel,
    req.body.topic_name,
    req.body.channel_followers
  );

  res.send("hello");
}

async function addYoutuberGet(req, res) {
  res.render("addYoutuber");
}

module.exports = {
  userFunction,
  addYoutuberPost,
  addYoutuberGet,
};
