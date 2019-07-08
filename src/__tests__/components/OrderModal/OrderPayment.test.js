import React from 'react';
import { shallow } from 'enzyme';
import {
  OrderPayment,
  mapStateToProps,
} from '../../../components/OrderModal/OrderPayment';
import initialState from '../../../store/initialState';
let wrapper;
const props = {
  cartTotalAmount: 20,
  card: {
    mount: jest.fn()
  }
}

describe('OrderPayment.jsx', () => {
  test('should render OrderPayment.jx', () => {
    wrapper = shallow(
      <OrderPayment {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should not update on props change', () => {
    wrapper = shallow(
      <OrderPayment {...props} />
    );
    const cartTotalAmount = 30;
    wrapper.setProps({ cartTotalAmount: 30 });
    expect(wrapper.instance().props.cartTotalAmount).toBe(cartTotalAmount);
    expect(wrapper.instance().componentDidMount()).toBeFalsy();
  });

  describe('reducers', () => {
    test('should return the initial state', () => {
      expect(mapStateToProps(initialState)).toHaveProperty('cartTotalAmount')
    })
  });
});
