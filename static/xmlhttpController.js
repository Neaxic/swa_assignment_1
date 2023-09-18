import WeatherData from "./models/WeatherData.js";
import Temperature from "./models/Temperature.js";
import Wind from "./models/Wind.js"
import precipitation from "./models/Precipitation.js";
import TemperaturePrediction from "./models/TemperaturePrediction.js";
import PrecipitationPrediction from "./models/PrecipitationPrediction.js";
import WindPrediction from "./models/WindPrediction.js";
import CloudCoveragePrediction from "./models/WindPrediction.js";
import { displayForecasts, displayMinTemp, displayMaxTemp, displayAverageWindSpeed, displayTotalPrecipitation } from "./displaystuff.js";

var XMLHttpRequest = require('xhr2');
var xhr = new XMLHttpRequest();
var baseUrl = "http://localhost:8080"

$('.forecastbtn').click(async function () {
  var thebuttonclicked = $(this).attr("value");

  handleForecasts(thebuttonclicked)
  let city = `${thebuttonclicked}`;

  let max = await getMaxTemp(city)
  let min = await getMinTemp(city)
  let avg = await getAverageWindSpeed(city);
  let precipition = await getTotalPrecipitation(city)
  displayMaxTemp(max);
  displayMinTemp(min);
  displayAverageWindSpeed(avg);
  displayTotalPrecipitation(precipition);
});


async function getForecast(cb, city) {
  const request = new XMLHttpRequest();
  request.addEventListener("load", () => { console.log("lol") });
  request.open("GET", `${baseUrl}/forecast/${city}`);
  request.responseType = "text";

  request.onload = () => {
    if (request.readyState === request.DONE && request.status === 200) {
      const result = request.response;
      const json = JSON.parse(result);
      cb(json)
    }
  }

  request.send();
}

async function getData(cb, city) {
  const request = new XMLHttpRequest();
  request.addEventListener("load", () => { console.log("lol") });
  request.open("GET", `${baseUrl}/data/${city}`);
  request.responseType = "text";

  request.onload = async () => {
    if (request.readyState === request.DONE && request.status === 200) {
      const result = request.response;
      const json = JSON.parse(result);
      cb(json)
    }
  }

  request.send();
}


async function handleForecasts(city) {
  let temps = [];
  let precipitations = [];
  let windSpeeds = [];
  let cloudCoverage = [];

  getForecast((resp) => {
    resp.map((item) => {
      if (item.type == "cloud coverage") {
        cloudCoverage.push(CloudCoveragePrediction(item.time, item.type, item.to, item.from, item.unit, item.place))
      }
      if (item.type == "wind speed") {
        windSpeeds.push(WindPrediction(item.time, item.type, item.to, item.from, item.unit, item.pla));
      }
      if (item.type == "temperature") {
        temps.push(TemperaturePrediction(item.time, item.place, item.to, item.from, item.unit));
      }
      if (item.type == "precipitation") {
        precipitations.push(PrecipitationPrediction(item.time, item.precipitation_types[0], item.to, item.from, item.unit, item.place));

      }
    }
    );

    displayForecasts(temps, precipitations, windSpeeds, cloudCoverage);
  }, city)

}

//AverageWindSpeed


async function getMaxTemp(city) {
  getForecast((weatherData) => {
    let max = undefined;
    for (let x in weatherData) {
      let dataObj = weatherData[x];
      if (dataObj.type == "temperature") {
        let tmp = Temperature(dataObj.time, dataObj.place, dataObj.to, dataObj.type, dataObj.unit);
        tmp.convertToC();
        let to = tmp.getValue();

        if (max === undefined || to > max) {
          max = to;
        }
      }
    }
    return max;
  }, city);


}

async function getMinTemp(city) {
  getForecast((weatherData) => {
    let min = undefined;
    for (let x in weatherData) {
      let dataObj = weatherData[x];
      if (dataObj.type == "temperature") {
        let tmp = Temperature(dataObj.time, dataObj.place, dataObj.from, dataObj.type, dataObj.unit);
        tmp.convertToC();
        let from = tmp.getValue();
        if (min === undefined || from < min) {
          min = from;
        }
      }
    }
    return min;
  }, city);

}


async function getTotalPrecipitation(city) {
  getData((wd) => {
    let _totalprecipitation = 0;
    for (let i in wd) {
      let dataObj = wd[i];

      if (dataObj.type == "precipitation") {
        console.log("dataObj Avg Wind:", dataObj);
        let precipitationtemp = new precipitation(dataObj.time, dataObj.place, dataObj.value, dataObj.unit);
        precipitationtemp.convertToMM();
        let test = precipitationtemp.getValue();
        //console.log("Wind speed0", test)
        _totalprecipitation += test;
      }
    }
    console.log("Total precipitation for the last day ", _totalprecipitation);
    return _totalprecipitation;
  }, city);

}


async function getAverageWindSpeed(city) {
  let weatherData1 = await getData(city);
  let _totalWindSpeed = 0;
  let count = 0;
  for (let i in weatherData1) {
    let dataObj = weatherData1[i];
    //console.log("dataObj Avg Wind:", dataObj);
    if (dataObj.type == "wind speed") {
      let windtemp = new Wind(dataObj.time, dataObj.place, dataObj.value, dataObj.unit);
      windtemp.convertToMph();
      let test = windtemp.getValue();
      //console.log("Wind speed0", test)
      _totalWindSpeed += test;
      count++;
    }
  }

  let _averageWindSpeed = _totalWindSpeed / count;
  console.log("Avg ", _averageWindSpeed);
  return _averageWindSpeed;
}
