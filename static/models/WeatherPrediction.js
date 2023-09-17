import Event from "./Event";

function WeatherPrediction(time, type, max, min, unit, place) {
    let event = Event(time, place);
  
//Mangler Match

    const getMax = () => max;

    const getMin = () => min;
  
    const getType = () => type;
  
    const getUnit = () => unit;
  //Return mangler en match forstår ikke lige hvad der skal ske
    return { getType, getUnit, getMax, getMin, event };
  }
  
  export default WeatherPrediction;