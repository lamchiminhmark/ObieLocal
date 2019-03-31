var express = require('express');
var router = express.Router();
var api = require('../APIQuery');

router.get('/', (req, res, next) => {
  api.updateDatabase();
});

module.exports = router;
