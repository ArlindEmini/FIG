import jwt from "jsonwebtoken-promisified";
import { TOKEN_KEY } from "./constant";

export const verifyToken = async (token) => {
  try {
    await jwt.verifyAsync(token, TOKEN_KEY);

    return true
  } catch (error) {
    return false;
  }

}