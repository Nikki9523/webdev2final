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
    let minTemp = station.readings[0].temp;
    for (let i = 0; i < station.readings.length; i++) {
      if (station.readings[i].temp < minTemp) {
         minTemp = station.readings[i].temp;
      }
    }
    return minTemp;
  },

  maxTemp(station) {
    const maxTempTest = 3;
   /* let maxTemp = station.readings[0].temp;
    for (let i = 0; i < station.readings.length; i++) {
      if (station.readings[i].temp > maxTemp) {
         maxTemp = station.readings[i].temp;
      }
    } */
    return maxTempTest;
  } 
}
