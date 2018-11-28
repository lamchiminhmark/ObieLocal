/*
NOTES:
-price is not contained in the JSON object. Use ticket_cost?
-Description can be very long, written in html

*/

const mariadb = require('mariadb');

// This bit sets the login and database for the 'mariadb' module
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'editor',
  password: 'changeThePocket',
  database: 'obielocal'
});

// This establishes the connection and prints out a success/failure message
pool
  .getConnection()
  .then(conn => {
    console.log('connected! connection id is ' + conn.threadId);
    conn.end(); // release to pool
  })
  .catch(err => {
    console.log('not connected due to error: ' + err);
  });
console.log('hi');

// This bit uses the 'request' module to grab the json object from calendar.oberlin.edu API
const request = require('request');
request(
  'https://calendar.oberlin.edu/api/2/events',
  { json: true },
  (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log(body.events.length);
    for (var i = 0; i < body.events.length; i++) {
      //console.log(body.events[i].event["title"]);
      /*
        var sql = "INSERT INTO Events (ID, title, created_at, updated_at, location_name, created_by, recurring, free, price, verified, venue_id, venue_url, filters, description, photo_url, address ) VALUES ?";

        var values = [i, body.events[i].event["title"], '2018-06-19 15:37:27', '2018-06-19 15:37:27',
                      body.events[i].event["location_name"], body.events[i].event["created_by"], body.events[i].event["recurring"],
                      body.events[i].event["free"], body.events[i].event["price"], body.events[i].event["verified"], body.events[i].event["venue_id"],
                      body.events[i].event["venue_url"], body.events[i].event["filters"], body.events[i].event["description"], body.events[i].event["photo_url"],
                      body.events[i].event["address"] ];
				console.log(values);

        pool.query(sql, [values], function (err, result) {
          if (err) throw err;
          console.log("Number of records inserted: " + result.affectedRows);
        });

        */

      console.log(i);
      var id = body.events[i].event['id'];
      var title = body.events[i].event['title'];
      if (title != null) {
        title = title.replace("'", "''");
      }
      console.log(title);
      var created_at = body.events[i].event['created_at'];
      var updated_at = body.events[i].event['updated_at'];
      var location_name = body.events[i].event['location_name'];
      if (location_name != null) {
        location_name = location_name.replace("'", "''");
      }
      var created_by = body.events[i].event['created_by'];
      if (created_by != null) {
        created_by = created_by.toString();
      }
      var recurring = body.events[i].event['recurring'] ? 1 : 0;
      var free = body.events[i].event['free'] ? 1 : 0;
      var price = body.events[i].event['price'];
      price = 0;
      var verified = body.events[i].event['verified'] ? 1 : 0;
      var venue_id = body.events[i].event['venue_id'];
      if (venue_id == null) {
        venue_id = 0;
      }
      var venue_url = body.events[i].event['venue_url'];
      if (venue_url != null) {
        venue_url = venue_url.replace("'", "''");
      }
      var filters = body.events[i].event['filters'];
      //if (filters != null) {filters = filters.replace("\'","\'\'");}
      var description = body.events[i].event['description'];
      if (description != null) {
        description = description.replace("'", "''");
      }
      var photo_url = body.events[i].event['photo_url'];
      if (photo_url != null) {
        photo_url = photo_url.replace("'", "''");
      }
      var address = body.events[i].event['address'];
      if (address != null) {
        address = address.replace("'", "''");
      }

      pool
        .query(
          'INSERT INTO Events (ID, title, created_at, updated_at, location_name, created_by, recurring, free, price, verified, venue_id, venue_url, filters, description, photo_url, address ) VALUES (' +
            id +
            ",'" +
            title +
            "', '2008-11-11 13:23:44', '2008-11-11 13:23:44','" +
            location_name +
            "','" +
            created_by +
            "','1','" +
            free +
            "'," +
            price +
            ",'" +
            verified +
            "','" +
            venue_id +
            "','" +
            venue_url +
            "','" +
            filters +
            "','" +
            description +
            "','" +
            photo_url +
            "','" +
            address +
            "')"
        )
        .then(rows => {
          console.log(rows);
          //rows.forEach(row => console.log(row));
        })
        .catch(err => {
          console.log(err);
        });

      //rows.forEach(row => console.log(row));
    }
  }
);

//(titleV, created_atV, updated_atV, location_nameV, created_byV, recurringV, freeV, priceV, verifiedV, venue_idV, venue_urlV, filtersV, descriptionV, photo_urlV, addressV )

/*
//scrap code
title: anEvent.event["title"],
 description: anEvent.event['description'],
 url: anEvent.event['url'],
 category: categories[randomNum],
latitude: anEvent.event["geo"]["latitude"],
longitude: anEvent.event["geo"]["longitude"],
 start: anEvent.event["event_instances"][0].event_instance["start"],
 end: anEvent.event["event_instances"][0].event_instance["end"] })
 */

/*
 var titleV = body.events[i].event["title"];
 var anEventV = body.events[i];
 var created_atV = body.events[i].event["created_at"];
 var updated_atV = body.events[i].event["updated_at"];
 var location_nameV = body.events[i].event["location_name"];
 var created_byV = body.events[i].event["created_by"];
 var recurringV = body.events[i].event["recurring"];
 var freeV = body.events[i].event["free"];
 var priceV = body.events[i].event["price"];
 var verifiedV = body.events[i].event["verified"];
 var venue_idV = body.events[i].event["venue_id"];
 var venue_urlV = body.events[i].event["venue_url"];
 var filtersV = body.events[i].event["filters"];
 var descriptionV = body.events[i].event["description"];
 var photo_urlV = body.events[i].event["photo_url"];
 var addressV = body.events[i].event["address"];
 */

//updated_at is null
