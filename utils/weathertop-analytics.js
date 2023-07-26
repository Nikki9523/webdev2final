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
    let minTemp = Number(station.readings[0].temp);
    for (let i = 0; i < station.readings.length; i++) {
      if (Number(station.readings[i].temp) < minTemp) {
         minTemp = Number(station.readings[i].temp);
      }
    }
    return minTemp;
  },

  maxTemp(station) {
    let maxTemp = Number(station.readings[0].temp);
    for (let i = 0; i < station.readings.length; i++) {
      if (Number(station.readings[i].temp) > maxTemp) {
         maxTemp = Number(station.readings[i].temp);
      }
    }
    return maxTemp;
  },

  minWindSpeed(station) {
    let minWindSpeed = Number(station.readings[0].windSpeed);
    for (let i = 0; i < station.readings.length; i++) {
      if (Number(station.readings[i].windSpeed) < minWindSpeed) {
         minWindSpeed = Number(station.readings[i].windSpeed);
      }
    }
    return minWindSpeed;
  },

  maxWindSpeed(station) {
    let maxWindSpeed = Number(station.readings[0].windSpeed);
    for (let i = 0; i < station.readings.length; i++) {
      if (Number(station.readings[i].windSpeed) > maxWindSpeed) {
         maxWindSpeed = Number(station.readings[i].windSpeed);
      }
    }
    return maxWindSpeed;
  },
}
