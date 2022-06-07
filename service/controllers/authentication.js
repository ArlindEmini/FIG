import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import HttpError from '../models/http-error.js';

dotenv.config();

const authenticateToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      const token = authorization;

      jwt.verify(token, process.env.SECRET_TOKEN, (err, data) => {
        if (err || !data.id || data.exp > new Date().getTime()) {
          return res.status(401).json({error: "Invalid token"}).end();
        }
        return next();
      });
    } else {
      res.status(401).json({error: "Token is missing in the request"}).end();
    }
  } catch (error) {
    res.status(401).json({error}).end();
  }
}

export default authenticateToken;