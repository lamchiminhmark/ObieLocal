var database = require("../DBHandler");
var express = require("express");
var router = express.Router();

// If the server is running and a GET request is sent
// to this route, then the page will print out the titles
// of all events in the Events table.
router.get("/", function(req, res, next) {
  database.tryConnection();
  console.log("Received GET request!");
  database
    .selectAllEvents()
    .then(arr => res.send(arr))
    .catch(err => res.send(err));
});

module.exports = router;
