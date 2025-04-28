import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';
// import authenticateUser from './auth.middlware';
import session from 'express-session';
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,  // Change to true in production (with HTTPS)
    httpOnly: true, // Prevent client-side access to cookies
    maxAge: 1000 * 60 * 60 * 24  // Set cookie expiration to 1 day
  }
}));

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'Task Management API',
  });
});

app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
