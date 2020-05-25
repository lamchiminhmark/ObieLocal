import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Marker } from "../../Marker";
import ConnectedMap from "../";
import GoogleMapReact from "google-map-react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

Enzyme.configure({ adapter: new Adapter() });

const dt = new Date();
const today = new Date();
const tmr = new Date();
tmr.setDate(dt.getDate() + 1);
const day7 = new Date();
day7.setDate(dt.getDate() + 7);
const state = {
  map: {
    lat: 9.99999,
    lng: 8.88888,
    zoom: 20
  },
  filter: {
    filterDay: 0
  },
  markers: {
    arr: [
      {
        geo: { latitude: 5, longitude: 5 },
        events: [
          { ID: 1, verified: 1, start_time: today },
          { ID: 2, verified: 1, start_time: tmr }
        ]
      },
      {
        geo: { latitude: 3, longitude: 3 },
        events: [{ ID: 3, verified: 1, start_time: tmr }]
      },
      {
        geo: { latitude: 1, longitude: 1 },
        events: [
          { ID: 4, verified: 0, start_time: today },
          { ID: 5, verified: 0, start_time: tmr }
        ]
      },
      {
        geo: { latitude: 10, longitude: 10 },
        events: [
          { ID: 6, verified: 0, start_time: tmr },
          { ID: 7, verified: 0, start_time: day7 }
        ]
      }
    ]
  }
};

function setup(state) {
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
    const wrapper = setup(state);
    expect(wrapper.find("div").exists()).toBe(true);
    expect(wrapper.find(GoogleMapReact).exists()).toBe(true);
    expect(wrapper.find(GoogleMapReact).props().center).toEqual({
      lat: 9.99999,
      lng: 8.88888
    });
    expect(wrapper.find(GoogleMapReact).props().zoom).toEqual(20);
  });

  it("Should render markers today", () => {
    const wrapper = setup(state);
    expect(wrapper.find(Marker)).toHaveLength(2);
  })

  it("Should render markers for tomorrow" ,() => {
    const stateTomorrow = {...state, filter: {filterDay: 1}}
    const wrapper = setup(stateTomorrow);
    const markers = wrapper.find(Marker)
    expect(markers).toHaveLength(4);
    expect(markers.get(0).props.eventArray).toHaveLength(1);
    expect(markers.get(2).props.eventArray[0].ID).toBe(5);
  })

  it("Should render markers happening in  7 days" ,() => {
    const state7days = {...state, filter: {filterDay: 7}}
    const wrapper = setup(state7days);
    expect(wrapper.find(Marker)).toHaveLength(1);
    expect(wrapper.find(Marker).get(0).props.eventArray[0].ID).toBe(7)

  })
});
