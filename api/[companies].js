const databaseConnection = require("./db");
const db = new databaseConnection();
const Company = require("./company");

module.exports = async (req, res) => {
  const {
    query: { name },
  } = req;
  const company = new Company({ name, db });

  res.json({
    name,
    breakdown: await company.getCostBreakdown(),
    totalCost: await company.getTotalCost(),
    intensity: await company.getIntensity(),
    industryIntesity: await company.getIndustryIntensity(),
  });
};
