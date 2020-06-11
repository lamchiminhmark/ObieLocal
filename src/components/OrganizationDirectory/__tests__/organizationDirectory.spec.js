import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { OrganizationDirectory, StyledSearchDiv } from '../';

Enzyme.configure({ adapter: new Adapter() });

const organizationList = [
  {
    id: '001',
    name: 'Green Org',
    attributes: ['loud', 'fun', 'exciting'],
  },
  {
    id: '002',
    name: 'Blue Org',
    attributes: ['quiet', 'boring', 'exciting'],
  },
];

const wrapper = mount(
  <OrganizationDirectory organizationList={organizationList} />
);

// TODO(CP): Add test for org details
describe('OrganizationDirectory', () => {
  it('renders the wrapper div', () => {
    expect(wrapper.find('div#orgdir')).toHaveLength(1);
  });

  it('renders the search bar div', () => {
    expect(wrapper.find(StyledSearchDiv)).toHaveLength(1);
  });

  it('renders the correct number of org list items', () => {
    expect(wrapper.find('.orglist-item')).toHaveLength(2);
  });

  it('filters organizations based on search text', () => {
    wrapper.find('input#orgdir-searchbox').simulate('change', {
      target: { value: 'green' },
    });
    expect(wrapper.find('.orglist-item')).toHaveLength(1);
    wrapper.find('input#orgdir-searchbox').simulate('change', {
      target: { value: 'exciting' },
    });
    expect(wrapper.find('.orglist-item')).toHaveLength(2);
    wrapper.find('input#orgdir-searchbox').simulate('change', {
      target: { value: 'quiet' },
    });
    expect(wrapper.find('.orglist-item')).toHaveLength(1);
    wrapper.find('input#orgdir-searchbox').simulate('change', {
      target: { value: '' },
    });
  });
});
