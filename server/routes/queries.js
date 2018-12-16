var database = require('../DBHandler');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var request = require('request');
var config = require('../../config');

router.use(bodyParser.json()); // to support JSON-encoded bodies
router.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

router.use(express.json()); // to support JSON-encoded bodies
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
      res.send(arr);
    })
    .catch(err => res.send(err));
});

/*
Example post request:
fetch("http://localhost:3000/query", {
    body: "email=test@example.com&password=pw",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "post",
})
*/

// CONTINUE: ML Finish this function to assign the coordinates returned by Google Map to the Database by accessing the results property
/**
 * @param {String} address
 */
function getCoordinates(address) {
  address = address.replace(' ', '+');
  request = request(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${config.GOOGLE_MAP_API_KEY}`,
    { json: true },
    (err, res, body) => {
      console.log(body);
    }
  );
}

/* Handle a POST request to this route to insert new event 
into the database. */
router.post('/', function(req, res, next) {
  var body = req.body;
  var contype = req.headers['content-type'];

  /* Stringify the attributes in the body to protect against
  SQL injection attacks. Stringify() will automatically escape
  conflicting characters. */
  if (contype === 'application/x-www-form-urlencoded') {
    for (let attributename in body) {
      let str = JSON.stringify(body[attributename]);
      console.log('Inserting with: ' + attributename + ' = ' + str);
      body[attributename] = str;
    }
    // TODO: ML Add error handling if address is not available;
    //const coordinates = getCoordinates(body.address);
    database
      .insertEvent(body)
      .then(() => {
        res.status(200).end();
      })
      .catch(err => {
        console.log('There was an error inserting into the database: ' + err);
        res.status(500).end();
      });
  } else {
    console.log('Incorrect content type received from POST request.');
    res.status(415).end();
  }
});

module.exports = router;
