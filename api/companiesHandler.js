const databaseConnection = require("./db");
const db = new databaseConnection();
const Company = require("./company");
function titleCase(str) {
  str = str.toLowerCase().split(" ");
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
}
module.exports = async (req, res) => {
  const {
    query: { name },
  } = req;
  const company = new Company({ name, db });

  res.json({
    name,
    prettyName: titleCase(name),

    breakdown: await company.getCostBreakdown(),
    // totalCost: await company.getTotalCost(),
    intensity: await company.getIntensity(),
    industryIntesity: await company.getIndustryIntensity(),
    summary: await company.getPercentile(),
    alternatives: await company.getAlternatives(),
  });
};
