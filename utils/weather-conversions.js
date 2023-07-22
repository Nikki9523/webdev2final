export const weatherConversions = {
    convertCeslsiusToFahrenheit(temperature){
        return (temperature * 9/5) + 32;
    },
    weatherCodeConverter(weatherCode){
        let output;
        switch (weatherCode){
            case 100:
              output = "Clear";
              break;
            case 200:
              output = "Partial clouds";
              break;
            case 300:
              output = "Cloudy";
              break;
            case 400:
              output = "Light Showers";
              break;
            case 500:
              output = "Heavy Showers";
              break;
            case 600:
              output = "Rain";
              break;
            case 700:
              output = "Snow";
              break;
            case 800:
              output = "Thunder";
              break;
            default:
              output = "Invalid value";
              break;
    }
    return output;
},
  
beaufortCode(windKmPerHour) {
  if (windKmPerHour > 1 && windKmPerHour <= 5) {
    return 1;
  } else if (windKmPerHour > 5 && windKmPerHour <= 11) {
    return 2;
  } else if (windKmPerHour > 11 && windKmPerHour <= 19) {
    return 3;
  } else if (windKmPerHour > 20 && windKmPerHour <= 28) {
    return 4;
  } else if (windKmPerHour > 28 && windKmPerHour <= 38) {
    return 5;
  } else if (windKmPerHour > 38 && windKmPerHour <= 49) {
    return 6;
  } else if (windKmPerHour > 49 && windKmPerHour <= 61) {
    return 7;
  } else if (windKmPerHour > 61 && windKmPerHour <= 74) {
    return 8;
  } else if (windKmPerHour > 74 && windKmPerHour <= 88) {
    return 9;
  } else if (windKmPerHour > 88 && windKmPerHour <= 102) {
    return 10;
  } else if (windKmPerHour > 102 && windKmPerHour <= 117) {
    return 11;
  } else {
    return 0;
  }
},

beaufortConversion(beaufortCode) {
  let label = null;
  switch (beaufortCode) {
    case 0:
      label = "Calm";
      break;
    case 1:
      label = "Light Air";
      break;
    case 2:
      label = "Light Breeze";
      break;
    case 3:
      label = "Gentle Breeze";
      break;
    case 4:
      label = "Moderate Breeze";
      break;
    case 5:
      label = "Fresh Breeze";
      break;
    case 6:
      label = "Strong Breeze";
      break;
    case 7:
      label = "Near Gale";
      break;
    case 8:
      label = "Gale";
      break;
    case 9:
      label = "Severe Gale";
      break;
    case 10:
      label = "Strong storm";
      break;
    case 11:
      label = "Violent Storm";
      break;
    default:
      label = "err";
      break;
  }
  return label;
},

windDirection(degree360) {
  if ((degree360 > 348.75 && degree360 <= 360) || (degree360 >= 0 && degree360 <= 11.25)) {
    return "N";
  } else if (degree360 > 11.25 && degree360 <= 33.75) {
    return "NNE";
  } else if (degree360 >= 33.75 && degree360 <= 56.25) {
    return "NE";
  } else if (degree360 >= 56.25 && degree360 <= 78.75) {
    return "ENE";
  } else if (degree360 >= 78.75 && degree360 <= 101.25) {
    return "E";
  } else if (degree360 >= 101.25 && degree360 <= 123.75) {
    return "ESE";
  } else if (degree360 >= 123.75 && degree360 <= 146.25) {
    return "SE";
  } else if (degree360 >= 146.25 && degree360 <= 168.75) {
    return "SSE";
  } else if (degree360 >= 168.75 && degree360 <= 191.25) {
    return "S";
  } else if (degree360 >= 191.25 && degree360 <= 213.75) {
    return "SSW";
  } else if (degree360 >= 213.75 && degree360 <= 236.25) {
    return "SW";
  } else if (degree360 >= 236.25 && degree360 <= 258.75) {
    return "WSW";
  } else if (degree360 >= 258.75 && degree360 <= 281.25) {
    return "W";
  } else if (degree360 >= 281.25 && degree360 <= 303.75) {
    return "WNW";
  } else if (degree360 >= 303.75 && degree360 <= 326.25) {
    return "NW";
  } else if (degree360 >= 326.25 && degree360 <= 348.75) {
    return "NNW";
  }
  return "err";

},

windChill(temperatureCelsius, windSpeed) {
 const velocityPow = Math.pow(windSpeed, 0.16);
  const windChill = 13.12 + 0.6215 * temperatureCelsius - 11.37 * velocityPow + 0.3965 * temperatureCelsius * velocityPow;
  return Math.round(windChill * 100) / 100;
}
};