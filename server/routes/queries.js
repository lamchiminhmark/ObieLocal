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

/* GET all events from the database and send the stream as a response. */
router.get('/', function(req, res, next) {
  database.tryConnection();
  console.log('Received GET request!');
  database
    .selectAllEvents()
    .then(arr => res.send(arr))
    .catch(err => res.send(err));
});

/**
 * Use the Google Maps API to acquire geographical coordinates for an address.
 * @param {String} address
 * @returns {String} The coordinates of the given address.
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
  console.log(response.results.length);
  if (response.results.length === 0) {
    console.log('Error in getCoordinates');
    throw Error('Address not found');
  }
  const { lat, lng } = response.results[0].geometry.location;
  console.log('coordinates are ' + lat + ' ' + lng);
  return { latitude: lat, longitude: lng };
}

/* POST request to add events into the database.  */
router.post('/', async function(req, res, next) {
  var body = req.body;
  var contype = req.headers['content-type'];
  console.log(`contype: ${contype}`);
  if (contype === 'application/json') {
    // Protect against SQL injection.
    for (let attributename in body) {
      let str = JSON.stringify(body[attributename]);
      console.log('Inserting with: ' + attributename + ' = ' + str);
      body[attributename] = str;
    }
    let coordinates;
    try {
      coordinates = await getCoordinates(body.address);
    } catch (e) {
      console.log('Error has been caught');
      res.send(200, { addressUnknown: true }).end();
      return;
    }
    body = Object.assign(body, coordinates);
    database
      .insertEvent(body)
      .then(() => {
        res.send(200, { eventAdded: true }).end();
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
