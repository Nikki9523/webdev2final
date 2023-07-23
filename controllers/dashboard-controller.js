import { stationStore } from "../models/station-store.js";

export const dashboardController = {
  
  async index(request, response) {
    const viewData = {
      title: "WeatherTop Dashboard",
      stations: await stationStore.getAllStations(),
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const newStation = {
      title: request.body.title,
      latitude: request.body.latitude,
      longitude: request.body.longitude
    };
    console.log(`adding station ${newStation.title}, latitude:  ${newStation.latitude},
     longitude:  ${newStation.longitude}`);
    await stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },
};
