import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import HttpError from './models/http-error';
import authRoutes from './routes/authentication-routes';
import userRoutes from './routes/user-routes';
import clientRoutes from './routes/client-routes';

import sequelize from './config/database';
import authenticateToken from './controllers/authentication';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authenticateToken.unless({
  path: [
    '/user/login'
  ]
}));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/client", clientRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

sequelize
  .sync()
  .then(() => {
    app.listen(3001);
  
    console.log("App listening on port 3001");
  })
  .catch((err) => {
    console.log(err);
  });
