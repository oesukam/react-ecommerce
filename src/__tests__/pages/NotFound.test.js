import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../pages/NotFound/NotFound';

let wrapper;

describe('NotFound.jsx', () => {
  test('should render NotFound.jx', () => {
    wrapper = shallow(
      <NotFound />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
