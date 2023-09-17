import WeatherData from "./WeatherData";
function Temperature(time, place, value, type, unit) {
    let weatherdata = WeatherData(time, type, value, unit, place);

    const convertToF = () => {
        if (unit !== "F") {
            unit = "F";

            value = value - 32 * 5 / 9;

        }
    };

    const convertToC = () => {
        if (unit !== "C") {
            unit = "C",
                value = value * 1.8 + 32;
        }
    };

    return { convertToC, convertToF, ...weatherdata };
}

export default Temperature
