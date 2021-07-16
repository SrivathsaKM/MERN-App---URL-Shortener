const mongoose = require('mongoose');

const configureDb = () => {
  mongoose.connect('mongodb://localhost:27017/short-url', { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log('connect to database');
  });
};
module.exports = configureDb;
