import WeatherData from "./WeatherData";
function Temperature (time,place,value,type,unit) {
    let weatherdata = WeatherData(time, type, value, unit, place);

    const convertToF = (value) => {
        if (unit === "C") {
            unit = "F"
            value =  value * 1.8 + 32;
        }
    };

    const convertToC = (value) => {
        if (unit === "F") {
            value = value - 32 * 5/9;
        }
    };

    return {convertToC, convertToF, ...weatherdata};
}

export default Temperature
