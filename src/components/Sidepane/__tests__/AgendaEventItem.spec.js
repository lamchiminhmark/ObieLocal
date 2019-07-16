import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AgendaEventItem from "../AgendaEventItem";

Enzyme.configure({ adapter: new Adapter() });

function deepRender(props) {
  const wrapper = mount(<AgendaEventItem {...props} />);
  return wrapper;
}
describe("AgendaEventItem Component", () => {
    const mockHandle = jest.fn()
  const props = {
    key: 1,
    event: {
      ID: 1,
      title: 'a',
      photo_url: "https",
      verified: 0,
      start_time: "2019-06-05T12:00:00.000Z",
      end_time: "2019-06-05T12:30:00.000Z",
      description: 'a-desc',
      location_name: 'oberlin'
    },
    handleAgendaClick: mockHandle,
  };
  const wrapper = deepRender(props);
  it('Test click event', () => {
    wrapper.find('button').simulate('click');
    expect(mockHandle.mock.calls.length).toEqual(1);
  });
});
