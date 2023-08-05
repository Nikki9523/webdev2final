import { stationStore } from "../models/station-store.js";
import { accountsController } from "./account-controller.js";
import axios from "axios";
const oneCallRequest = `https://api.openweathermap.org/data/2.5/onecall?lat=52.160858&lon=-7.152420&units=metric&appid=876f7ff7184f8ea886ab8a25dbece01d`

export const dashboardController = {

  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const viewData = {
      title: "WeatherTop Dashboard",
      stations: await stationStore.getStationsByUserId(loggedInUser._id)
    };
    console.log("dashboard rendering");
    for (const station of viewData.stations) {
      viewData.stations.sort((a, b) => (a.title > b.title ? 1 : -1));
    }
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const newStation = {
      userid: loggedInUser._id,
      title: request.body.title,
      latitude: request.body.latitude,
      longitude: request.body.longitude
    };
    console.log(`adding station ${newStation.title}, latitude:  ${newStation.latitude},
     longitude:  ${newStation.longitude}`);
    await stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  async deleteStation(request, response) {
    const stationId = request.params.id;
    console.log(`deleting station ${stationId}`);
    await stationStore.deleteStationbyId(stationId);
    response.redirect("/dashboard");
  },

  async addreport(request, response) {
    console.log("rendering new report");
    const report = {};
    const viewData = {
      title: "Weather Report",
      reading: report
    };
    response.render("dashboard-view", viewData);
  },

  async addreport(request, response) {
    console.log("rendering new report");
    let report = {};
    const lat = request.body.lat;
    const lng = request.body.lng;
    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=876f7ff7184f8ea886ab8a25dbece01d`
    const result = await axios.get(requestUrl);
    if (result.status == 200) {
      const reading = result.data.current;
      report.code = reading.weather[0].id;
      report.temperature = reading.temp;
      report.windSpeed = reading.wind_speed;
      report.pressure = reading.pressure;
      report.windDirection = reading.wind_deg;

      report.tempTrend = [];
      report.trendLabels = [];
      const trends = result.data.daily;
      for (let i = 0; i < trends.length; i++) {
        report.tempTrend.push(trends[i].temp.day);
        const date = new Date(trends[i].dt * 1000);
        report.trendLabels.push(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`);
      }
    }
    console.log(report);
    const viewData = {
      title: "Weather Report",
      reading: report
    };
    response.render("dashboard-view", viewData);
  }
};
