const ShortUrl = require('../model/urlModel');
const urlShorterController = {};

urlShorterController.list = (req, res) => {
  ShortUrl.find()
    .then((urls) => {
      res.json(urls);
    })
    .catch((err) => {
      res.json(err);
    });
};

urlShorterController.create = (req, res) => {
  const body = req.body;
  //const title = data.title;
  //const originalUrl = data.originalUrl;
  //req.body.hashUrl = 'xyz';

  const shorternUrl = new ShortUrl(body);

  shorternUrl
    .save()
    .then((url) => {
      //console.log(url);
      res.json(url);
    })
    .catch((err) => {
      res.json(err);
    });
};

//to direct the url
urlShorterController.getone = (req, res) => {
  //  console.log(req);
  const urlHash = req.params.hashUrl;
  // console.log(urlHash);
  const { clickDateTime, browser, os, ipAddress, platform, device } = req.stats;

  ShortUrl.findOneAndUpdate({ hashUrl: urlHash }, { $push: { otherDetails: { $each: [{ clickDateTime, browser, os, ipAddress, platform, device }] } } })
    .then((url) => {
      //res.json(url.originalUrl);
      res.redirect(url.originalUrl);
    })
    .catch((err) => {
      res.json(err);
    });

  //u can even use e6 concise method instead below
  // { clickDateTime: clickDateTime, browser: browser, os: os, ipAddress: ipAddress, platform: platform, device: device }
  //shorturl.update({ hahsUrl: urlHash }, { $push: { otherDetails: { $each: ['C', 'Ruby', 'Go'] } } });
};

//to update the count click
urlShorterController.updateCount = (req, res) => {
  const id = req.params.id;
  ShortUrl.findByIdAndUpdate(id, { $inc: { count: 1 } }, { new: true, runValidators: true })
    .then((count) => {
      res.json(count);
    })
    .catch((err) => {
      res.json(err);
    });
};

urlShorterController.remove = (req, res) => {
  const id = req.params.id;
  ShortUrl.findByIdAndDelete(id)
    .then((url) => {
      res.json(url);
    })
    .catch((err) => {
      res.json(err);
    });
};
module.exports = urlShorterController;
