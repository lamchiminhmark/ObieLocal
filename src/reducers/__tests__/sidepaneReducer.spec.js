import { TOGGLE_SIDE_PANE, CHANGE_TAB } from "../../actions/types";
import sidepaneReducer from "../sidepaneReducer";

describe("sidepane reducer", () => {
  it("return correct initial state", () => {
    expect(sidepaneReducer(undefined, {})).toEqual({
      createEventContainerOpen: false,
      sidepaneOpen: false,
      activeTab: "Event"
    });
  });

  it("Toggle (action with no payload)", () => {
    const stateFalse = {
      createEventContainerOpen: false,
      otherThings: 2,
      sidepaneOpen: false
    };
    const stateTrue = {
      createEventContainerOpen: false,
      otherThings: 2,
      sidepaneOpen: true
    };
    expect(
      sidepaneReducer(stateFalse, { type: TOGGLE_SIDE_PANE, payload: {} })
    ).toEqual({
      createEventContainerOpen: false,
      otherThings: 2,
      sidepaneOpen: true
    });
    expect(
      sidepaneReducer(stateTrue, { type: TOGGLE_SIDE_PANE, payload: {} })
    ).toEqual({
      createEventContainerOpen: false,
      otherThings: 2,
      sidepaneOpen: false
    });
  });

  it("Close sidepane", () => {
    const stateFalse = {
      createEventContainerOpen: false,
      otherThings: 2,
      sidepaneOpen: false
    };
    const stateTrue = {
      createEventContainerOpen: false,
      otherThings: 2,
      sidepaneOpen: true
    };
    expect(
      sidepaneReducer(stateTrue, {
        type: TOGGLE_SIDE_PANE,
        payload: { close: true }
      })
    ).toEqual({
      createEventContainerOpen: false,
      otherThings: 2,
      sidepaneOpen: false
    });
    expect(
      sidepaneReducer(stateFalse, {
        type: TOGGLE_SIDE_PANE,
        payload: { close: true }
      })
    ).toEqual({
      createEventContainerOpen: false,
      otherThings: 2,
      sidepaneOpen: false
    });
  });

  it("Not allow opening sidepane when creating event", () => {
    const state = {
      createEventContainerOpen: true,
      otherThings: 2,
      sidepaneOpen: false
    };
    expect(
      sidepaneReducer(state, { type: TOGGLE_SIDE_PANE, payload: {} })
    ).toEqual({...state});
  });

  it("Changing tab", () => {
    const state = {
      createEventContainerOpen: true,
      activeTab: "Event",
      sidepaneOpen: false
    };
    expect(
      sidepaneReducer(state, { type: CHANGE_TAB, payload: {tab: "Agenda" }})
    ).toEqual({ ...state, activeTab: "Agenda" });
    expect(
      sidepaneReducer(state, { type: CHANGE_TAB, payload: {tab: "Event" }})
    ).toEqual({ ...state });
  });
});
