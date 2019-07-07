import React from 'react';
import { shallow } from 'enzyme';
import OrderFinish from '../../../components/OrderModal/OrderFinish';

let wrapper;

describe('OrderFinish.jsx', () => {
  test('should render OrderFinish.jx', () => {
    wrapper = shallow(
      <OrderFinish  />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
