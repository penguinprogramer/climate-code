module.exports = class {
  constructor({ name, db }) {
    this.name = name;
    this.db = db;
  }
  getTotalCost() {
    return this.db.getRows(
      /*sql */ `select "Total Environmental Cost"as "value", "Year" as "name"
                from alldata where "Company Name" = $1
                order by "Year" desc  ;`,
      [this.name]
    );
  }
  getIntensity() {
    return this.db.getRows(
      /*sql */ `select 0.0 - "Environmental Intensity (Op Inc)"*100 as "value", "Year" as "name"
                from alldata where "Company Name" = $1
                order by "name" asc  ;`,
      [this.name]
    );
  }
  getIndustryIntensity() {
    return this.db.getRows(
      /*sql */ `select 0.0 - AVG("Environmental Intensity (Op Inc)")*100 as "value", "Year" as "name"
                from alldata where "Industry (Exiobase)" = (select "Industry (Exiobase)"  from alldata where "Company Name" = $1 limit 1)
                GROUP BY "Year"
                order by "name" asc  ;`,
      [this.name]
    );
  }
  getCostBreakdown() {
    return this.db.getRows(
      /*sql */ `select
      
        unnest(array[
                'Damage to human health',
                'Damage to marine life',
                'Crop Production Capacity',
                'Meat Production Capacity',
                'Biodiversity',
                'Abiotic Resources',
                'Water Polution',
                'Wood Production Capacity']) AS "name",
  ABS(unnest(array[
                "Damage to human health",
                "Damage to marine life",
                "Crop Production Capacity",
                "Meat Production Capacity",
                "Biodiversity",
                "Abiotic Resources",
                "Water Polution",
                "Wood Production Capacity"])) AS "value"  
                from (select "Working Capacity" as "Damage to human health",
                "Fish Production Capacity" as"Damage to marine life",
                "Crop Production Capacity",
                "Meat Production Capacity",
                "Biodiversity",
                "Abiotic Resources",
                "Water production capacity (Drinking water & Irrigation Water)" as "Water Polution",
                "Wood Production Capacity" from alldata where "Company Name" = $1 AND "Year" = (select MAX("Year") from alldata) ) 
                ;`,
      [this.name]
    );
  }
};
