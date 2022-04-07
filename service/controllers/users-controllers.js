const bcrypt = require("bcryptjs");
const HttpError = require("../models/http-error");
const Users = require("../models/Users");
const jwt = require("jsonwebtoken");

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

  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, user.password);
  } catch (err) {
    const error = HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { id: user.id, fullName: user.fullname },
      "jsonwebtokensecret",
      {
        expiresIn: "1h",
      }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    userId: user.id,
    name: user.fullName,
    token: token,
  });
};

exports.signup = signup;
exports.login = login;
