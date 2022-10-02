import express from 'express';
import { json } from 'body-parser';

const app = express();

app.use(json());

app.get('/', (req, res) => {
  res.send('Hi there');
});

app.get('/api/users/hello', (req, res) => {
  res.send('api users hello!!!');
});

app.get('/api/users/test', (req, res) => {
  res.send('Hi there000000');
});

app.listen(5000, () => console.log('Listening on PORT 5000 '));
