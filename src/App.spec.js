import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { App } from "./App";
import NavBar from "./components/NavBar";
import MapContainer from "./components/MapContainer";
import Sidepane from "./components/Sidepane";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("react-ga") //mock the react-ga module

function setup() {
  const props = {
    getAllMarkers: jest.fn(),
    events: [{id: 'event1'}, {id: 'event2'}, {id: 'event3]'}],
  };

  const enzymeWrapper = shallow(<App {...props} />);

  return {
    props,
    enzymeWrapper
  };
}


describe("App component", () => {

  it("Should render a div of subcomponents", () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find("div").hasClass("App")).toBe(true);
    expect(enzymeWrapper.find("div").contains(<NavBar/>)).toBe(true);
    expect(enzymeWrapper.find("div").contains(<MapContainer/>)).toBe(true);
    expect(enzymeWrapper.find("div").contains(<Sidepane/>)).toBe(true);
  });

  it("Should call getAllMarkers when component is mounted", () => {
    const { props } = setup();
    expect(props.getAllMarkers.mock.calls.length).toBe(1);
  });
});
