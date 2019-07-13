import expect from "expect";
import {
  FETCH_DATA,
  SET_SELECTED_EVENTS,
  TOGGLE_EVENT
} from "../../actions/types";
import eventsReducer from "../eventsReducer";

describe("events reducer", () => {
  it("return initial state", () => {
    expect(eventsReducer(undefined, {})).toEqual({
        allMarkers: [],
        selectedEventsArray: [{ ID: 0 }],
        activeEventIdx: 0
      });
  });

  it("shoud handle FETCH_DATA", () => {
    expect(
      eventsReducer(
        {
          activeEventIdx: 10,
          allMarkers: [{ someStuff: "someStuff" }, { someStuff: "otherStuff" }]
        },
        {
          type: FETCH_DATA,
          payload: [
            {
              geo: { longitude: 1, latitude: 1 },
              events: [{ a: "a", b: "b", c: "c" }, { a: "a", b: "b", c: "c" }]
            },
            {
              geo: { longitude: 2, latitude: 2 },
              events: [{ a: "a", b: "b", c: "c" }]
            }
          ]
        }
      )
    ).toEqual({
      activeEventIdx: 10,
      allMarkers: [
        {
          geo: { longitude: 1, latitude: 1 },
          events: [{ a: "a", b: "b", c: "c" }, { a: "a", b: "b", c: "c" }]
        },
        {
          geo: { longitude: 2, latitude: 2 },
          events: [{ a: "a", b: "b", c: "c" }]
        }
      ]
    });
  });

  it("should handle SET_SELECTED_EVENT", () => {
    expect(eventsReducer( {
        activeEventIdx: 10,
        selectedEventsArray: [{ someStuff: "someStuff" }, { someStuff: "otherStuff" }]
      },
      {
        type: SET_SELECTED_EVENTS,
        selectedEventsArray: [{ a: "a", b: "b", c: "c" }, { a: "a", b: "b", c: "c" }]
      })).toEqual({
          activeEventIdx: 0,
          selectedEventsArray: [{ a: "a", b: "b", c: "c" }, { a: "a", b: "b", c: "c" }]
      });
  });

  it("should handle TOGGLE_EVENT",() => {
      expect(eventsReducer({
        activeEventIdx: 5,
        selectedEventsArray: [{ a: "a", b: "b", c: "c" }, { a: "a", b: "b", c: "c" }]
      },
      {
        type: TOGGLE_EVENT,
        direction: 'NEXT'
      })).toEqual({
          activeEventIdx: 6,
          selectedEventsArray: [{ a: "a", b: "b", c: "c" }, { a: "a", b: "b", c: "c" }]
      });
      expect(eventsReducer({
        activeEventIdx: 5,
        selectedEventsArray: [{ a: "a", b: "b", c: "c" }, { a: "a", b: "b", c: "c" }]
      },
      {
        type: TOGGLE_EVENT,
        direction: 'PREV'
      })).toEqual({
          activeEventIdx: 4,
          selectedEventsArray: [{ a: "a", b: "b", c: "c" }, { a: "a", b: "b", c: "c" }]
      });
    });
})
