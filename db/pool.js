// const { Pool } = require("pg");
// require("dotenv").config();

// module.exports = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: 5432, // The default port
// });

const { Pool } = require("pg");

// Again, this should be read from an environment variable
module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
});
