const express = require('express');
const mongoose = require('mongoose');

// Constants
const EXTERNAL_PORT = process.env.NODEJS_EXTERNAL_PORT;
const INTERNAL_PORT = process.env.NODEJS_PORT;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_DB = process.env.MONGO_DB;
const MONGODB_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
const HOST = '0.0.0.0';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World. ' + `Running on http://${req.headers.host}`);
});

mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URI)
  .then(result => {
      app.listen(INTERNAL_PORT, HOST, () => {
          console.log(`Running on http://${HOST}:${EXTERNAL_PORT}`);
      });
  })
  .catch(error => {
    console.log(error);

    return error;
  });

