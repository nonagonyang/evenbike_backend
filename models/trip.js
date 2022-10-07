//store actual trip info.
//once the user pressed the start trip button, create a trip instance and store it to trips table
//return an identifer of the trip
//user the identifer later after the trip has ended.

"use strict";

const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/updatesql");
const {
  getAllDocks,
  getNearbyDocks,
  getOccupancy,
  getDistance,
} = require("../helpers/getdocks");
const { NotFoundError, BadRequestError } = require("../expressError");

/** Related functions for trips. */

class Trip {
  /**
   *
   * Returns the entire list of bike docks in London
   * [{dock1},...{dock5}........]
   * Throws NotFoundError if no bike docks is returned from the TFL API.
   **/
  static async getAllDocks() {
    const arrDocks = await getAllDocks();
    if (arrDocks.length == 0) throw new NotFoundError(`No Bike Docks Found`);
    return arrDocks;
  }

  /** given location[geo coordinates] based on user input
   *
   * Returns a list of nearby bike docks ordered by dock occupancy in descending order.
   * [{dock1},...{dock5}]
   *
   * Throws NotFoundError if no bike docks is returned from the TFL API.
   **/
  static async recommendDocks(coord1) {
    const arrDocks = await getNearbyDocks(coord1);
    if (arrDocks.length == 0)
      throw new NotFoundError(`No Bike Docks Found near: ${coord1}`);
    return arrDocks;
  }

  /** given username, start_dock(dock id from tfl API), and start_time from the frontend,
   * save the trip in database to trips table
   * check if the user first, if no user, throw BadRequestError
   */

  static async startTrip({ username, start_dock, start_time }) {
    const userCheck = await db.query(
      `SELECT username
             FROM users
             WHERE username = $1`,
      [username]
    );
    if (!userCheck.rows[0]) {
      throw new BadRequestError(
        `No user found under the username: ${username}`
      );
    }

    const result = await db.query(
      `INSERT INTO trips
             (username,
              start_dock,
              start_time)
             VALUES ($1, $2,$3)
             RETURNING id, username, start_dock,start_time`,
      [username, start_dock, start_time]
    );

    const trip = result.rows[0];

    return trip;
  }
  /** Update trip data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   * { end_dock(dock id from tfl API), end_time }
   *
   * Returns { id, username, start_dock, end_dock, start_time, end_time}
   *
   * Throws NotFoundError if not found.
   */
  static async updateTrip(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      end_dock: "end_dock",
      end_time: "end_time",
    });

    // id is the last element in the array of values to be set.
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE trips 
                        SET ${setCols} 
                        WHERE id = ${idVarIdx} 
                        RETURNING id,
                                  username,
                                  start_dock,
                                  end_dock,
                                  start_time,
                                  end_time`;
    const result = await db.query(querySql, [...values, id]);
    const trip = result.rows[0];

    if (!trip) throw new NotFoundError(`No trip has been found: ${id}`);
    return trip;
  }

  static async endTrip(id) {
    // Calculate the distance, duration, eco_points, and active_points first.
    const duration = await this.calculateDuration(id);
    const distance = await this.calculateDistance(id);
    const eco_points = await this.calculateEcoPoints(id);
    const active_points = await this.calculateActivePoints(id);
    const data = { duration, distance, eco_points, active_points };

    const { setCols, values } = sqlForPartialUpdate(data, {
      distance: "distance",
      duration: "duration",
      eco_points: "eco_points",
      active_points: "active_points",
    });

    // Update the trip in database
    // id is the last element in the array of values to be set.
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE trips 
                        SET ${setCols} 
                        WHERE id = ${idVarIdx} 
                        RETURNING *`;
    const result = await db.query(querySql, [...values, id]);
    const trip = result.rows[0];
    if (!trip) throw new NotFoundError(`No trip has been found: ${id}`);
    return trip;
  }

  /** Find a user's all trips
   *
   * Returns [{ id, ...]
   **/
  static async findAll(username) {
    const result = await db.query(
      `SELECT 
              id,
              username,
              start_dock,
              start_time,
              end_dock,
              end_time,
              distance,
              eco_points,
              active_points
        FROM trips
        WHERE username= $1
        ORDER BY start_time`,
      [username]
    );
    return result.rows;
  }

  /** after the trip has ended, calculate the trip's ecopoints */
  static async calculateEcoPoints(id) {
    console.log("calculate Eco Points Helper", id);
    const trip = await this.get(id);
    console.log("calculate Eco Points Helper Trip", trip);
    const start_dock_id = trip["start_dock"].split(",")[0];
    console.log("calculate Eco Points Helper start_dock_id", start_dock_id);
    const end_dock_id = trip["end_dock"].split(",")[0];
    const start_occupancy = await getOccupancy(start_dock_id);
    const end_occupancy = await getOccupancy(end_dock_id);
    const eco_points =
      ((start_occupancy - end_occupancy) * 10).toFixed(0) > 0
        ? ((start_occupancy - end_occupancy) * 10).toFixed(0)
        : 0;

    return eco_points;
  }
  static async calculateDuration(id) {
    const trip = await this.get(id);
    // const duration = trip["end_time"] - trip["start_time"];
    const duration = 10;
    return duration;
  }

  // TODO write calculateActivePoints
  static async calculateActivePoints(id) {
    const distance = await this.calculateDistance(id);
    const active_points = Math.floor(distance);
    return active_points;
  }

  static async calculateDistance(id) {
    const trip = await this.get(id);
    const start_dock_id = trip["start_dock"].split(",")[0];
    const end_dock_id = trip["end_dock"].split(",")[0];
    const distance = await getDistance(start_dock_id, end_dock_id);
    return distance;
  }

  /** Given a trip id, return data about a trip.
   *
   * Returns { trip id, start_dock, end_dock, start_time, end_time, distance, eco_points, active_points }
   *
   * Throws NotFoundError if trip is not found.
   **/

  static async get(id) {
    const tripRes = await db.query(
      `SELECT start_dock,
              end_dock,
              start_time,
              end_time,
              eco_points,
              active_points
        FROM trips
        WHERE id = $1`,
      [id]
    );

    const trip = tripRes.rows[0];

    if (!trip) throw new NotFoundError(`No trip: ${id}`);

    return trip;
  }

  /**Given a trip id, delete the trip
   * Often used when a trip is not valid.
   */
  static async remove(id) {
    let result = await db.query(
      `DELETE
           FROM trips
           WHERE id = $1
           RETURNING id`,
      [id]
    );
    const trip = result.rows[0];

    if (!trip) throw new NotFoundError(`No trip to be deleted: ${id}`);
  }
}

module.exports = Trip;
