const express = require("express");
const app = express();
const cors = require("cors");

// const algoliasearch = require("algoliasearch/lite");
app.use(cors());
const companiesHandler = require("./companiesHandler");
const productsHandler = require("./productsHandler");
const detailsHandler = require("./detailsHandler");
let staticContentPAth = __dirname.split("/");
staticContentPAth.pop();
staticContentPAth.push("dist");
staticContentPAth = staticContentPAth.join("/");
console.log();
app.use("/", express.static(staticContentPAth));

// const client = algoliasearch("94O6A12T6R");
// const index = client.initIndex("ab51f12ba8dbc0d3640438bb6c40daf7");
// // respond with "hello world" when a GET request is made to the homepage

require("dotenv").config();

// const { Pool } = require("pg");

const config = {
  user: "penguinprogramer",
  password: "VLTJpwb5MyefDqFj",
  host: "free-tier5.gcp-europe-west1.cockroachlabs.cloud",
  database: "green-data-1005.penguinprogramer",
  port: 26257,
  ssl: {
    rejectUnauthorized: false,
  },
  //For secure connection:
  /*ssl: {
          ca: fs.readFileSync('/certs/ca.crt')
              .toString()
      }*/
};

// const pool = new Pool(config);

console.log(JSON.stringify(config));

// app.get("/", async (req, res) => {
//   console.log("connecting");
//   res.json(
//     await pool.connect().then((client) => {
//       console.log("client connected");
//       return client
//         .query("SELECT NOW();")
//         .then((res) => {
//           console.log("result");
//           client.release();
//           console.log(res.rows[0]);
//           return res.rows[0];
//         })
//         .catch((err) => {
//           client.release();
//           console.log(err.stack);
//         });
//     })
//   );
// });

app.get("/companies", companiesHandler);
app.get("/details", detailsHandler);
app.get("/products", productsHandler);
let port = 3303;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
