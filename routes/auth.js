"use strict";

/** Routes for authentication. Login and Register */

const { BadRequestError } = require("../expressError");
const jsonschema = require("jsonschema");
//user related JSON schema
const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json");

//User model
const User = require("../models/user");

const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/jwt");
const { authRegisterController } = require("../controllers/auth");

/** POST /auth/token:  { email, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/token", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userAuthSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const { username, password } = req.body;
    const user = await User.authenticate(username, password);
    const token = createToken(user);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

/** POST /auth/register:   { user } => { token }
 *
 * user must include { username, password, email,weight,height }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authentication required: none
 */

router.post("/register", authRegisterController);

module.exports = router;
