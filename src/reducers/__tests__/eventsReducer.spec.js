import expect from "expect";
import {
  GET_ALL_MARKERS,
  SET_SELECTED_EVENTS,
  TOGGLE_EVENT,
} from "../../actions/types";
import markersReducer from "../markersReducer";

describe("markers reducer", () => {
  it("return initial state", () => {
    expect(markersReducer(undefined, {})).toEqual({
        arr: [],
        selectedEventsArray: [{ ID: 0 }],
        activeEventIdx: 0
      });
  });

  it("shoud handle GET_ALL_MARKERS", () => {
    expect(
      markersReducer(
        {
          activeEventIdx: 10,
          arr: [{ someStuff: "someStuff" }, { someStuff: "otherStuff" }]
        },
        {
          type: GET_ALL_MARKERS,
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
      arr: [
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
    expect(markersReducer( {
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
      expect(markersReducer({
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
      expect(markersReducer({
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
