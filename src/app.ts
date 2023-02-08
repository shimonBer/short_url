import express from 'express';
import { handleLinkShorten, handleLinkToOriginal } from './controllers/encodingMethods';
import bodyParser from 'body-parser';


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello short link app');
});

app.post('/encode', (req, res) => {
  let linkToEncode: string = req.body.link;
  res.json(handleLinkShorten(linkToEncode));
});

app.post('/decode', (req, res) => {
  let linkToDecode: string = req.body.link;
  res.json(handleLinkToOriginal(linkToDecode));
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
