import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';
// import authenticateUser from './auth.middlware';
const app = express();


app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'Task Management API',
  });
});

app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
