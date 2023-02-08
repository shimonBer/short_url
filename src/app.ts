import express from 'express';
import { encodeString, decodeString } from './controllers/encodingMethods';
import bodyParser from 'body-parser';


const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/encode', (req, res) => {
  let linkToEncode: string = req.body.link;
  res.json(encodeString(linkToEncode));
});

app.post('/decode', (req, res) => {
  let linkToDecode: string = req.body.link;
  res.json(decodeString(linkToDecode));
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
