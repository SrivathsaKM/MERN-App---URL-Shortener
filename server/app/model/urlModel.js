const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const validator = require('validator');
const moment = require('moment');

const urlShortner = new Schema({
  title: {
    type: String,
    required: [true, 'title required'],
  },
  originalUrl: {
    type: String,
    required: [true, 'url required'],
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error('Invalid URL');
      }
    },
  },
  hashUrl: {
    type: String,
    default: shortid.generate,
  },
  count: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: String,
    //default: Date.now(),
  },
  otherDetails: [
    {
      clickDateTime: {
        type: String,
      },
      ipAddress: {
        type: String,
      },
      browser: {
        type: String,
      },
      platform: {
        type: String,
      },
      device: {
        type: String,
      },
    },
  ],
});

const ShortUrl = mongoose.model('ShortUrl', urlShortner);

module.exports = ShortUrl;
