import WeatherData from "./models/WeatherData.js";
import Temperature from "./models/Temperature.js";
import TemperaturePrediction from "./models/TemperaturePrediction.js";
import PrecipitationPrediction from "./models/PrecipitationPrediction.js";
import WindPrediction from "./models/WindPrediction.js";
import { displayForecasts, displayMaxTemp } from "./displaystuff.js";

$('.forecastbtn').click(async function () {
  var thebuttonclicked = $(this).attr("value");
  var response = await getForecast(`${thebuttonclicked}`);
  console.log(response);

  handleForecasts(thebuttonclicked)
  // console.log("Haj");

  // getMinTemp(`${thebuttonclicked}`);
  // convertToObject(response)
  let max = await getMaxTemp(`${thebuttonclicked}`)
  displayMaxTemp(max);
  console.log("max: " + max);

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

async function getForecast(city) {
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
  let winds = [];

  let resp = await getForecast(city)

  resp.map((item) => {
    switch (item.type) {
      case "temperature": {
        temps.push(TemperaturePrediction(item.time, item.place, item.to, item.from, item.unit));
        break;
      }
      case "precipitation": {
        // precipitations.push(PrecipitationPrediction(item.time, item.place, item.to, item.from, item.precipitations_types[0], item.unit, item.precipitations_types));
      }
      case "wind speed": {
        winds.push(WindPrediction(item.time, item.place, item.to, item.from, item.unit));
      }
      case "cloud coverage": {

      }
      default: {
        break;
      }
    }
  });

  displayForecasts(temps, precipitations, winds);
}

//AverageWindSpeed


async function getMaxTemp(city) {
  let weatherData = await getForecast(city);

  let max = undefined;
  for (let x in weatherData) {
    let dataObj = weatherData[x];
    if (dataObj.type == "temperature") {
      let tmp = new Temperature(dataObj.time, dataObj.place, dataObj.to, dataObj.type, dataObj.unit);
      tmp.convertToC();
      let to = tmp.getValue();

      if (max === undefined || to > max) {
        max = to;
      }
    }
  }
  return max;

}




//async function getAverageWindSpeed(city) {
//let weatherData = await getForecast(city);

//let max = -99;
//for (x in weatherData) {
// x = weatherData[x];
//tmp = Temperature(x.time, x.place, x.value, x.type, unit)

// let to = weatherData[x].to;
// if (to > tmp.to) {
//  max = tmp.to;
// }
//}
//return max;

//}




