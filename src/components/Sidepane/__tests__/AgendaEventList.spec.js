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
describe("AgendaEventList Component", () => {
  const state = {
    events: {
      allMarkers: [
        {
          geo: { latitude: 5, longitude: 5 },
          events: [
            { ID: 1, verified: 1, start_time: "2019-06-05T12:00:00.000Z" },
            { ID: 2, verified: 1, start_time: "2019-06-05T12:30:00.000Z" }
          ]
        },
        {
          geo: { latitude: 3, longitude: 3 },
          events: [
            { ID: 3, verified: 1, start_time: "2019-06-05T12:15:00.000Z" }
          ]
        },
        {
          geo: { latitude: 1, longitude: 1 },
          events: [
            { ID: 4, verified: 0, start_time: "2019-06-05T12:20:00.000Z" },
            { ID: 5, verified: 0, start_time: "2019-06-05T11:50:00.000Z" }
          ]
        }
      ]
    }
  };
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
          { ID: 5, lat: 1, lng: 1, verified: 0, start_time: "2019-06-05T11:50:00.000Z" }
        ]
      });
    wrapper
      .find("button")
      .at(3)
      .simulate("click");
    actions = mockStore.getActions();
    const recenter = actions.pop()
    expect(recenter.type).toEqual("RECENTER_MAP");
    expect(recenter.lat).toBeLessThan(4);
    expect(actions.pop()).toEqual({
        type: "SET_SELECTED_EVENTS",
        selectedEventsArray: [
            { ID: 3, lat: 3, lng: 3, verified: 1, start_time: "2019-06-05T12:15:00.000Z" }
          ]
      }); 
  });
});
