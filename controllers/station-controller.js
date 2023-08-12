import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { weathertopAnalytics } from "../utils/weathertop-analytics.js";
import { weatherConversions } from "../utils/weather-conversions.js";
import axios from "axios";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const readings = await readingStore.getReadingsByStationId(request.params.id);
    //  console.log("hi", readings);
    //  console.log(readings[0].tempTrend, readings[0].trendLabels);
    const latestReading = await weathertopAnalytics.getLatestReading(station);
    const minTemp = await weathertopAnalytics.minTemp(station);
    const maxTemp = await weathertopAnalytics.maxTemp(station);
    const minWindSpeed = await weathertopAnalytics.minWindSpeed(station);
    const maxWindSpeed = await weathertopAnalytics.maxWindSpeed(station);
    const minPressure = await weathertopAnalytics.minPressure(station);
    const maxPressure = await weathertopAnalytics.maxPressure(station);
    const tempTrend = await weathertopAnalytics.checkTempTrend(station);
    const windSpeedTrend = await weathertopAnalytics.checkWindSpeedTrend(station);
    const pressureTrend = await weathertopAnalytics.checkPressureTrend(station);

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
      tempTrend: tempTrend,
      windSpeedTrend: windSpeedTrend,
      pressureTrend: pressureTrend,
      readings: readings
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
  },

  async deleteReading(request, response) {
    const stationId = request.params.stationId;
    const readingId = request.params.readingId;
    console.log(`Deleting reading ${readingId} from Station ${stationId}`);
    await readingStore.deleteReadingById(request.params.readingId);
    response.redirect("/station/" + stationId);
  },

  async addReport(request, response) {
    console.log("rendering new report");
    let report = {};
    let station = await stationStore.getStationById(request.params.id);
    const stationId = request.params.id;
    const lat = request.body.lat;
    const lng = request.body.lng;
    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=876f7ff7184f8ea886ab8a25dbece01d`
    const result = await axios.get(requestUrl);
    if (result.status == 200) {
      const reading = result.data.current;
      report.weatherCode = reading.weather[0].id;
      report.temp = reading.temp;
      report.windSpeed = reading.wind_speed;
      report.pressure = reading.pressure;
      report.windDirection = reading.wind_deg;

      report.tempTrend = [];
      report.windSpeedTrend = [];
      report.pressureTrend = [];
      report.trendLabels = [];
      const trends = result.data.daily;
      for (let i = 0; i < trends.length; i++) {
        report.tempTrend.push(trends[i].temp.day);
        report.windSpeedTrend.push(trends[i].wind_speed);
        report.pressureTrend.push(trends[i].pressure);
        const date = new Date(trends[i].dt * 1000);
        report.trendLabels.push(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`);
        report.date = date;
      }
      await readingStore.addReading(stationId, report);
    }

    response.redirect("/station/" + stationId);
  }
}