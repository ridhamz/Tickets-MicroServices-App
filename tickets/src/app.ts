import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler } from 'mz-tools';
import { NotFoundError } from 'mz-tools';

const app = express();
app.use(express.json());
app.set('trust proxy', true);

app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV != 'test',
  })
);

//routes


// handle not found routes
app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

// error handler
app.use(errorHandler);

export { app };
