# climatecode
This project allows users to look up a company either by name or by scanning the barcode of a project. Following that they see an overview of the environmental impacts that the company is having.
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Inspiration
I was inspired by the confusion i faced when trying to evaluate what products were most environmentally friendly
## The concept

People often want to do the right thing for the climate but they don’t know where to start. They feel they haven’t got the time as there are more imminent issues facing their lives and even if they did what would be the point anyway it would barely make a difference.

My solution tackles this climate apathy by offering answers where there were none before and does so almost instantly.

##What it does

Put simply my solution is a text and image based search engine which shows the environmental credentials of both companies and products.

Users can either enter a company name or scan a product barcode to get the details of either the product or company

## How we built it
Going into the project I knew that i would need a framework. I chose to use Vue.js as i have lots of experience using it. Paired with the Component library Element UI, rapid prototyping was effortless as i could easily leverage existing components without having to worry about making my own.

The database used was cockroachdb which is a variant of postgresql. I am still a quite new to using SQL so creating the backend API was quite a challenge. 

Barcode scanning was accomplished using Quagga js and product lookup uses openfoodfacts. This part of the project was easier than expected as placed the barcode result into an API call to openfoodfacts. I think it adds a lot to the project though.



## What's next for Informed choices

I hope to add polish by fixing small UI bugs that degrade the user experience. While only a minor issue, I think it is essential for it to be fixed before the solution can be useful to a mainstream audience.

 Id also like to improve the reliability of the solution by adding more companies and products from different datasets. I have tried to stick to only the bare minimum in the data sources that I currently have and yet I still think that in the current state the solution is useful using just the data sources that it already has. Consequently I think this improvement is only of medium importance

Finally I hope to improve the existing data by adding contextual data  for instance a description of the company being referenced along with it's logo
## Challenges we ran into
* Importing data into the sql database was a major challenge as the DBMS i was using kept giving strange errors. I solved this issue by just using the command line
* It was also a challenge to get it done on time and as a result i did not get to do all of the testing and bug fixing i might have liked.
##Accomplishments that we're proud of
 I am most proud of how seamles the barcode scanning is, while still a little buggy it seems almost magical that a product can be scanned and all it's details seen.
##What we learned
I learnt a lot of SQL. Prior to this hackathon i did not i could handle a `SELECT * FROM` clause and that's about it. In this project  really expanded my knowledge by using `GROUP BY` and `PARTITION BY` as well as functions like `AVG()` and `PERCENT_RANK()`
## source
https://github.com/penguinprogramer/climate-code

## Datasets:

https://www.hbs.edu/impact-weighted-accounts/Pages/default.aspx

https://www.kaggle.com/selfvivek/environment-impact-of-food-production#

## Libraries

    algoliasearch

    core-js,

    dotenv

    echarts

    element-ui

    instantsearch.css,

    nice-color-palettes

    number-to-words

    quagga

    typed.js

    vue

    vue-echarts

    vue-instantsearch

    vue-quaggajs

    vue-router

    vue-typed-js
