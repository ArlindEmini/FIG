import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import HttpError from '../models/http-error';

dotenv.config();

const authenticateToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      const token = authorization;

      jwt.verify(token, process.env.SECRET_TOKEN, (err, data) => {
        if (err || !data.id || data.exp > new Date().getTime()) {
          return res.status(HttpError('Invalid token', 401)).json(err).end();
        }
        req.id = data.id;

        return next();
      });
    }

    return next();
  } catch (error) {
    res.status(HttpError('Invalid server request', 401)).json(err).end();
  }
}

export default authenticateToken;