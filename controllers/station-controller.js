import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { weathertopAnalytics } from "../utils/weathertop-analytics.js";
import { weatherConversions } from "../utils/weather-conversions.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const latestReading = await weathertopAnalytics.getLatestReading(station);
    const minTemp = await weathertopAnalytics.minTemp(station);
    const maxTemp = await weathertopAnalytics.maxTemp(station);
    const minWindSpeed = await weathertopAnalytics.minWindSpeed(station);
    const maxWindSpeed = await weathertopAnalytics.maxWindSpeed(station);
    const minPressure = await weathertopAnalytics.minPressure(station);
    const maxPressure = await weathertopAnalytics.maxPressure(station);
    const tempTrend = await weathertopAnalytics.checkTempTrend(station);

    const viewData = {
      title: "Station",
      station: station,
      latestReading: latestReading,
      minTemp: minTemp,
      maxTemp: maxTemp,
      minWindSpeed: minWindSpeed,
      maxWindSpeed: maxWindSpeed,
      minPressure: minPressure,
      maxPressure: maxPressure,
      tempTrend: tempTrend
    };
    response.render("station-view", viewData);
  },

  async addReading(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const newReading = {
      weatherCode: Number(request.body.weatherCode),
      temp: request.body.temp,
      windSpeed: Number(request.body.windSpeed),
      pressure: Number(request.body.pressure),
      windDirection: Number(request.body.windDirection),
      temperatureFahrenheit: weatherConversions.convertCeslsiusToFahrenheit(request.body.temp),
      weather: weatherConversions.weatherCodeConverter(Number(request.body.weatherCode)),
      beaufort: weatherConversions.beaufortConversion(Number(weatherConversions.beaufortCode(request.body.windSpeed))),
      windDirection: weatherConversions.windDirection(Number(request.body.windDirection)),
      windChill: weatherConversions.windChill(request.body.temp, request.body.windSpeed),
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toTimeString
      date: new Date().toDateString(),
      time: new Date().toTimeString()

    };
    console.log(`adding reading | weather code: ${newReading.weatherCode},
    temp: ${newReading.temp}, wind speed: ${newReading.windSpeed}, pressure: ${newReading.pressure}, windChill: ${newReading.windChill}`);
    await readingStore.addReading(station._id, newReading);
    response.redirect("/station/" + station._id);
  }
}