import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { weathertopAnalytics } from "../utils/weathertop-analytics.js";
import { weatherConversions } from "../utils/weather-conversions.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const latestReading = await weathertopAnalytics.getLatestReading(station);
    const viewData = {
      title: "Station",
      station: station,
      latestReading: latestReading
    };
    response.render("station-view", viewData);
  },

  async addReading(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const newReading = {
      weatherCode: Number(request.body.weatherCode),
      temp: request.body.temp,
      windSpeed: request.body.windSpeed,
      pressure: request.body.pressure,
      temperatureFahrenheit: weatherConversions.convertCeslsiusToFahrenheit(request.body.temp),
      weather: weatherConversions.weatherCodeConverter(Number(request.body.weatherCode))

    };
    console.log(`adding reading | weather code: ${newReading.weatherCode},
    temp: ${newReading.temp}, wind speed: ${newReading.windSpeed}, pressure: ${newReading.pressure}`);
    await readingStore.addReading(station._id, newReading);
    response.redirect("/station/" + station._id);
  }
}