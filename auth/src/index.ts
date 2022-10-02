import express from 'express';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';

const app = express();

app.use(json());

//routes
app.use(currentUserRouter);

app.listen(5000, () => console.log('Listening on PORT 5000 '));
