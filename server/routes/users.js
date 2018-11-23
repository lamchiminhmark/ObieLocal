var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.json([
    {
      id: 1,
      username: "coltonpotter48"
    },
    {
      id: 2,
      username: "sampleuser2"
    }
  ]);
});

module.exports = router;
