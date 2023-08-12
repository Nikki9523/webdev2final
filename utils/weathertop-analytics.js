export const weathertopAnalytics = {

  getLatestReading(station) {
    let latestReading = null;
    let latestReadingIndex = station.readings.length - 1;
    if (station.readings.length > 0) {
      latestReading = station.readings[latestReadingIndex];
    }
    return latestReading;
  },

  //min/max readings

  minTemp(station) {
    let minTemp = null;
    if (station.readings.length > 0) {
      minTemp = Number(station.readings[0].temp);
      for (let i = 0; i < station.readings.length; i++) {
        if (Number(station.readings[i].temp) < minTemp) {
          minTemp = Number(station.readings[i].temp);
        }
      }
    }
    return minTemp;
  },

  maxTemp(station) {
    let maxTemp = null;
    if (station.readings.length > 0) {
      maxTemp = Number(station.readings[0].temp);
      for (let i = 0; i < station.readings.length; i++) {
        if (Number(station.readings[i].temp) > maxTemp) {
          maxTemp = Number(station.readings[i].temp);
        }
      }
    }
    return maxTemp;
  },

  minWindSpeed(station) {
    let minWindSpeed = null;
    if (station.readings.length > 0) {
      minWindSpeed = Number(station.readings[0].windSpeed);
      for (let i = 0; i < station.readings.length; i++) {
        if (Number(station.readings[i].windSpeed) < minWindSpeed) {
          minWindSpeed = Number(station.readings[i].windSpeed);
        }
      }
    }
    return minWindSpeed;
  },

  maxWindSpeed(station) {
    let maxWindSpeed = null;
    if (station.readings.length > 0) {
      maxWindSpeed = Number(station.readings[0].windSpeed);
      for (let i = 0; i < station.readings.length; i++) {
        if (Number(station.readings[i].windSpeed) > maxWindSpeed) {
          maxWindSpeed = Number(station.readings[i].windSpeed);
        }
      }
    }
    return maxWindSpeed;
  },

  minPressure(station) {
    let minPressure = null;
    if (station.readings.length > 0) {
      minPressure = Number(station.readings[0].pressure);
      for (let i = 0; i < station.readings.length; i++) {
        if (Number(station.readings[i].pressure) < minPressure) {
          minPressure = Number(station.readings[i].pressure);
        }
      }
    }
    return minPressure;
  },

  maxPressure(station) {
    let maxPressure = null;
    if (station.readings.length > 0) {
      maxPressure = Number(station.readings[0].pressure);
      for (let i = 0; i < station.readings.length; i++) {
        if (Number(station.readings[i].pressure) > maxPressure) {
          maxPressure = Number(station.readings[i].pressure);
        }
      }
    }
    return maxPressure;
  },

  checkTempTrend(station) {
    let tempTrend = null;
    let readingLength = station.readings.length;
    if (readingLength >= 3) {
      if ((station.readings[readingLength - 1].temp > station.readings[readingLength - 2].temp) && station.readings[readingLength - 2].temp > station.readings[readingLength - 3].temp) {
        tempTrend = "rising";
      } else if ((station.readings[readingLength - 1].temp < station.readings[readingLength - 2].temp) && station.readings[readingLength - 2].temp < station.readings[readingLength - 3].temp) {
        tempTrend = "falling";
      } else {
        tempTrend = "neutral";
      }
    } else {
      tempTrend = "error - not enough data"
    }
    return tempTrend;
  },

  checkWindSpeedTrend(station) {
    let windSpeedTrend = null;
    let readingLength = station.readings.length;
    if (readingLength >= 3) {
      //rising
      if ((station.readings[readingLength - 1].windSpeed > station.readings[readingLength - 2].windSpeed) && station.readings[readingLength - 2].windSpeed > station.readings[readingLength - 3].windSpeed) {
        return windSpeedTrend = "rising";
      } else if ((station.readings[readingLength - 1].windSpeed < station.readings[readingLength - 2].windSpeed) && station.readings[readingLength - 2].windSpeed < station.readings[readingLength - 3].windSpeed) {
        return windSpeedTrend = "falling";
      } else {
        return windSpeedTrend = "neutral";
      }
    } else {
      return windSpeedTrend = "error - not enough data"
    }
  },

  checkPressureTrend(station) {
    let pressureTrend = null;
    let readingLength = station.readings.length;
    if (readingLength >= 3) {
      if ((station.readings[readingLength - 1].pressure > station.readings[readingLength - 2].pressure) && station.readings[readingLength - 2].pressure > station.readings[readingLength - 3].pressure) {
        return pressureTrend = "rising";
      } else if ((station.readings[readingLength - 1].pressure < station.readings[readingLength - 2].pressure) && station.readings[readingLength - 2].pressure < station.readings[readingLength - 3].pressure) {
        return pressureTrend = "falling";
      } else {
        return pressureTrend = "neutral";
      }
    } else {
      return pressureTrend = "error - not enough data"
    }
  },

}
