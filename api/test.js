const Database = require("./db");
const db = new Database();
module.exports = async (req, res) => {
  res.json(await db.getRows("select *  from alldata limit 10"));

  //   res.json(await db.execute("select count(*) from alldata"));
};
