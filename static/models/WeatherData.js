import Event from "./Event";
//Det her er en factory
function WeatherData(time, type, value, unit, place) {
  let event = Event(time, place);

  const getValue = () => value;
  const getType = () => type;
  const getUnit = () => unit;

  return { getType, getUnit, getValue, ...event };
}

export default WeatherData;
