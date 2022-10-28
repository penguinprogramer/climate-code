module.exports = class {
  constructor({ name, db }) {
    this.name = name;
    this.db = db;
  }
  getCarbonFootprint() {
    return {
      value: 1,
      rating: "A",
    };
  }
  getCertificate() {
    return {
      url: "https://www.africau.edu/images/default/sample.pdf",
    };
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
  getTotalCost() {
    return this.db.getRows(
      /*sql */ `select "Total Environmental Cost"as "value", "Year" as "name"
                from alldata where "Company Name" = $1
                order by "Year" desc  ;`,
      [this.name]
    );
  }
  getAlternatives() {
    return this.db.getRows(
      /*sql */ `     select  "Company Name"as "name", "percent_rank" *100 as percentile ,"Industry (Exiobase)" as industry , cost from (
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
        
        )  where "Industry (Exiobase)" = (select "Industry (Exiobase)"  from alldata where "Company Name" = $1 limit 1)
         order by cost asc
        limit 10;`,
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
  getRanking() {
    return this.db.getRow(
      /*sql */ `select 0.0 - AVG("Environmental Intensity (Op Inc)")*100 as "value", "Year" as "name"
                from alldata where "Industry (Exiobase)" = (select "Industry (Exiobase)"  from alldata where "Company Name" = $1 limit 1)
                
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
