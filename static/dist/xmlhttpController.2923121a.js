// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"models/Event.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function Event(time, place) {
  var getTime = function getTime() {
    return time;
  };
  var getPlace = function getPlace() {
    return place;
  };
  return {
    getPlace: getPlace,
    getTime: getTime
  };
}
var _default = Event;
exports.default = _default;
},{}],"models/WeatherData.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Event = _interopRequireDefault(require("./Event"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function WeatherData(time, type, value, unit, place) {
  var event = (0, _Event.default)(time, place);
  var getValue = function getValue() {
    return value;
  };
  var getType = function getType() {
    return type;
  };
  var getUnit = function getUnit() {
    return unit;
  };
  return _objectSpread({
    getType: getType,
    getUnit: getUnit,
    getValue: getValue
  }, event);
}
var _default = WeatherData;
exports.default = _default;
},{"./Event":"models/Event.js"}],"models/Temperature.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _WeatherData = _interopRequireDefault(require("./WeatherData"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function Temperature(time, place, value, type, unit) {
  var weatherdata = (0, _WeatherData.default)(time, type, value, unit, place);
  var convertToF = function convertToF() {
    if (unit !== "F") {
      unit = "F";
      value = value - 32 * 5 / 9;
    }
  };
  var convertToC = function convertToC() {
    if (unit !== "C") {
      unit = "C", value = value * 1.8 + 32;
    }
  };
  return _objectSpread({
    convertToC: convertToC,
    convertToF: convertToF
  }, weatherdata);
}
var _default = Temperature;
exports.default = _default;
},{"./WeatherData":"models/WeatherData.js"}],"models/Wind.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _WeatherData = _interopRequireDefault(require("./WeatherData"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function Wind(time, place, value, type, unit) {
  var weatherData = (0, _WeatherData.default)(time, place, value, type, unit);
  var getDirection = function getDirection() {
    return "Aner det ikke";
  };
  var convertToMph = function convertToMph() {
    if (unit !== "mph") {
      unit = "mph";
      value = value * 2.23694;
    }
  };
  var convertToMs = function convertToMs() {
    if (unit !== "m/s") {
      unit = "m/s";
      value = value / 2.23694;
    }
  };
  return _objectSpread({
    convertToMph: convertToMph,
    convertToMs: convertToMs,
    getDirection: getDirection
  }, weatherData);
}
var _default = Wind;
exports.default = _default;
},{"./WeatherData":"models/WeatherData.js"}],"models/Precipitation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _WeatherData = _interopRequireDefault(require("./WeatherData"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function prediction(time, place, value, type, unit) {
  var weatherData = (0, _WeatherData.default)(time, place, value, type, unit);
  var getPrecipitationType = function getPrecipitationType() {
    return type;
  };
  var convertToInches = function convertToInches() {
    if (unit !== "mm") {
      unit = "mm";
      value = value * 25.4;
    }
  };
  var convertToMM = function convertToMM() {
    if (unit === "in") {
      unit = "in";
      value = value / 25.4;
    }
  };
  return _objectSpread(_objectSpread({
    convertToMM: convertToMM,
    convertToInches: convertToInches
  }, weatherData), {}, {
    getPrecipitationType: getPrecipitationType
  });
}
var _default = prediction;
exports.default = _default;
},{"./WeatherData":"models/WeatherData.js"}],"models/WeatherPrediction.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Event = _interopRequireDefault(require("./Event"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function WeatherPrediction(time, type, max, min, unit, place) {
  var event = (0, _Event.default)(time, place);
  var matches = function matches(data) {
    var getTime = data.getTime,
      getPlace = data.getPlace,
      getValue = data.getValue,
      getType = data.getType,
      getUnit = data.getUnit;
    return getTime() === time && getPlace() === place && getValue() >= min && getValue() <= max && getType() === type && getUnit() === unit;
  };
  var getMax = function getMax() {
    return max;
  };
  var getMin = function getMin() {
    return min;
  };
  var getType = function getType() {
    return type;
  };
  var getUnit = function getUnit() {
    return unit;
  };
  //Return mangler en match forstår ikke lige hvad der skal ske
  return _objectSpread({
    matches: matches,
    getType: getType,
    getUnit: getUnit,
    getMax: getMax,
    getMin: getMin
  }, event);
}
var _default = WeatherPrediction;
exports.default = _default;
},{"./Event":"models/Event.js"}],"models/TemperaturePrediction.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _WeatherPrediction = _interopRequireDefault(require("./WeatherPrediction"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function TempraturePrediction(time, type, max, min, unit, place) {
  var weatherPrediction = (0, _WeatherPrediction.default)(time, type, max, min, unit, place);
  var getPrecipitationType = function getPrecipitationType() {
    return type;
  };
  var convertToF = function convertToF() {
    if (unit !== "F") {
      unit = "F";
      min = min - 32 * 5 / 9;
      max = max - 32 * 5 / 9;
    }
  };
  var convertToC = function convertToC() {
    if (unit !== "C") {
      unit = "C";
      min = min * 18 + 32;
      max = max * 18 + 32;
    }
  };
  return _objectSpread(_objectSpread({}, weatherPrediction), {}, {
    convertToF: convertToF,
    convertToC: convertToC
  });
}
var _default = TempraturePrediction;
exports.default = _default;
},{"./WeatherPrediction":"models/WeatherPrediction.js"}],"models/PrecipitationPrediction.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _WeatherPrediction = _interopRequireDefault(require("./WeatherPrediction"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function PredictionPrediction(time, type, max, min, unit, place) {
  var weatherPrediction = (0, _WeatherPrediction.default)(time, type, max, min, unit, place);
  var getPrecipitationType = function getPrecipitationType() {
    return type;
  };
  var convertToInches = function convertToInches() {
    if (unit !== "mm") {
      unit = "mm";
      min = min * 25.4;
      max = max * 25.4;
    }
  };
  var convertToMM = function convertToMM() {
    if (unit !== "in") {
      unit = "in";
      min = min / 25.4;
      max = max / 25.4;
    }
  };
  return _objectSpread(_objectSpread({}, weatherPrediction), {}, {
    convertToInches: convertToInches,
    convertToMM: convertToMM
  });
}
var _default = PredictionPrediction;
exports.default = _default;
},{"./WeatherPrediction":"models/WeatherPrediction.js"}],"models/WindPrediction.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _WeatherPrediction = _interopRequireDefault(require("./WeatherPrediction"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function WindPrediction(time, type, max, min, unit, place) {
  var weatherPrediction = (0, _WeatherPrediction.default)(time, type, max, min, unit, place);
  var getDirection = function getDirection() {
    return "Aner det ikke";
  };

  //to MPH
  var convertToMphPrediction = function convertToMphPrediction() {
    if (_unit !== "mph") {
      _min = _min * 2.23694;
      _max = _max * 2.23694;
      _unit = "mph";
    }
  };

  // to m/s
  var convertToMsPrediction = function convertToMsPrediction() {
    if (_unit !== "m/s") {
      _min = _min / 2.23694;
      _max = _max / 2.23694;
      _unit = "m/s";
    }
  };
  return _objectSpread({
    convertToMphPrediction: convertToMphPrediction,
    convertToMsPrediction: convertToMsPrediction,
    getDirection: getDirection
  }, weatherPrediction);
}
var _default = WindPrediction;
exports.default = _default;
},{"./WeatherPrediction":"models/WeatherPrediction.js"}],"displaystuff.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayAverageWindSpeed = displayAverageWindSpeed;
exports.displayForecasts = displayForecasts;
exports.displayLatestPrecipitation = displayLatestPrecipitation;
exports.displayLatestTemperature = displayLatestTemperature;
exports.displayLatestWindSpeed = displayLatestWindSpeed;
exports.displayMaxTemp = displayMaxTemp;
exports.displayMinTemp = displayMinTemp;
exports.displayTotalPrecipitation = displayTotalPrecipitation;
function displayForecasts(tempratures, precipitation, windSpeeds, cloudCoverage) {
  var table = document.getElementById("tempTable");
  table.innerHTML = "";
  table.innerHTML = "<tr><th>Date</th><th>Temprature</th></tr>";
  tempratures.forEach(function (temp) {
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    var date = new Date(temp.getTime());
    cell.textContent = "".concat(date.getMonth() + 1, "/").concat(date.getDate(), "/").concat(date.getFullYear(), " - ").concat(date.getHours(), ":").concat(date.getMinutes());
    var cellTemp = document.createElement("td");
    cellTemp.textContent = "".concat(temp.getMin(), " to ").concat(temp.getMax(), " ").concat(temp.getUnit());
    row.appendChild(cell);
    row.appendChild(cellTemp);
    table.appendChild(row);
  });
  var precipitationTable = document.getElementById("precipitationTable");
  precipitationTable.innerHTML = "";
  precipitationTable.innerHTML = "<tr><th>Date</th><th>Precipitation</th></tr>";
  precipitation.map(function (precip) {
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    var date = new Date(precip.getTime());
    cell.textContent = "".concat(date.getMonth() + 1, "/").concat(date.getDate(), "/").concat(date.getFullYear(), " - ").concat(date.getHours(), ":").concat(date.getMinutes());
    var cellData = document.createElement("td");
    cellData.textContent = "".concat(precip.getMin(), " to ").concat(precip.getMax(), " ").concat(precip.getUnit(), " ").concat(precip.getType());
    row.appendChild(cell);
    row.appendChild(cellData);
    precipitationTable.appendChild(row);
  });
  var windtable = document.getElementById("windTable");
  windtable.innerHTML = "";
  windtable.innerHTML = "<tr><th>Date</th><th>Wind Speeds</th></tr>";
  windSpeeds.map(function (wind) {
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    var date = new Date(wind.getTime());
    cell.textContent = "".concat(date.getMonth() + 1, "/").concat(date.getDate(), "/").concat(date.getFullYear(), " - ").concat(date.getHours(), ":").concat(date.getMinutes());
    var cellData = document.createElement("td");
    cellData.textContent = "".concat(wind.getMin(), " to ").concat(wind.getMax(), " ").concat(wind.getUnit(), " ").concat(wind.getType());
    row.appendChild(cell);
    row.appendChild(cellData);
    windtable.appendChild(row);
  });
  var cloudTable = document.getElementById("cloudTable");
  cloudTable.innerHTML = "";
  cloudTable.innerHTML = "<tr><th>Date</th><th>Cloud coverage</th></tr>";
  cloudCoverage.map(function (cloud) {
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    var date = new Date(cloud.getTime());
    cell.textContent = "".concat(date.getMonth() + 1, "/").concat(date.getDate(), "/").concat(date.getFullYear(), " - ").concat(date.getHours(), ":").concat(date.getMinutes());
    var cellData = document.createElement("td");
    cellData.textContent = "".concat(cloud.getMin(), " to ").concat(cloud.getMax(), " ").concat(cloud.getUnit(), " ").concat(cloud.getType());
    row.appendChild(cell);
    row.appendChild(cellData);
    cloudTable.appendChild(row);
  });
}
function displayMaxTemp(temp) {
  var div = document.getElementById("maxTemp");
  div.innerHTML = "";
  var title = document.createElement("h4");
  title.innerHTML = "Max Temp";
  var table = document.createElement("table");
  var row = document.createElement("tr");
  var cell = document.createElement("td");
  cell.innerHTML = temp;
  row.appendChild(cell);
  table.appendChild(row);
  div.appendChild(title);
  div.appendChild(table);
}
function displayMinTemp(temp) {
  var div = document.getElementById("minTemp");
  div.innerHTML = "";
  var title = document.createElement("h4");
  title.innerHTML = "Min Temp";
  var table = document.createElement("table");
  var row = document.createElement("tr");
  var cell = document.createElement("td");
  cell.innerHTML = temp;
  row.appendChild(cell);
  table.appendChild(row);
  div.appendChild(title);
  div.appendChild(table);
}
function displayTotalPrecipitation(TotalPrecipitation) {
  var div = document.getElementById("TotalPrecipitation");
  div.innerHTML = "";
  var title = document.createElement("h4");
  title.innerHTML = "Down Bør";
  var table = document.createElement("table");
  var row = document.createElement("tr");
  var cell = document.createElement("td");
  cell.innerHTML = "".concat(TotalPrecipitation, " mm");
  row.appendChild(cell);
  table.appendChild(row);
  div.appendChild(title);
  div.appendChild(table);
}
function displayLatestTemperature(temp) {
  displayLatestMeasurement("latestTemperature", "Max Temperature", temp);
}
function displayLatestPrecipitation(precip) {
  displayLatestMeasurement("latestPrecipitation", "Latest Precipitation", precip);
}
function displayLatestWindSpeed(windSpeed) {
  displayLatestMeasurement("latestWindSpeed", "Latest Wind Speed", windSpeed);
}
function displayLatestMeasurement(divId, titleText, value) {
  var div = document.getElementById(divId);
  div.innerHTML = "";
  var title = document.createElement("h4");
  title.innerHTML = titleText;
  var table = document.createElement("table");
  var row = document.createElement("tr");
  var cell = document.createElement("td");
  cell.innerHTML = value;
  row.appendChild(cell);
  table.appendChild(row);
  div.appendChild(title);
  div.appendChild(table);
}
function displayAverageWindSpeed(averageSpeed) {
  var div = document.getElementById("avgWind");
  div.innerHTML = "";
  var title = document.createElement("h4");
  title.innerHTML = "Average Wind Speed today";
  var table = document.createElement("table");
  var row = document.createElement("tr");
  var cell = document.createElement("td");
  cell.innerHTML = "".concat(averageSpeed, " mph"); //average speed
  row.appendChild(cell);
  table.appendChild(row);
  div.appendChild(title);
  div.appendChild(table);
}
},{}],"../node_modules/xhr2/lib/browser.js":[function(require,module,exports) {
module.exports = XMLHttpRequest;
},{}],"xmlhttpController.js":[function(require,module,exports) {
"use strict";

var _WeatherData = _interopRequireDefault(require("./models/WeatherData.js"));
var _Temperature = _interopRequireDefault(require("./models/Temperature.js"));
var _Wind = _interopRequireDefault(require("./models/Wind.js"));
var _Precipitation = _interopRequireDefault(require("./models/Precipitation.js"));
var _TemperaturePrediction = _interopRequireDefault(require("./models/TemperaturePrediction.js"));
var _PrecipitationPrediction = _interopRequireDefault(require("./models/PrecipitationPrediction.js"));
var _WindPrediction = _interopRequireDefault(require("./models/WindPrediction.js"));
var _displaystuff = require("./displaystuff.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var XMLHttpRequest = require('xhr2');
var xhr = new XMLHttpRequest();
var baseUrl = "http://localhost:8080";
$('.forecastbtn').click( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  var thebuttonclicked, city;
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        thebuttonclicked = $(this).attr("value");
        handleForecasts(thebuttonclicked);
        city = "".concat(thebuttonclicked);
        getMaxTemp(city);
        getMinTemp(city);
        getAverageWindSpeed(city);
        getTotalPrecipitation(city);
      case 7:
      case "end":
        return _context.stop();
    }
  }, _callee, this);
})));
function getForecast(_x, _x2) {
  return _getForecast.apply(this, arguments);
}
function _getForecast() {
  _getForecast = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(cb, city) {
    var request;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          request = new XMLHttpRequest();
          request.addEventListener("load", function () {
            console.log("lol");
          });
          request.open("GET", "".concat(baseUrl, "/forecast/").concat(city));
          request.responseType = "text";
          request.onload = function () {
            if (request.readyState === request.DONE && request.status === 200) {
              var result = request.response;
              var json = JSON.parse(result);
              cb(json);
            }
          };
          request.send();
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _getForecast.apply(this, arguments);
}
function getData(_x3, _x4) {
  return _getData.apply(this, arguments);
}
function _getData() {
  _getData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(cb, city) {
    var request;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          request = new XMLHttpRequest();
          request.addEventListener("load", function () {
            console.log("lol");
          });
          request.open("GET", "".concat(baseUrl, "/data/").concat(city));
          request.responseType = "text";
          request.onload = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
            var result, json;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  if (request.readyState === request.DONE && request.status === 200) {
                    result = request.response;
                    json = JSON.parse(result);
                    cb(json);
                  }
                case 1:
                case "end":
                  return _context3.stop();
              }
            }, _callee3);
          }));
          request.send();
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _getData.apply(this, arguments);
}
function handleForecasts(_x5) {
  return _handleForecasts.apply(this, arguments);
} //AverageWindSpeed
function _handleForecasts() {
  _handleForecasts = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(city) {
    var temps, precipitations, windSpeeds, cloudCoverage;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          temps = [];
          precipitations = [];
          windSpeeds = [];
          cloudCoverage = [];
          getForecast(function (resp) {
            resp.map(function (item) {
              if (item.type == "cloud coverage") {
                cloudCoverage.push((0, _WindPrediction.default)(item.time, item.type, item.to, item.from, item.unit, item.place));
              }
              if (item.type == "wind speed") {
                windSpeeds.push((0, _WindPrediction.default)(item.time, item.type, item.to, item.from, item.unit, item.pla));
              }
              if (item.type == "temperature") {
                temps.push((0, _TemperaturePrediction.default)(item.time, item.place, item.to, item.from, item.unit));
              }
              if (item.type == "precipitation") {
                precipitations.push((0, _PrecipitationPrediction.default)(item.time, item.precipitation_types[0], item.to, item.from, item.unit, item.place));
              }
            });
            (0, _displaystuff.displayForecasts)(temps, precipitations, windSpeeds, cloudCoverage);
          }, city);
        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _handleForecasts.apply(this, arguments);
}
function getMaxTemp(_x6) {
  return _getMaxTemp.apply(this, arguments);
}
function _getMaxTemp() {
  _getMaxTemp = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(city) {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          getForecast(function (weatherData) {
            var max = undefined;
            for (var x in weatherData) {
              var dataObj = weatherData[x];
              if (dataObj.type == "temperature") {
                var tmp = (0, _Temperature.default)(dataObj.time, dataObj.place, dataObj.to, dataObj.type, dataObj.unit);
                tmp.convertToC();
                var to = tmp.getValue();
                if (max === undefined || to > max) {
                  max = to;
                }
              }
            }
            (0, _displaystuff.displayMaxTemp)(max);
          }, city);
        case 1:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _getMaxTemp.apply(this, arguments);
}
function getMinTemp(_x7) {
  return _getMinTemp.apply(this, arguments);
}
function _getMinTemp() {
  _getMinTemp = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(city) {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          getForecast(function (weatherData) {
            var min = undefined;
            for (var x in weatherData) {
              var dataObj = weatherData[x];
              if (dataObj.type == "temperature") {
                var tmp = (0, _Temperature.default)(dataObj.time, dataObj.place, dataObj.from, dataObj.type, dataObj.unit);
                tmp.convertToC();
                var from = tmp.getValue();
                if (min === undefined || from < min) {
                  min = from;
                }
              }
            }
            (0, _displaystuff.displayMinTemp)(min);
          }, city);
        case 1:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _getMinTemp.apply(this, arguments);
}
function getTotalPrecipitation(_x8) {
  return _getTotalPrecipitation.apply(this, arguments);
}
function _getTotalPrecipitation() {
  _getTotalPrecipitation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(city) {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          getData(function (wd) {
            var _totalprecipitation = 0;
            for (var i in wd) {
              var dataObj = wd[i];
              if (dataObj.type == "precipitation") {
                console.log("dataObj Avg Wind:", dataObj);
                var precipitationtemp = new _Precipitation.default(dataObj.time, dataObj.place, dataObj.value, dataObj.unit);
                precipitationtemp.convertToMM();
                var test = precipitationtemp.getValue();
                //console.log("Wind speed0", test)
                _totalprecipitation += test;
              }
            }
            (0, _displaystuff.displayTotalPrecipitation)(_totalprecipitation);
          }, city);
        case 1:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _getTotalPrecipitation.apply(this, arguments);
}
function getAverageWindSpeed(_x9) {
  return _getAverageWindSpeed.apply(this, arguments);
}
function _getAverageWindSpeed() {
  _getAverageWindSpeed = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(city) {
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          getData(function (weatherData1) {
            var _totalWindSpeed = 0;
            var count = 0;
            for (var i in weatherData1) {
              var dataObj = weatherData1[i];
              //console.log("dataObj Avg Wind:", dataObj);
              if (dataObj.type == "wind speed") {
                var windtemp = new _Wind.default(dataObj.time, dataObj.place, dataObj.value, dataObj.unit);
                windtemp.convertToMph();
                var test = windtemp.getValue();
                //console.log("Wind speed0", test)
                _totalWindSpeed += test;
                count++;
              }
            }
            var _averageWindSpeed = _totalWindSpeed / count;
            (0, _displaystuff.displayAverageWindSpeed)(_averageWindSpeed);
          }, city);
        case 1:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return _getAverageWindSpeed.apply(this, arguments);
}
},{"./models/WeatherData.js":"models/WeatherData.js","./models/Temperature.js":"models/Temperature.js","./models/Wind.js":"models/Wind.js","./models/Precipitation.js":"models/Precipitation.js","./models/TemperaturePrediction.js":"models/TemperaturePrediction.js","./models/PrecipitationPrediction.js":"models/PrecipitationPrediction.js","./models/WindPrediction.js":"models/WindPrediction.js","./displaystuff.js":"displaystuff.js","xhr2":"../node_modules/xhr2/lib/browser.js"}],"../../../../Users/andre/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52492" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../../Users/andre/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","xmlhttpController.js"], null)
//# sourceMappingURL=/xmlhttpController.2923121a.js.map