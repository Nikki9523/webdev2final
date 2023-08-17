import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import {stationStore} from "./station-store.js"

const db = initStore("readings");

export const readingStore = {
  async getAllReadings() {
    await db.read();
    return db.data.readings;
  },

  async addReading(stationId, reading) {
    await db.read();
    reading._id = v4();
    reading.stationid = stationId;
    db.data.readings.push(reading);
    await db.write();
    return reading;
  },

  async getReadingById(id) {
    await db.read();
    const list = db.data.readings.find((reading) => reading._id === id);
    return list;
  },

  async getReadingsByStationId(id) {
    await db.read();
    return db.data.readings.filter((reading) => reading.stationid === id);
  },


  async deleteReadingById(id) {
    await db.read();
    const index = db.data.readings.findIndex((reading) => reading._id === id);
    db.data.readings.splice(index, 1);
    await db.write();
  },

  /* tried to make this only delete station's readings instead of clearing everything 
  but doesn't work, only deletes a few, not sure why*/
  async deleteAllReadings(associatedStationId) {
    await db.read();
    const station = await stationStore.getStationById(associatedStationId);
    const stationId =  station._id;
    for(let i = 0; i < db.data.readings.length; i++){
      const assignedStationId = db.data.readings[i].stationid;
     if(stationId === assignedStationId){
        this.deleteReadingById(db.data.readings[i]._id);
        await db.write();
        await db.read();
     }
    }
    await db.write();
  },
}

