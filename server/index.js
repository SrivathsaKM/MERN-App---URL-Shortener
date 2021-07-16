const express = require('express');
const app = express();
const router = require('./config/routes');
const cors = require('cors');
const configureDb = require('./config/database');
const port = 3050;

const useragent = require('express-useragent');
app.use(useragent.express());

//connection to DB

configureDb();
app.use(express.json());
app.use(cors());
app.use(router);

// app.use((req, res, next) => {
//   console.log(`${req.ip}`);
//   next();
// });
app.get('/', (req, res) => {
  console.log();
  res.send(req.useragent);
});

// app.get('/', (req, res) => {
//   res.send('welcome to url-short-website');
// });

app.listen(port, () => {
  console.log('server is listing to port', port);
});
