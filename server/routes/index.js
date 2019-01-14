var express = require('express');
var router = express.Router();

/* GET home page. Not currently in use, shipped with the installation of
express. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
