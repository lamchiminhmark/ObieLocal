var database = require('../DBHandler');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

router.use(express.json());       // to support JSON-encoded bodies
router.use(express.urlencoded()); // to support URL-encoded bodies

// If the server is running and a GET request is sent
// to this route, then the page will print out the titles
// of all events in the Events table.
router.get('/', function(req, res, next) {
  database.tryConnection();
  console.log('Received GET request!');
  database
    .selectAllEvents()
    //.then(response => Array.from(response))
    // .then(arr => arr.map(event => event.title))
    .then(arr => {
      // console.log(arr);
      res.send(arr);})
    .catch(err => res.send(err));
});

/*
fetch("http://localhost:3000/query", {
    body: "email=test@example.com&password=pw",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "post",
})
*/
/*replace each quote with a backslash quote*/
router.post('/', function(req, res, next) {
  var body = req.body;
  var contype = req.headers['content-type'];
  console.log(body);
  console.log(contype);
});

module.exports = router;
