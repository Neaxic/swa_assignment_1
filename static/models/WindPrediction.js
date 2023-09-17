import WeatherPrediction from "./WeatherPrediction";
function WindPrediction(time, type, max, min, unit, place) {
    let weatherPrediction = WeatherPrediction(time, type, max, min, unit, place);
    const getDirection = () => {
        return "Aner det ikke";
    };

    //to MPH
    const convertToMphPrediction = () => {
        if (_unit !== "mph") {
            _min = _min * 2.23694;
            _max = _max * 2.23694;
            _unit = "mph";
        }
    };

    // to m/s
    const convertToMsPrediction = () => {
        if (_unit !== "m/s") {
            _min = _min / 2.23694;
            _max = _max / 2.23694;
            _unit = "m/s";
        }
    };
    return { convertToMphPrediction, convertToMsPrediction, getDirection, ...weatherPrediction }
}

export default WindPrediction