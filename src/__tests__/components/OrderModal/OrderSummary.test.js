import React from 'react';
import { shallow } from 'enzyme';
import {
  OrderSummary,
  mapStateToProps,
} from '../../../components/OrderModal/OrderSummary';
import initialState from '../../../store/initialState';
let wrapper;
const props = {
  user: {},
  cartProducts: [
    {
      item_id: 1,
      name: 'name',
      price: 10,
      attributes: ''
    },
    {
      item_id: 1,
      name: 'name',
      price: 10,
      attributes: 'S, White'
    }
  ],
  cartTotalAmount: 30
}

describe('OrderSummary.jsx', () => {
  test('should render OrderSummary.jx', () => {
    wrapper = shallow(
      <OrderSummary {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('reducers', () => {
    test('should return the initial state', () => {
      expect(mapStateToProps(initialState)).toHaveProperty('user')
    })
  });
});
