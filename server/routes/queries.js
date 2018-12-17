var database = require('../DBHandler');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const rp = require('request-promise');
var config = require('../../src/config');

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

/**
 * @param {String} address
 * @returns Coordinates from the given address
 */
async function getCoordinates(address) {
  address = address.replace(' ', '+');
  const options = {
    uri: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${
      config.GOOGLE_MAP_API_KEY
    }`,
    json: true
  };
  const response = await rp(options);
  if (response.err) console.log('error');

  // TODO: ML Add error handling if results is an empty array
  if (response.results.length === 0) return {err: true};
  const { lat, lng } = response.results[0].geometry.location;
  console.log('coordinates are ' + lat + ' ' + lng);
  return {latitude: lat, longitude: lng};
}

/* Handle a POST request to this route to insert new event 
into the database. */
router.post('/', async function(req, res, next) {
  var body = req.body;
  var contype = req.headers['content-type'];
  console.log(`contype: ${contype}`);
  /* Stringify the attributes in the body to protect against
  SQL injection attacks. Stringify() will automatically escape
  conflicting characters. */
  // if (contype === 'application/x-www-form-urlencoded') {
    if (contype === 'application/json') {

    for (let attributename in body) {
      let str = JSON.stringify(body[attributename]);
      console.log('Inserting with: ' + attributename + ' = ' + str);
      body[attributename] = str;
    }

    const coordinates = await getCoordinates(body.address);
    if (coordinates.err) {
       // TODO: ML Add error handling here 
    }
    body = Object.assign(body, coordinates);
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
