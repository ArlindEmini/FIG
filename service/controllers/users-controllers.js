const bcrypt = require("bcryptjs");
const HttpError = require("../models/http-error");
const Users = require("../models/Users");

const signup = async (req, res, next) => {
  const { name, password } = req.body;

  let hashedPassord;

  try {
    hashedPassord = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create has password, please try again.",
      500
    );
    return next(error);
  }

  let createdUser;

  try {
    createdUser = await Users.create({
      fullName: name,
      password: hashedPassord,
    });
  } catch (err) {
    const error = new HttpError(
      "Could not create User, please try again.",
      500
    );
    return next(error);
  }

  res.json({ User: createdUser });
};

const login = async (req, res, next) => {
  const { name, password } = req.body;

  const user = await Users.findOne({ where: { fullName: name } });

  if (!user) {
    const error = new HttpError("User doesn't exist", 500);
    return next(error);
  }
  res.json("Logged In");
};

exports.signup = signup;
exports.login = login;
