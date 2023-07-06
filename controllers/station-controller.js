
import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const viewData = {
      title: "Station",
      station: station,
    };
    response.render("station-view", viewData);
  },

  async addReading(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const newReading = {
      weatherCode: request.body.weatherCode,
      temp: request.body.temp,
      windSpeed: request.body.windSpeed,
      pressure: request.body.pressure
    };
    console.log(`adding reading | weather code: ${newReading.weatherCode},
    temp: ${newReading.temp}, wind speed: ${newReading.windSpeed}, pressure: ${newReading.pressure}`);
    await readingStore.addReading(station._id, newReading);
    response.redirect("/station/" + station._id);
  }
}