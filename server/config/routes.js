const express = require('express');
const router = express.Router();
const { getStats } = require('../app/middlewares/urlMiddleware')
const urlShorterController = require('../app/controllers/urlsController');

router.get('/api/url', urlShorterController.list);
router.post('/api/url', urlShorterController.create);
router.get('/api/url/:hashUrl', getStats, urlShorterController.getone);
//router.get('/api/url/:id', urlShorterController.getOneId);
router.put('/api/url/:id', urlShorterController.updateCount);
router.delete('/api/url/:id', urlShorterController.remove);

module.exports = router;
