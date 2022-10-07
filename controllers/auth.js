const { createToken } = require("../helpers/jwt");
const User = require("../models/user");
const jsonschema = require("jsonschema");
const userRegisterSchema = require("../schemas/userRegister.json");

async function authRegisterController(req, res, next) {
  try {
    let { username, email, password, height, weight } = req.body;
    height = Number(height);
    weight = Number(weight);
    let data = { username, email, password, height, weight };
    const validator = jsonschema.validate(data, userRegisterSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    const newUser = await User.register({ ...data, is_admin: false });
    const token = createToken(newUser);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
}
module.exports = { authRegisterController };
