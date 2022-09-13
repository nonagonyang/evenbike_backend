"use strict";

/** Routes for trip related matter. create, read, and update */
const jsonschema = require("jsonschema");
const express = require("express");
const {
  ensureLoggedIn,
  ensureCorrectUserOrAdmin,
} = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Trip = require("../models/trip");
const User = require("../models/user");
const Level = require("../models/level");
const tripNewSchema = require("../schemas/tripNew.json");
const tripUpdateSchema = require("../schemas/tripUpdate.json");
const tripEndSchema = require("../schemas/tripEnd.json");
const { response } = require("express");

const router = express.Router();

/**Get all trips for a user
 * Authorization required: ensureCorrectUserOrAdmin
 */

router.get(
  "/trips/:username",
  ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    try {
      const trips = await Trip.findAll(req.params.username);
      return res.json({ trips });
    } catch (err) {
      return next(err);
    }
  }
);

/**GET allDocks in London
 * Authorization required: login
 */

router.get("/docks", ensureLoggedIn, async function (req, res, next) {
  try {
    const docks = await Trip.getAllDocks();
    return res.json({ docks });
  } catch (err) {
    return next(err);
  }
});

/**GET / {coordinates} => [{dock1},{dock2}...]
 * location should be an object like { "lat": 51.519914, "lng": -0.136039 }
 * Make sure the keys of location obj should be inside quote, otherwise JSON.parse will throw errors
 * get recommended bike docks based on user's location or input.
 * This returns a list of recommended bike docks
 * Authorization required: login
 */
router.get("/docks/:location", ensureLoggedIn, async function (req, res, next) {
  try {
    const location = JSON.parse(req.params.location);
    console.log("trip.js", location);
    // const location = { lat: 51.519914, lng: -0.136039 };
    const docks = await Trip.recommendDocks(location);
    return res.json({ docks });
  } catch (err) {
    return next(err);
  }
});

/** POST /start {username, start_dock, start_time}=>{trip with id}
 * add a new trip, associated with the user, when this endpoint is hit.
 * This return a newly created trip with identifier.
 * Authorization required: login
 *
 */

router.post("/start", ensureLoggedIn, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, tripNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    const user = res.locals.user;
    const username = user.username;
    const { start_dock, start_time } = req.body;
    const trip = await Trip.startTrip({ username, start_dock, start_time });
    return res.json({ trip });
  } catch (err) {
    return next(err);
  }
});

/** POST /end {trip_id,end_dock, end_time}=> [{trip},{user}]
 * Authorization required: login
 * This route can only be hit once, otherwise, the points will keep increasing
 * each time this endpoint has been reached
 *
 */

router.patch("/end/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, tripUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    //req.body should be like {end_dock: x , end_time: y }

    let trip = await Trip.updateTrip(req.params.id, req.body);
    trip = await Trip.endTrip(req.params.id);
    let user = await User.get(trip["username"]);

    //after the trip has ended, check if the trip is valid
    //TODO: checkValid(trip)
    //for now just check distance
    //if not delete the trip
    // const distance = trip["distance"];
    // if (parseFloat(distance) <= 0.1) {
    //   //delete the trip and return user

    //   trip = await Trip.delete(req.params.id);
    //   return res.json({ user });
    // }

    // //also need to update user info
    // //based on this trip's eco_points and active_points
    const trip_eco = parseInt(trip["eco_points"]);
    const trip_active = parseInt(trip["active_points"]);

    //calculate user's total_eco, total_active, total_points
    //first get user's current total_eco, total_active, total_point
    let { eco_points, active_points, total_points } = user;

    //then adjust its value
    eco_points = parseInt(eco_points) + trip_eco;
    active_points = parseInt(active_points) + trip_active;
    total_points = eco_points + active_points;

    //based on user's points, adjust their level
    const eco_level = Math.floor(eco_points / 10);
    const active_level = Math.floor(active_points / 10);
    const overall_level = Math.floor(total_points / 20);

    //pass the values to User.update()
    const data = {
      eco_points,
      active_points,
      total_points,
      eco_level,
      active_level,
      overall_level,
    };
    const validator2 = jsonschema.validate(data, tripEndSchema);

    if (!validator.valid) {
      const errs = validator2.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    user = await User.update(trip["username"], data);
    return res.json({ trip, user });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
