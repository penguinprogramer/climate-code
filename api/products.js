const Database = require("./db");
const db = new Database();

const Product = require("./product");

module.exports = async (req, res) => {
  const {
    query: { name },
  } = req;
  const product = new Product({ name, db });

  res.json({
    name,
    //   prettyName: titleCase(name),

    details: await product.getAll(),
    average: await product.getAverage(),

    // totalCost: await company.getTotalCost(),
    //   intensity: await company.getIntensity(),
    //   industryIntesity: await company.getIndustryIntensity(),
    breakdown: await product.getCostBreakdown(),
    //   alternatives: await company.getAlternatives(),
  });
};

// module.exports = async (req, res) => {
//   res.json(
//     await db.getRows(/*sql */ `

//     select
//     AVG("land_use_change") as "land_use_change",
//     AVG("animal_feed") as "animal_feed",
//     AVG("farm")  as "farm",
//     AVG("processing")  as "processing",
//     AVG("transport")  as "transport",
//     AVG("packging")  as "packging",
//     AVG("retail")  as "retail",
//     AVG("total_emissions")  as "total_emissions",
//     AVG("eutrophying_emissions_per_1000kcal_gpo₄eq_per_1000kcal")  as "eutrophying_emissions_per_1000kcal_gpo₄eq_per_1000kcal",
//     AVG("eutrophying_emissions_per_kilogram_gpo₄eq_per_kilogram")  as "eutrophying_emissions_per_kilogram_gpo₄eq_per_kilogram",
//     AVG("eutrophying_emissions_per_100g_protein_gpo₄eq_per_100_grams_protein")  as "eutrophying_emissions_per_100g_protein_gpo₄eq_per_100_grams_protein",
//     AVG("freshwater_withdrawals_per_1000kcal_liters_per_1000kcal")  as "freshwater_withdrawals_per_1000kcal_liters_per_1000kcal",
//     AVG("freshwater_withdrawals_per_100g_protein_liters_per_100g_protein") as "freshwater_withdrawals_per_100g_protein_liters_per_100g_protein",
//     AVG("freshwater_withdrawals_per_kilogram_liters_per_kilogram") as "freshwater_withdrawals_per_kilogram_liters_per_kilogram",
//     AVG("greenhouse_gas_emissions_per_1000kcal_kgco₂eq_per_1000kcal") as "greenhouse_gas_emissions_per_1000kcal_kgco₂eq_per_1000kcal",
//     AVG("greenhouse_gas_emissions_per_100g_protein_kgco₂eq_per_100g_protein") as "greenhouse_gas_emissions_per_100g_protein_kgco₂eq_per_100g_protein",
//     AVG("land_use_per_1000kcal_m²_per_1000kcal") as "land_use_per_1000kcal_m²_per_1000kcal",
//     AVG("land_use_per_kilogram_m²_per_kilogram") as "land_use_per_kilogram_m²_per_kilogram",
//     AVG("land_use_per_100g_protein_m²_per_100g_protein") as "land_use_per_100g_protein_m²_per_100g_protein",
//     AVG("scarcityweighted_water_use_per_kilogram_liters_per_kilogram") as "scarcityweighted_water_use_per_kilogram_liters_per_kilogram",
//     AVG("scarcityweighted_water_use_per_100g_protein_liters_per_100g_protein") as "scarcityweighted_water_use_per_100g_protein_liters_per_100g_protein",
//     AVG("scarcityweighted_water_use_per_1000kcal_liters_per_1000_kilocalories") as "scarcityweighted_water_use_per_1000kcal_liters_per_1000_kilocalories"
//      from foods

//     `)
//   );
// };
