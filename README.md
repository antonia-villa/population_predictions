# Population Preductions
https://population-predictions.herokuapp.com/

Long-term global population growth is difficult to predict. The United Nations and the US Census Bureau have varying opinions on the future of the world population. The following visual shows what percent of the total world population each continent will contribute from 2010 to 2035. 

![](//src/img/population_predictions.png)


## Requirements
* Build a time series data visualization
* Animate the visual to step through the data, displaying each year for a specified period of time
 * Each year should be a separate frame of the animation
* Display progress bar showing currently displayed data point in relation to the others 
* Allow user to play/pause the visual at any point, pausing on the year currently being displayed
* Allow user to control inital state of visual through the query parameters
* Have a visually appealing design on both desktop and mobile


## Technologies Used
* React
 * Key modules:
  * Recharts
  * React-router-dom
  * Query-string
* Javascript




## Steps to Setting Up
If you'd like to set this project up on your own local server: 
* Fork and clone this repository
* Run `npm install` to install dependencies/modules
* You can now open [http://localhost:3000](http://localhost:3000) to view it in the browser


## Sources
https://en.wikipedia.org/wiki/World_population





* [ ] Year and play/paused state are persisted as query parameters in the URL.
      For example, `http://localhost:3000/?paused=true&year=2002` should load
      the page with the animation already paused and the 



To get started, install with the project's dependencies with `yarn install` or
`npm install`. Then run the app in development mode with `yarn start` or `npm
start`. You can now open [http://localhost:3000](http://localhost:3000) to view
it in the browser. The page will automatically reload if you make edits.

