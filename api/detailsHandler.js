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
    carbonFootprint: await company.getCarbonFootprint(name),
    prettyName: titleCase(name),
    polution: await company.getIndustryIntensity(),
    certificate: await company.getCertificate(),

    // breakdown: await company.getCostBreakdown(),
    // // totalCost: await company.getTotalCost(),
    // intensity: await company.getIntensity(),
    // summary: await company.getPercentile(),
    // alternatives: await company.getAlternatives(),
  });
};
