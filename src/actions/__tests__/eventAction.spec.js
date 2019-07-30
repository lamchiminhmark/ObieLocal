import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import expect from "expect";
import { FETCH_DATA } from "../types";
import { fetchData, toMarkerArray } from "../eventActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const event0 = {
  ID: 3024258336072,
  title: "test event 1",
  created_at: null,
  updated_at: null,
  location_name: null,
  created_by: null,
  recurring: 0,
  free: 1,
  price: null,
  verified: 0,
  venue_id: null,
  venue_url: null,
  filters: null,
  description: null,
  photo_url: null,
  address: null,
  latitude: 41.295918,
  longitude: -82.221467,
  start_time: "2019-06-05T12:30:00.000Z",
  end_time: null
};
const event1 = {
  ID: 30343558336072,
  title: "test event 2",
  created_at: null,
  updated_at: null,
  location_name: null,
  created_by: null,
  recurring: 0,
  free: 1,
  price: null,
  verified: 0,
  venue_id: null,
  venue_url: null,
  filters: null,
  description: null,
  photo_url: null,
  address: null,
  latitude: 41.295918,
  longitude: -82.221467,
  start_time: "2019-06-05T12:00:00.000Z",
  end_time: null
};
const event2 = {
  ID: 30502825421212,
  title: "The Underground Cabaret: Unsung Sondheim",
  created_at: "2019-06-10T12:12:34.000Z",
  updated_at: "2019-07-11T09:15:43.000Z",
  location_name: "Birenbaum Innovation and Performance Space",
  created_by: "51538",
  recurring: 1,
  free: 1,
  price: 0,
  verified: 1,
  venue_id: 342701,
  venue_url:
    "https://calendar.oberlin.edu/william_and_helen_birenbaum_innovation_and_performance_space_241",
  filters: "[object Object]",
  description:
    "<p>Oberlin Summer Theater Festival has added a new feature: The Underground Cabaret.</p>\r\n\r\n<p>Program features vocal performances of songs from American musicals performed live to piano accompaniment. The cabaret will be performed in rotating repertory . Shows&nbsp;directed by Chris Flaharty with musical direction by Alex Ngo.</p>\r\n\r\n<p>Program incudes three shows:<br />\r\n<b>I Wish I Were in Love Again - </b>Opens June 22<br />\r\nLove Songs by Rodgers and Hart<br />\r\n<i>A romp through the many aspects of love with this famous pair of songwriters who gave the American Songbook some of its most classic songs.</i>&nbsp;</p>\r\n\r\n<p><b>Lost Broadway - </b>Opens June 26<br />\r\nGreat Songs from Shows You Never Knew<br />\r\n<i>Celebrating the joy, wit, desire, heartache&mdash;and sheer fun of wonderful songs from Broadway&rsquo;s Also-rans.</i></p>\r\n\r\n<p><b>Unsung Sondheim - </b>Opens July 11<br />\r\nRare Songs from a Superb American Master<br />\r\n<i>A medley of Stephen Sondheim&rsquo;s lesser-known songs both rare and luminous.</i></p>\r\n\r\n<p>Purchase tickets in advance or at the door.</p>\r\n\r\n<p>The Oberlin Summer Theater Festival is made possible by generous support from Oberlin College, the city of Oberlin/Oberlin Business Partnership, Nord Family Foundation,&nbsp;Nordson Corporation Foundation, Ohio Arts Council, and audience members.</p>\r\n",
  photo_url:
    "https://images.localist.com/photos/483635/huge/af5179c79acc73be7aeb3267575cb7a4f61c6e77.jpg",
  address: "10 E. College St., Oberlin, Ohio 44074",
  latitude: 41.291649,
  longitude: -82.217019,
  start_time: "2019-07-12T00:00:00.000Z",
  end_time: null
};
const mockEvents = [event0, event1, event2];

let markerEvent0 = Object.assign({}, event0);
delete markerEvent0.longitude;
delete markerEvent0.latitude;
let markerEvent1 = Object.assign({}, event1);
delete markerEvent1.longitude;
delete markerEvent1.latitude;
let markerEvent2 = Object.assign({}, event2);
delete markerEvent2.longitude;
delete markerEvent2.latitude;

const expectedMarkerArray = [
  {
    geo: { latitude: event0.latitude, longitude: event0.longitude },
    events: [markerEvent1, markerEvent0]
  },
  {
    geo: { latitude: event2.latitude, longitude: event2.longitude },
    events: [markerEvent2]
  }
];

describe("fetch data and returns marker array", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it("toMarkerElement returns correctly", () => {
    expect(mockEvents.reduce(toMarkerArray,[])).toEqual(expectedMarkerArray);
  });

  it("fetches from API and dispatch action", () => {
    fetchMock.getOnce('/events', mockEvents).catch(unmatchedUrl => {
        // fallover call original fetch, because fetch-mock treats
        // any unmatched call as an error - its target is testing
        console.log("Unmatched " + unmatchedUrl);
      });

    const expectedReturn = {
      type: FETCH_DATA,
      payload: expectedMarkerArray
    };
    const store = mockStore({allMarkers: []});

    return store.dispatch(fetchData()).then(() => {
      expect(store.getActions()).toEqual([expectedReturn]);
    });
  });
});


