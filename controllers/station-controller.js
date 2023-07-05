
import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const viewData = {
      station: station,
    };
    response.render("station-view", viewData);
  },

  async addReading(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const newReading = {
      weatherCode: request.body.weatherCode
    };
    console.log(`adding reading ${newReading.weatherCode}`);
    await readingStore.addReading(station._id, newReading);
    response.redirect("/station/" + station._id);
  }
}