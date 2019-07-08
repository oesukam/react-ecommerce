import React from 'react';
import { shallow } from 'enzyme';
import ItemsLoader from '../../components/ContentLoader/ItemsLoader';

let wrapper;

describe('ItemsLoader.jsx', () => {
  test('should render ItemsLoader.jx', () => {
    wrapper = shallow(
      <ItemsLoader />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
