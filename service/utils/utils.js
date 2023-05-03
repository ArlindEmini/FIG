import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserController from "../controllers/user.js";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (id) =>
  jwt.sign({ id }, process.env.SECRET_TOKEN, { expiresIn: "1y" });

export const validatePassword = async (password, dbPassword) =>
  bcrypt.compare(password, dbPassword);

export const validateAdmin = async (authorization) => {
  const tokenValue = getTokenValue(authorization);
  const response = jwt.verify(tokenValue, process.env.SECRET_TOKEN);

  if (response && response.id) {
    const user = await UserController.get(response.id);
    return user && user.user_type === 0 ? true : false;
  }
  return false;
};

export const getTokenValue = (token) => {
  return (
    (token &&
      typeof token === "string" &&
      token.split("Bearer ") &&
      token.split("Bearer ").length > 1 &&
      token.split("Bearer ")[1]) ||
    token
  );
};

export const getIdFromToken = (authorization) => {
  const response = jwt.verify(authorization, process.env.SECRET_TOKEN);

  return response && response.id;
};

export const getDate = (_) => {
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  return year + "/" + month + "/" + day;
};
