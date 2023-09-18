import WeatherData from "./models/WeatherData.js";
import Temperature from "./models/Temperature.js";
import Wind from "./models/Wind.js"
import precipitation from "./models/Precipitation.js";
import TemperaturePrediction from "./models/TemperaturePrediction.js";
import PrecipitationPrediction from "./models/PrecipitationPrediction.js";
import WindPrediction from "./models/WindPrediction.js";
import CloudCoveragePrediction from "./models/WindPrediction.js";
import { displayForecasts, displayMinTemp, displayMaxTemp, displayAverageWindSpeed, displayTotalPrecipitation } from "./displaystuff.js";

import proxyGetForecast from "./networkController.js";

$(document).ready(function () { //FOR TESTING

});

$('.forecastbtn').click(async function () {
  var thebuttonclicked = $(this).attr("value");
  var response = await getForecast(`${thebuttonclicked}`);

  handleForecasts(thebuttonclicked)
  // console.log("Haj");

  // getMinTemp(`${thebuttonclicked}`);
  // convertToObject(response)
  let city = `${thebuttonclicked}`;

  let max = await getMaxTemp(city)
  let min = await getMinTemp(city)
  let avg = await getAverageWindSpeed(city);
  let precipition = await getTotalPrecipitation(city)
  displayMaxTemp(max);
  displayMinTemp(min);
  displayAverageWindSpeed(avg);
  displayTotalPrecipitation(precipition);

  console.log("Diller")
  let jsonObject = WeatherData("2019-07-30T10:07:00.000Z", "temperature", 21, "C", "Aarhus");
  let responseFromPost = await postData(jsonObject)
  console.log(responseFromPost)


  //var minTemp = await getMinTemp(`${thebuttonclicked}`)
  //console.log("Min: " + minTemp)
  //var maxTemp = await getMaxTemp(`${thebuttonclicked}`)
  //console.log("Max: " + maxTemp)
  // console.log(getForecast(`${thebuttonclicked}`));
  /* $.ajax({
     url: `http://localhost:8080/forecast/${thebuttonclicked}`,
     method: "GET",
     dataType: "json", // Expected response data type
     success: function(data) {
       //NEXT 24 HOURS IN x CITY
       console.log("Response Data:", data);

       $("#nextForecast").text("Next forecast in " + thebuttonclicked);
       $("#nextForecastFrom").text(data[0].type + ": from " + data[0].from + data[0].unit + " to " + data[0].to + data[0].unit);

       console.log(data[0].type);
       console.log(data[0].from);
       console.log(data[0].to);
       console.log(data[0].unit);
       console.log(data[0].time);
     },
     error: function(xhr, status, error) {
       console.error("AJAX Error:", status, error);
     }
   });*/
});

async function getData(city) {
  let url = `http://localhost:8080/data/${city}`;
  try {
    let response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getForecast(city) {
  let url = `http://localhost:8080/forecast/${city}`;
  try {
    let response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}


async function handleForecasts(city) {
  let temps = [];
  let precipitations = [];
  let windSpeeds = [];
  let cloudCoverage = [];

  let resp = await getForecast(city)

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

  console.log("fetch: ", cloudCoverage)

  displayForecasts(temps, precipitations, windSpeeds, cloudCoverage);
}

//AverageWindSpeed


async function getMaxTemp(city) {
  let weatherData = await getForecast(city);

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

}

async function getMinTemp(city) {
  let weatherData = await getForecast(city);

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
}


async function getTotalPrecipitation(city) {
  let wd = await getData(city);
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



/*
"type": "temperature",
  "time": "2019-07-30T10:07:00.000Z",
  "place": "Aarhus",
  "value": 21,
  "unit": "C"}, */
async function postData(jsonObject) {
  let url = 'http://localhost:8080/data';
  console.log(JSON.stringify(jsonObject));
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify that you're sending JSON data
      },
      body: JSON.stringify(jsonObject), // Convert the JavaScript object to a JSON string
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}