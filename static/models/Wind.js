import WeatherData from "./WeatherData";
function Wind(time, place, value, type, unit) {
  let weatherData = WeatherData(time, place, value, type, unit);
  const getDirection = () => {
    return "Aner det ikke";
  };

  const convertToMph = () => {
    if (unit !== "mph") {
      unit = "mph"
      value = value * 2.23694
    }
  };

  const convertToMs = () => {
    if (unit !== "m/s") {
      unit = "m/s"
      value = value / 2.23694
    }
  };
  return { convertToMph, convertToMs, getDirection, ...weatherData }
}

export default Wind



