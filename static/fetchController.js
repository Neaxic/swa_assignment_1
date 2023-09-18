import WeatherData from "./models/WeatherData.js";
import Temperature from "./models/Temperature.js";
import Wind from "./models/Wind.js"
import precipitation from "./models/Precipitation.js";
import TemperaturePrediction from "./models/TemperaturePrediction.js";
import PrecipitationPrediction from "./models/PrecipitationPrediction.js";
import WindPrediction from "./models/WindPrediction.js";
import CloudCoveragePrediction from "./models/WindPrediction.js";
import { displayForecasts, displayMinTemp, displayMaxTemp, displayAverageWindSpeed, displayTotalPrecipitation } from "./displaystuff.js";

$('#sendbutton').click(async function () {
  //Imaginary input from user
  let jsonObject = WeatherData("2019-07-30T10:07:00.000Z", "temperature", 21, "C", "Aarhus");
  let responseFromPost = await postData(jsonObject)
  console.log(responseFromPost)
});

$('.forecastbtn').click(async function () {
  var thebuttonclicked = $(this).attr("value");
  var response = await getForecast(`${thebuttonclicked}`);

  handleForecasts(thebuttonclicked)

  let city = `${thebuttonclicked}`;

  let max = await getMaxTemp(city)
  displayMaxTemp(max);
  let min = await getMinTemp(city)
  displayMinTemp(min);
  let avg = await getAverageWindSpeed(city);
  displayAverageWindSpeed(avg);
  let precipition = await getTotalPrecipitation(city)
  displayTotalPrecipitation(precipition);
  let last = await getLasestMeasurements(city)


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



async function getLasestMeasurements(city) {
  let weatherData = await getData(city);

  let latestTemperature;
  let latestPrecipitation;
  let latestWindSpeed;

  for (let i in weatherData) {
    let dataObj = weatherData[i];

    if (dataObj.type === "temperature") {
      let temp = new Temperature(dataObj.time, dataObj.place, dataObj.value, dataObj.unit);

      temp.convertToCelsius();
      latestTemperature = temp;
      console.log("latestTemperature", latestTemperature)
    }

    if (dataObj.type === "precipitation") {
      let precip = new Precipitation(dataObj.time, dataObj.place, dataObj.value, dataObj.unit);
      precip.convertToMM();
      latestPrecipitation = precip;
      console.log("latestPrecipitation", latestPrecipitation)
    }

    if (dataObj.type === "wind speed") {
      let wind = new Wind(dataObj.time, dataObj.place, dataObj.value, dataObj.unit);
      wind.convertToMph();
      latestWindSpeed = wind;
      console.log("latestWindSpeed", latestWindSpeed)
    }
  }

  return {
    latestTemperature,
    latestPrecipitation,
    latestWindSpeed,
  };
}


async function getTotalPrecipitation(city) {
  let wd = await getData(city);
  let _totalprecipitation = 0;

  for (let i in wd) {
    let dataObj = wd[i];

    if (dataObj.type == "precipitation") {
      let precipitationtemp = new precipitation(dataObj.time, dataObj.place, dataObj.value, dataObj.unit);
      precipitationtemp.convertToMM();
      let test = precipitationtemp.getValue();
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
    if (dataObj.type == "wind speed") {
      let windtemp = new Wind(dataObj.time, dataObj.place, dataObj.value, dataObj.unit);
      windtemp.convertToMph();
      let test = windtemp.getValue();
      _totalWindSpeed += test;
      count++;
    }
  }

  let _averageWindSpeed = _totalWindSpeed / count;
  console.log("Avg ", _averageWindSpeed);
  return _averageWindSpeed;
}

async function postData(jsonObject) {
  let url = 'http://localhost:8080/data';
  //Bad method to covert to JSON, but couldnt make JSON.Stringfy work
  const jsonObject2 = {
    type: jsonObject.getType(),
    time: jsonObject.getTime(),
    place: jsonObject.getPlace(),
    value: jsonObject.getValue(),
    unit: jsonObject.getUnit()
  };
  let jsonString = JSON.stringify(jsonObject2);
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonString,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}






