module.exports = class {
  constructor({ name, db }) {
    this.name = name;
    this.db = db;
  }
  getPercentile() {
    return this.db.getRow(
      /*sql */ `
  
          select cost, percent_rank*100 as percentile, "Industry (Exiobase)" as industry  from (
              SELECT 
              "Company Name", "Industry (Exiobase)",
              -avg("Total Environmental Cost") as cost,
              PERCENT_RANK() OVER (
                  PARTITION BY "Industry (Exiobase)"
          
                  ORDER BY -avg("Total Environmental Cost")
              )
          FROM 
              alldata
          Group by "Company Name", "Industry (Exiobase)"
          
          ) where "Company Name" = $1
           
          limit 10;
          `,
      [this.name]
    );
  }

  getAll() {
    return this.db.getRow(
      /*sql */ `
  
    select
    "land_use_change" as "land_use_change",
    "animal_feed" as "animal_feed",
    "farm"  as "farm",
    "processing"  as "processing",
    "transport"  as "transport",
    "packging"  as "packging",
    "retail"  as "retail",
    "total_emissions"  as "total_emissions",
    "eutrophying_emissions_per_1000kcal_gpo₄eq_per_1000kcal"  as "eutrophying_emissions_per_1000kcal_gpo₄eq_per_1000kcal",
    "eutrophying_emissions_per_kilogram_gpo₄eq_per_kilogram"  as "eutrophying_emissions_per_kilogram_gpo₄eq_per_kilogram",
    "eutrophying_emissions_per_100g_protein_gpo₄eq_per_100_grams_protein"  as "eutrophying_emissions_per_100g_protein_gpo₄eq_per_100_grams_protein",
    "freshwater_withdrawals_per_1000kcal_liters_per_1000kcal"  as "freshwater_withdrawals_per_1000kcal_liters_per_1000kcal",
    "freshwater_withdrawals_per_100g_protein_liters_per_100g_protein" as "freshwater_withdrawals_per_100g_protein_liters_per_100g_protein",
    "freshwater_withdrawals_per_kilogram_liters_per_kilogram" as "freshwater_withdrawals_per_kilogram_liters_per_kilogram",
    "greenhouse_gas_emissions_per_1000kcal_kgco₂eq_per_1000kcal" as "greenhouse_gas_emissions_per_1000kcal_kgco₂eq_per_1000kcal",
    "greenhouse_gas_emissions_per_100g_protein_kgco₂eq_per_100g_protein" as "greenhouse_gas_emissions_per_100g_protein_kgco₂eq_per_100g_protein",
    "land_use_per_1000kcal_m²_per_1000kcal" as "land_use_per_1000kcal_m²_per_1000kcal",
    "land_use_per_kilogram_m²_per_kilogram" as "land_use_per_kilogram_m²_per_kilogram",
    "land_use_per_100g_protein_m²_per_100g_protein" as "land_use_per_100g_protein_m²_per_100g_protein",
    "scarcityweighted_water_use_per_kilogram_liters_per_kilogram" as "scarcityweighted_water_use_per_kilogram_liters_per_kilogram",
    "scarcityweighted_water_use_per_100g_protein_liters_per_100g_protein" as "scarcityweighted_water_use_per_100g_protein_liters_per_100g_protein",
    "scarcityweighted_water_use_per_1000kcal_liters_per_1000_kilocalories" as "scarcityweighted_water_use_per_1000kcal_liters_per_1000_kilocalories" 
     from foods where "food_product" = $1
    
    
    `,
      [this.name]
    );
  }
  getAverage() {
    return this.db.getRow(/*sql */ `
  
    select 
    AVG("land_use_change") as "land_use_change",
    AVG("animal_feed") as "animal_feed",
    AVG("farm")  as "farm",
    AVG("processing")  as "processing",
    AVG("transport")  as "transport",
    AVG("packging")  as "packging",
    AVG("retail")  as "retail",
    AVG("total_emissions")  as "total_emissions",
    AVG("eutrophying_emissions_per_1000kcal_gpo₄eq_per_1000kcal")  as "eutrophying_emissions_per_1000kcal_gpo₄eq_per_1000kcal",
    AVG("eutrophying_emissions_per_kilogram_gpo₄eq_per_kilogram")  as "eutrophying_emissions_per_kilogram_gpo₄eq_per_kilogram",
    AVG("eutrophying_emissions_per_100g_protein_gpo₄eq_per_100_grams_protein")  as "eutrophying_emissions_per_100g_protein_gpo₄eq_per_100_grams_protein",
    AVG("freshwater_withdrawals_per_1000kcal_liters_per_1000kcal")  as "freshwater_withdrawals_per_1000kcal_liters_per_1000kcal",
    AVG("freshwater_withdrawals_per_100g_protein_liters_per_100g_protein") as "freshwater_withdrawals_per_100g_protein_liters_per_100g_protein",
    AVG("freshwater_withdrawals_per_kilogram_liters_per_kilogram") as "freshwater_withdrawals_per_kilogram_liters_per_kilogram",
    AVG("greenhouse_gas_emissions_per_1000kcal_kgco₂eq_per_1000kcal") as "greenhouse_gas_emissions_per_1000kcal_kgco₂eq_per_1000kcal",
    AVG("greenhouse_gas_emissions_per_100g_protein_kgco₂eq_per_100g_protein") as "greenhouse_gas_emissions_per_100g_protein_kgco₂eq_per_100g_protein",
    AVG("land_use_per_1000kcal_m²_per_1000kcal") as "land_use_per_1000kcal_m²_per_1000kcal",
    AVG("land_use_per_kilogram_m²_per_kilogram") as "land_use_per_kilogram_m²_per_kilogram",
    AVG("land_use_per_100g_protein_m²_per_100g_protein") as "land_use_per_100g_protein_m²_per_100g_protein",
    AVG("scarcityweighted_water_use_per_kilogram_liters_per_kilogram") as "scarcityweighted_water_use_per_kilogram_liters_per_kilogram",
    AVG("scarcityweighted_water_use_per_100g_protein_liters_per_100g_protein") as "scarcityweighted_water_use_per_100g_protein_liters_per_100g_protein",
    AVG("scarcityweighted_water_use_per_1000kcal_liters_per_1000_kilocalories") as "scarcityweighted_water_use_per_1000kcal_liters_per_1000_kilocalories" 
     from foods
    
    
    `);
  }
  getCostBreakdown() {
    return this.db.getRows(
      /*sql */ `select
        
          unnest(array[
            'land_use_change' ,
                  'animal_feed' ,
                  'farm',
                  'processing',
                  'packging',
                  'retail']) AS "name",
    ABS(unnest(array[
        "land_use_change" ,
                  "animal_feed" ,
                  "farm",
                  "processing",
                  "packging",
                  "retail"])) AS "value"  
                  from (select
                  "land_use_change" ,
                  "animal_feed" ,
                  "farm",
                  "processing",
                  "packging",
                  "retail"
                  from foods where "food_product" = $1  )
                  ;`,
      [this.name]
    );
  }
};
