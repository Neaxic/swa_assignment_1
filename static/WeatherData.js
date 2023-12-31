import Event from "./Event";

function WeatherData(time, type, value, unit, place) {
  let event = Event(time, place);

  const getValue = () => value;
  const getType = () => type;
  const getUnit = () => unit;

  return { getType, getUnit, getValue, event };
}

export default WeatherData;
