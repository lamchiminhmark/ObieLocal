var express = require('express');
var router = express.Router();
var api = require('../APIQuery');

router.get('/', (req, res, next) => {
  try {
    api.updateDatabase();
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
});

module.exports = router;
