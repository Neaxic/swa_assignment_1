import WeatherPrediction from "./WeatherPrediction";

function TempraturePrediction(time, type, max, min, unit, place) {
    let weatherPrediction = WeatherPrediction(time, type, max, min, unit, place);

    const getPrecipitationType = () => type;

    const convertToF = () => {
        if (unit !== "F") {
            unit = "F";
            min = min - 32 * 5 / 9
            max = max - 32 * 5 / 9
        }
    };

    const convertToC = () => {
        if (unit !== "C") {
            unit = "C";
            min = min * 18 + 32;
            max = max * 18 + 32;
        }
    };

    return {
        ...weatherPrediction, convertToF, convertToC
    };
}

export default TempraturePrediction;
