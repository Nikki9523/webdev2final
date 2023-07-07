export const weathertopAnalytics = {
    
    getLatestReading(station) {
      let latestReading = null;
      let latestReadingIndex = station.readings.length - 1;
      if (station.readings.length > 0) {
        latestReading = station.readings[latestReadingIndex];
      }
      return latestReading;
    },
  };