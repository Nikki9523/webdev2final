import express from "express";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { stationController } from "./controllers/station-controller.js";
import { accountsController } from "./controllers/account-controller.js";
import { userController } from "./controllers/user-controller.js";

export const router = express.Router();

router.get("/", accountsController.index);
router.get("/login", accountsController.login);
router.get("/signup", accountsController.signup);
router.get("/logout", accountsController.logout);
router.post("/register", accountsController.register);
router.get("/edituser/:_id", userController.index);
router.post("/updateuser/:_id", userController.update);
router.post("/authenticate", accountsController.authenticate);
router.get("/dashboard", dashboardController.index);
router.post("/dashboard/addstation", dashboardController.addStation);
router.get("/dashboard/deletestation/:id", dashboardController.deleteStation);
router.post("/station/:id/addreading", stationController.addReading);
router.get("/station/:stationId/deletereading/:readingid", stationController.deleteReading);
router.get("/station/:id", stationController.index);
router.get("/about", aboutController.index);