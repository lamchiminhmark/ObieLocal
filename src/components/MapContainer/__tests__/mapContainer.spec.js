import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Marker } from "../../Marker";
import ConnectedMap from "../";
import GoogleMapReact from "google-map-react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const state = {
    map: {
      lat: 9.99999,
      lng: 8.88888,
      zoom: 20
    },
    events: {
      allMarkers: [
        {
          geo: { latitude: 5, longitude: 5 },
          events: [{ ID: 1, title: "a" }, { ID: 2, title: "b" }]
        },
        { geo: { latitude: 3, longitude: 3 }, events: [{ ID: 3, title: "c" }] },
        {
          geo: { latitude: 1, longitude: 1 },
          events: [{ ID: 4, title: "d" }, { ID: 5, title: "e" }]
        }
      ]
    }
  };
  const mockStore = configureMockStore([])(state);
  const wrapper = mount(
    <Provider store={mockStore}>
      <ConnectedMap />
    </Provider>
  );

  return wrapper;
}

describe("MapContainer component", () => {
  it("Should render GoogleMapReact", () => {
    const wrapper = setup()
    expect(wrapper.find("div").exists()).toBe(true);
    expect(wrapper.find(GoogleMapReact).exists()).toBe(true);
    expect(wrapper.find(GoogleMapReact).props().center).toEqual({
      lat: 9.99999,
      lng: 8.88888
    });
    expect(wrapper.find(GoogleMapReact).props().zoom).toEqual(20);
  });

  it("Should render Markers", () => {
    const wrapper = setup();
    expect(wrapper.find(Marker).exists()).toBe(true);
    expect(wrapper.find(Marker)).toHaveLength(3);
    expect(wrapper.find(Marker).get(0).props.eventArray).toEqual([
      { ID: 1, title: "a" },
      { ID: 2, title: "b" }
    ]);
    expect(wrapper.find(Marker).get(1).props.lat).toEqual(3);
    expect(wrapper.find(Marker).get(2).props.lng).toEqual(1);
    expect(wrapper.find(Marker).get(2).props.eventArray).toEqual([
        { ID: 4, title: "d" },
        { ID: 5, title: "e" }
      ]);
  });
});
