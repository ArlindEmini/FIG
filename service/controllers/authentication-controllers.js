const bcrypt = require("bcryptjs");
const HttpError = require("../models/http-error");
const Users = require("../models/Users");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const { fullName, email, password, userType, contact,qrCode, timeOfAvailable } = req.body;

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
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
      full_name: fullName,
      email:email,
      password: hashedPassword,
      user_type: userType,
      contact:contact,
      created_date : Date.now(),
      qr_code: qrCode,
      timeoff_available: timeOfAvailable
    });
  } catch (err) {
    const error = new HttpError(
      "Could not create User, please try again.",
      500
    );
    console.log("eroriii", err)
    return next(error);
  }

  res.json({ User: createdUser });
};

const login = async (req, res, next) => {
  const { fullName, password } = req.body;

  const user = await Users.findOne({ where: { full_name: fullName } });

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
      { id: user.id, fullName: user.full_name },
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
    fullName: user.full_name,
    email:user.email,
    token: token,
  });

};

exports.signup = signup;
exports.login = login;
