import { stationStore } from "../models/station-store.js";
import { accountsController } from "./account-controller.js";

export const dashboardController = {
  
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const viewData = {
      title: "WeatherTop Dashboard",
      stations: await stationStore.getStationsByUserId(loggedInUser._id)
    };
    console.log("dashboard rendering");
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
};
