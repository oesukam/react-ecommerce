import React from 'react';
import {
  shallow,
} from 'enzyme';
import { Footer } from '../../components/Footer/Footer';

let wrapper;
const props = {
  departments: [{
    department_id: 1,
    name: 'name'
  }, {
    department_id: 2,
    name: 'name'
  }]
}

describe('Footer.jsx', () => {
  test('should render Footer.jx', () => {
    wrapper = shallow(<Footer {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});