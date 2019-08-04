import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ConnectedAgenda from "../AgendaEventList";
import AgendaEventItem from "../AgendaEventItem";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("react-ga");

function deepRender(state) {
  const mockStore = configureMockStore([])(state);
  const wrapper = mount(
    <Provider store={mockStore}>
      <ConnectedAgenda />
    </Provider>
  );

  return { mockStore, wrapper };
}

const dt = new Date();
const start1 = new Date("2019-06-05T05:00:00.000Z");
start1.setDate(dt.getDate());
const start2 = new Date("2019-06-05T05:30:00.000Z");
start2.setDate(dt.getDate());
const start3 = new Date("2019-06-05T05:15:00.000Z");
start3.setDate(dt.getDate());
const start4 = new Date("2019-06-05T05:30:00.000Z");
start4.setDate(dt.getDate());
const start5 = new Date("2019-06-05T05:20:00.000Z");
start5.setDate(dt.getDate());
const start6 = new Date("2019-06-05T05:20:00.000Z");
start6.setDate(dt.getDate() + 7);
const start7 = new Date();
start7.setDate(dt.getDate() + 1);
const state = {
  filter: {
    filterDay: 0
  },
  events: {
    allMarkers: [
      {
        geo: { latitude: 5, longitude: 5 },
        events: [
          { ID: 1, verified: 1, start_time: start1 },
          { ID: 2, verified: 1, start_time: start2 }
        ]
      },
      {
        geo: { latitude: 3, longitude: 3 },
        events: [{ ID: 3, verified: 1, start_time: start3 }]
      },
      {
        geo: { latitude: 1, longitude: 1 },
        events: [
          { ID: 4, verified: 0, start_time: start4 },
          { ID: 5, verified: 0, start_time: start5 }
        ]
      },
      {
        geo: { latitude: 10, longitude: 10 },
        events: [
          { ID: 6, verified: 0, start_time: start6 },
          { ID: 7, verified: 0, start_time: start7 }
        ]
      }
    ]
  }
};

describe("AgendaEventList Component", () => {
  const { wrapper, mockStore } = deepRender(state);
  it("Should render event in order (not-verified first, sooner start_time first)", () => {
    expect(wrapper.find(AgendaEventItem).get(0).key).toEqual("5");
    expect(wrapper.find(AgendaEventItem).get(1).key).toEqual("4");
    expect(wrapper.find(AgendaEventItem).get(2).key).toEqual("1");
    expect(wrapper.find(AgendaEventItem).get(3).key).toEqual("3");
    expect(wrapper.find(AgendaEventItem).get(4).key).toEqual("2");
  });

  it("Should change state on See More click", () => {
    wrapper
      .find("button")
      .first()
      .simulate("click");
    let actions = mockStore.getActions();
    expect(actions.pop().type).toEqual("RECENTER_MAP");
    expect(actions.pop()).toEqual({
      type: "SET_SELECTED_EVENTS",
      selectedEventsArray: [
        { ID: 5, lat: 1, lng: 1, verified: 0, start_time: start5 }
      ]
    });
    wrapper
      .find("button")
      .at(3)
      .simulate("click");
    actions = mockStore.getActions();
    const recenter = actions.pop();
    expect(recenter.type).toEqual("RECENTER_MAP");
    expect(recenter.lat).toBeLessThan(4);
    expect(actions.pop()).toEqual({
      type: "SET_SELECTED_EVENTS",
      selectedEventsArray: [
        { ID: 3, lat: 3, lng: 3, verified: 1, start_time: start3 }
      ]
    });
  });
});

describe("AgendaEventList with multi-day filter", () => {
  it("Should only render events happening tomorrow", () => {
    const stateTomorrow = { ...state, filter: { filterDay: 1 } };
    const { wrapper } = deepRender(stateTomorrow);
    expect(wrapper.find(AgendaEventItem)).toHaveLength(1);
    expect(wrapper.find(AgendaEventItem).get(0).key).toEqual("7");
  });
  it("Should only render events happening in 7 days", () => {
    const stateTomorrow = { ...state, filter: { filterDay: 7 } };
    const { wrapper } = deepRender(stateTomorrow);
    expect(wrapper.find(AgendaEventItem)).toHaveLength(1);
    expect(wrapper.find(AgendaEventItem).get(0).key).toEqual("6");
  });
});
