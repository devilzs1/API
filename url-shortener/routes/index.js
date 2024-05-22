const urlRoute = require('./url');
const router = require("express").Router();

router.use('/', urlRoute);

module.exports = router;


