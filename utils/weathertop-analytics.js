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
    let maxTemp = Number(station.readings[0].temp);
    console.log('Max temp :' + station.readings[0].temp);
    for (let i = 0; i < station.readings.length; i++) {
      if (Number(station.readings[i].temp) > maxTemp) {
         maxTemp = Number(station.readings[i].temp);
         console.log('New Max temp :' + station.readings[i].temp);
      }
    }
    return maxTemp;
  } 
}
