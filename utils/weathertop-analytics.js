export const weathertopAnalytics = {
    
    getLatestReading(station) {
      let latestReading = null;
      let latestReadingIndex = station.readings.length - 1;
      if (station.readings.length > 0) {
        latestReading = station.readings[latestReadingIndex];
      }
      return latestReading;
    },

  minTemp(station) {
    if (station.readings.length > 0) {
    let minTemp = Number(station.readings[0].temp);
    for (let i = 0; i < station.readings.length; i++) {
      if (Number(station.readings[i].temp) < minTemp) {
         minTemp = Number(station.readings[i].temp);
      }
    }
  }
    return minTemp;
  },

  maxTemp(station) {
    if (station.readings.length > 0) {
    let maxTemp = Number(station.readings[0].temp);
    for (let i = 0; i < station.readings.length; i++) {
      if (Number(station.readings[i].temp) > maxTemp) {
         maxTemp = Number(station.readings[i].temp);
      }
    }
    }
    return maxTemp;
  },

  minWindSpeed(station) {
    if (station.readings.length > 0) {
    let minWindSpeed = Number(station.readings[0].windSpeed);
    for (let i = 0; i < station.readings.length; i++) {
      if (Number(station.readings[i].windSpeed) < minWindSpeed) {
         minWindSpeed = Number(station.readings[i].windSpeed);
      }
    }
    }
    return minWindSpeed;
  },

  maxWindSpeed(station) {
    if (station.readings.length > 0) {
    let maxWindSpeed = Number(station.readings[0].windSpeed);
    for (let i = 0; i < station.readings.length; i++) {
      if (Number(station.readings[i].windSpeed) > maxWindSpeed) {
         maxWindSpeed = Number(station.readings[i].windSpeed);
      }
    }
    }
    return maxWindSpeed;
  },

  minPressure(station) {
    if (station.readings.length > 0) {
    let minPressure = Number(station.readings[0].pressure);
    for (let i = 0; i < station.readings.length; i++) {
      if (Number(station.readings[i].pressure) < minPressure) {
         minPressure = Number(station.readings[i].pressure);
      }
    }
    }
    return minPressure;
  },

  maxPressure(station) {
    if (station.readings.length > 0) {
    let maxPressure = Number(station.readings[0].pressure);
    for (let i = 0; i < station.readings.length; i++) {
      if (Number(station.readings[i].pressure) > maxPressure) {
         maxPressure = Number(station.readings[i].pressure);
      }
    }
    }
    return maxPressure;
  }
}
