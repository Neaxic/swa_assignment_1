import WeatherPrediction from "./WeatherPrediction";

function PredictionPrediction(time, type, max, min, unit, place) {
    let weatherPrediction = WeatherPrediction(time, type, max, min, unit, place);

    const getPrecipitationType = () => type;

    const convertToInches = () => {
        if (unit !== "mm") {
            unit = "mm";
            min = min * 25.4
            max = max * 25.4
        }
    };

    const convertToMM = () => {
        if (unit !== "in") {
            unit = "in";
            min = min / 25.4;
            max = max / 25.4;
        }
    };

    return {
        ...weatherPrediction, convertToInches, convertToMM
    };
}

export default PredictionPrediction;
