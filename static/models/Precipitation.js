import WeatherData from "./WeatherData";

function prediction(time, place, value, type, unit) {
    let weatherData = WeatherData(time, place, value, type, unit);

    const getPrecipitationType = () => type; 

    const convertToInches = () => {
        if (unit === "mm") {
            unit = "in";
            value = value / 25.4; 
        }
    };

    const convertToMM = () => {
        if (unit === "in") {
            unit = "mm";
            value = value * 25.4; 
        }
    };

    return {
        convertToMM,
        convertToInches,
        ...weatherData,
        getPrecipitationType
    };
}

export default prediction;
