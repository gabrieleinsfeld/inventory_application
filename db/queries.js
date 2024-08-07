const pool = require("./pool");

async function insertYoutuber(
  youtuber_name,
  youtuber_channel,
  topic_name,
  channel_followers
) {
  //   Matches the name of the topic to the topic id
  const query = `
    SELECT topics.id 
    FROM topics
    JOIN youtubers ON topics.id = topic_id WHERE topic_name LIKE $1;
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

async function insertUsername(username) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

module.exports = {
  getAll,
  insertYoutuber,
  insertTopic,
};

// INSERT INTO topics (topic_name) VALUES('Comedy');

// INSERT INTO youtubers (youtuber_name, youtuber_channel, topic_id, channel_followers) VALUES('Rachel Einsfeld', 'Rachel Channel', '1', '2000');

// INSERT INTO  videos (video_name, youtuber_channel) VALUES ('Gabe Video', 'Gabe Channel');
