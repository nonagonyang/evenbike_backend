"use strict";

const db = require("../db");

/** Related functions for levels. */

class Level {
  static async getEL() {
    const result = await db.query(
      `SELECT eco_level,
                level_limit
                FROM eco_levels
                ORDER BY eco_level
        `
    );
    return result.rows;
  }

  static async getAL() {
    const result = await db.query(
      `SELECT active_level,
                level_limit
                FROM active_levels
                ORDER BY active_level
        `
    );
    return result.rows;
  }

  static async getOL() {
    const result = await db.query(
      `SELECT overall_level,
                level_limit
                FROM overall_levels
                ORDER BY overall_level
        `
    );
    return result.rows;
  }

  /** turn eco_levels, active_levels,and overall_levels tables to [{eco_level: Int(limit)}] [{1:10}]
   *given a user's eco_points, active_points, overall_points
   *return their eco_level, active_level, overall_level
   * Returns { username, email, is_admin }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/
  static async calculateL(points, type) {
    let levels;
    if (type == "eco") {
      levels = await this.getEL();
    }
    if (type == "active") {
      levels = await this.getAL();
    }
    if (type == "overall") {
      levels = await this.getOL();
    }
    //limits:["10","20"....]
    const limits = Object.values(levels);
    for (let i = 0; i < limits.length; i++) {
      limits[i] = parseInt(limits[i]);
      if (points <= limits[0]) {
        return 1;
      } else if ((points <= limits[i + 1]) & (points >= limits[i])) {
        return i + 2;
      }
    }
  }
}

module.exports = Level;
