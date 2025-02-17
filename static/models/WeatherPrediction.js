import Event from "./Event";

function WeatherPrediction(time, type, max, min, unit, place) {
  let event = Event(time, place);

  const matches = (data) => {
    const { getTime, getPlace, getValue, getType, getUnit } = data;
    return getTime() === time &&
      getPlace() === place &&
      getValue() >= min &&
      getValue() <= max &&
      getType() === type &&
      getUnit() === unit;
  };


  const getMax = () => max;

  const getMin = () => min;

  const getType = () => type;

  const getUnit = () => unit;
  //Return mangler en match forstår ikke lige hvad der skal ske
  return { matches, getType, getUnit, getMax, getMin, ...event };
}

export default WeatherPrediction;