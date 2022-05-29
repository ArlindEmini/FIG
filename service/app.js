import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import HttpError from './models/http-error.js';
import authRoutes from './routes/authentication-routes.js';
import userRoutes from './routes/user-routes.js';
import clientRoutes from './routes/client-routes.js';

import authenticateToken from './controllers/authentication.js';

export const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/clients", clientRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.listen(Number(process.env.PORT), () => {
	console.log(`server started at http://localhost:${Number(process.env.PORT)}`);
});