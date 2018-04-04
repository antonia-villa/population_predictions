import React, { Component } from "react";

/* Additional Components */
import Chart from './barChart.js'
// import ProgressBar from './progressBar.js'
import ProgressBar from './progressBar.js'

/* Import Data */
import * as data from './population_predictions.json';
/* Import Data cleansing function */
import {uniqueValues, changeData} from './dataCleansing.js'

/* Used for Query URL Params */
import parseQueryString from 'query-string';

class VisualContainer extends Component {
   constructor(props){
      super(props)
      this.state = {
        allData: data["WORLD POPULATION"],
        dataByYear: changeData(data["WORLD POPULATION"]),
        uniqueYears: uniqueValues(data["WORLD POPULATION"]),
        initialYear: '',
        initialYearIndex: '',
        initialProgress: '',
        initialPausedState: '',
        yearIndex: '',
        year: '',
        progress: '',
        data: [],
        paused: ''
      }
      this.handlePause = this.handlePause.bind(this);
      this.handleStart = this.handleStart.bind(this);
      this.handleRestart = this.handleRestart.bind(this);
   };


   // Dynamically change dataset based on array of unique years
   changeData() {
      var uniqueYears = this.state.uniqueYears
      var newIndex = this.state.yearIndex;

      var testData = this.state.dataByYear[uniqueYears[newIndex]]
      var progressPercent = Number((this.state.yearIndex/(uniqueYears.length-1)*100).toFixed(0))

      this.setState({
        data: testData,
        year: uniqueYears[newIndex],
        progress: progressPercent,
        yearIndex: this.state.yearIndex + 1
      })
    }





  componentWillMount(){
    // Extract and parse query string parameters 
    var queryParams = parseQueryString.parse(this.props.location.search); //return everything from ?--> - .parse create object of query params
    var year = queryParams.year
    var indexYear = this.state.uniqueYears.indexOf(Number(year)) // used to calculate progress percentage
    var paused = (queryParams.paused === 'true')

    var progressPercent = Number((indexYear/(this.state.uniqueYears.length-1)*100).toFixed(0)) // length -1 - to take into account index of array of unique years
    
    // Set State and run interval
    this.setState({
      initialYear: year,
      initialYearIndex: indexYear,
      initialProgress: progressPercent,
      initialPausedState: paused,
      year: year,
      yearIndex: indexYear,
      progress: progressPercent,
      paused: paused
    })
   
         this.timerID = setInterval(
            () => this.changeData(), 2000
      );
  }


   handlePause (event){
      event.preventDefault();
      this.setState({paused: true})
      clearInterval(this.timerID);
   }

   handleStart(event){
      event.preventDefault();
      this.setState({paused: false})
      // this.timerID = setInterval(
      //       () => this.changeData(), 2000
      // );
      setTimeout(this.changeData(), 2000)
   }

   handleRestart(event){
      event.preventDefault();
      clearInterval(this.timerID);
      this.setState({
        paused: this.state.initialPausedState,
        year: this.state.initialYear,
        progress: this.state.initialProgress,
        yearIndex: this.state.initialYearIndex
      })
   }
   
  render() {
    return (
    <div className="visualBackground" style={{backgroundColor: "#FFFFFF"}}>
      <div className="visualContainer">
        <div className="titleContainer">
          <h1 className="title">Population Projections (in millions)</h1>
          <h2 className="subtitle">Distribution by Continent: 2010-2035</h2>
        </div>
        <Chart data = {this.state.data}/>
        <div className="actions">
          <div id="startButtons">
              <img className="actionButton" src="play.png" alt="Play" onClick={this.handleStart}/>
              <img className="actionButton" src="pause.png" alt="Pause" onClick={this.handlePause}/>
          </div> 
            <div className="progressBar">
              <ProgressBar year={this.state.year} yearIndex={this.state.yearIndex} progress={this.state.progress} allYears={this.state.uniqueYears} />
            </div>
           <div id="replayButton"> 
              <img className="actionButton" src="restart.png" alt="Restart" onClick={this.handleRestart}/>
            </div>
        </div>
        <div className="footer">
          <p>NOTE: Long-term global population growth is difficult to predict. The data displayed represents the percent distribution of the predicted population of the World by Continent by year provided by the United Nations <a href="https://en.wikipedia.org/wiki/World_population">[source]</a>. </p>
        </div>
    </div>
  </div>
    );
  }
}

export default VisualContainer;