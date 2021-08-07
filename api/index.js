if (process.env.NODE_ENV == "development") {
  require("dotenv").config();
}
const { Pool } = require("pg");

const config = {
  user: process.env.db_username,
  password: process.env.db_password,
  host: process.env.db_host,
  database: process.env.db_database,
  port: +process.env.db_port,
  ssl: {
    rejectUnauthorized: false,
  },
  //For secure connection:
  /*ssl: {
          ca: fs.readFileSync('/certs/ca.crt')
              .toString()
      }*/
};

const pool = new Pool(config);

module.exports = async (req, res) => {
  console.log("connecting");
  res.json(
    await pool.connect().then((client) => {
      console.log("client connected");
      return client
        .query("SELECT NOW();")
        .then((res) => {
          console.log("result");
          client.release();
          console.log(res.rows[0]);
          return res.rows[0];
        })
        .catch((err) => {
          client.release();
          console.log(err.stack);
        });
    })
  );
};
