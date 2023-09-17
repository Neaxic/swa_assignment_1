import WeatherData from "./WeatherData";
function Wind (unit,value)
{
let weatherData = WeatherData(time, place, value, type, unit);
const getDirection = () => {
    return "Aner det ikke";
  };
  
  const convertToMph = (value,unit) => {
    if(unit === "mph"){
    unit ="mph"
    value = value/2.23694
}
  };
  
  const convertToMs = (value,unit) => {
    if (unit === "m/s"){
        unit ="m/s"
        value = value * 2.23694
    }
  };
return {convertToMph,convertToMs,getDirection,...weatherData}
}

export default Wind



  