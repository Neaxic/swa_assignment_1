import { temperature } from "../model";

async function getMinTemp(city) {
    let weatherData = await getForecast(city);
    console.log(weatherData);
    let min = -99;
    for (x in weatherData) {
     var temp = temperature(5,5);
     console.log(temp.convertToF(5));
  
   
      let from = weatherData[x].from;
      if(from < min) {
        min = from;
      }
    }
    return min;
  
  }