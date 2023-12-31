import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { weathertopAnalytics } from "../utils/weathertop-analytics.js";
import { weatherConversions } from "../utils/weather-conversions.js";
import axios from "axios";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const readings = await readingStore.getReadingsByStationId(request.params.id);
    const latestReading = await weathertopAnalytics.getLatestReading(station);
    const minTemp = weathertopAnalytics.minTemp(station);
    const maxTemp = weathertopAnalytics.maxTemp(station);
    const minWindSpeed = weathertopAnalytics.minWindSpeed(station);
    const maxWindSpeed = weathertopAnalytics.maxWindSpeed(station);
    const minPressure = weathertopAnalytics.minPressure(station);
    const maxPressure = weathertopAnalytics.maxPressure(station);
    const tempTrend = weathertopAnalytics.checkTempTrend(station);
    const windSpeedTrend = weathertopAnalytics.checkWindSpeedTrend(station);
    const pressureTrend = weathertopAnalytics.checkPressureTrend(station);
    const risingTrendTemp = weathertopAnalytics.risingTrendFunc(tempTrend);
    const fallingTrendTemp = weathertopAnalytics.fallingTrendFunc(tempTrend);
    const risingTrendWindSpeed = weathertopAnalytics.risingTrendFunc(windSpeedTrend);
    const fallingTrendWindSpeed = weathertopAnalytics.fallingTrendFunc(windSpeedTrend);
    const risingTrendPressure = weathertopAnalytics.risingTrendFunc(pressureTrend);
    const fallingTrendPressure = weathertopAnalytics.fallingTrendFunc(pressureTrend);

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
      readings: readings,
      risingTrendTemp: risingTrendTemp,
      fallingTrendTemp: fallingTrendTemp,
      risingTrendWindSpeed: risingTrendWindSpeed,
      fallingTrendWindSpeed: fallingTrendWindSpeed,
      risingTrendPressure: risingTrendPressure,
      fallingTrendPressure: fallingTrendPressure
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
      date: new Date().toDateString(),
      time: new Date().toTimeString()

    };
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

  async deleteAllReadings(request, response) {
    const stationId = request.params.stationId;
    console.log(`Deleting all readings from Station ${stationId}`);
    await readingStore.deleteAllReadings(stationId);
    response.redirect("/station/" + stationId);
  },

  async addReport(request, response) {
    console.log("rendering new report");
    let report = {};
    let station = await stationStore.getStationById(request.params.id);
    const stationId = request.params.id;
    const lat = station.latitude;
    const lng = station.longitude;
    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=876f7ff7184f8ea886ab8a25dbece01d`
    const result = await axios.get(requestUrl);
    if (result.status == 200) {
      const reading = result.data.current;
      report.weatherCode = reading.weather[0].id;
      report.temp = reading.temp;
      report.windSpeed = reading.wind_speed;
      report.pressure = reading.pressure;
      report.windDirection = reading.wind_deg;
      report.weather = weatherConversions.weatherCodeConverter(report.weatherCode);
      report.temperatureFahrenheit = weatherConversions.convertCeslsiusToFahrenheit(Math.round(report.temp));
      report.beaufortCode = weatherConversions.beaufortCode(report.windSpeed);
      report.beaufort = weatherConversions.beaufortConversion(report.beaufortCode);
      report.windDirection = weatherConversions.windDirection(report.windDirection);
      report.windChill = weatherConversions.windChill(report.temp, report.windSpeed);

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
        report.date = new Date().toDateString();
        report.time = new Date().toTimeString();
      }
      await readingStore.addReading(stationId, report);
    }

    response.redirect("/station/" + stationId);
  }
}