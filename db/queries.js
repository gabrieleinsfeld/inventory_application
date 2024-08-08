const pool = require("./pool");

// INSERT FUNCTIONS
// ################
async function insertYoutuber(
  youtuber_name,
  youtuber_channel,
  topic_name,
  channel_followers
) {
  const query0 = `INSERT INTO topics (topic_name)
    VALUES ($1)
    ON CONFLICT (topic_name) DO NOTHING;`;
  await pool.query(query0, [topic_name]);
  //   Matches the name of the topic to the topic id
  const query = `
    SELECT id 
    FROM topics
    WHERE topic_name = $1;
  `;
  const { rows } = await pool.query(query, [topic_name]);

  // Check if rows is empty and return the appropriate value
  const id = rows.length === 0 ? null : rows[0].id;

  await pool.query(
    "INSERT INTO youtubers (youtuber_name, youtuber_channel, topic_id, channel_followers) VALUES ($1, $2, $3, $4)",
    [youtuber_name, youtuber_channel, id, channel_followers]
  );
}

async function insertTopic(topic_name) {
  await pool.query("INSERT INTO topics (topic_name) VALUES ($1)", [topic_name]);
}

async function insertVideo(video_name, youtuber_channel) {
  await pool.query(
    "INSERT INTO videos (video_name, youtuber_channel) VALUES ($1, $2)",
    [video_name, youtuber_channel]
  );
}

// GET FUNCTIONS
// #############

async function getYoutubers() {
  const { rows } = await pool.query("SELECT * FROM youtubers");
  return rows;
}

async function getTopics() {
  const { rows } = await pool.query("SELECT * FROM topics");
  return rows;
}

async function getVideos() {
  const { rows } = await pool.query("SELECT * FROM videos");
  return rows;
}

async function getYoutubersByTopicId(id) {
  const query = `
    SELECT * 
    FROM youtubers
    JOIN topics ON topics.id = topic_id WHERE topics.id = $1;
  `;
  const { rows } = await pool.query(query, [id]);
  return rows;
}

async function getVideoByYoutuberName(youtuber_channel) {
  const query = `
    SELECT video_name 
    FROM videos
    JOIN youtubers ON youtubers.youtuber_channel = videos.youtuber_channel WHERE videos.youtuber_channel LIKE $1;
  `;
  const { rows } = await pool.query(query, [youtuber_channel]);
  return rows;
}

async function deleteTopic(id) {
  const query = `DELETE FROM topics WHERE id = $1;`;
  await pool.query(query, [id]);
  return;
}

module.exports = {
  insertYoutuber,
  insertTopic,
  insertVideo,
  getYoutubers,
  getTopics,
  getVideos,
  getYoutubersByTopicId,
  getVideoByYoutuberName,
  deleteTopic,
};

// INSERT INTO topics (topic_name) VALUES('Comedy');

// INSERT INTO youtubers (youtuber_name, youtuber_channel, topic_id, channel_followers) VALUES('Rachel Einsfeld', 'Rachel Channel', '1', '2000');

// INSERT INTO  videos (video_name, youtuber_channel) VALUES ('Gabe Video', 'Gabe Channel');
