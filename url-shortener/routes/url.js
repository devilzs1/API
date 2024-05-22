const router = require('express').Router();
const urlController = require("../controllers/url");

router.post('/shortUrl', urlController.shortUrl);
router.get('/:shortUrl', urlController.redirectUrl);
router.get('/analytics/:shortUrl', urlController.getAnalytics);

module.exports = router;