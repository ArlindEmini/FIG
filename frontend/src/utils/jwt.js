import jwt from "jwt-decode";

export const verifyToken = (token) => {
  try {
    return jwt(token);
  } catch (error) {
    return false;
  }
}
