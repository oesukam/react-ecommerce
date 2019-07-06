import React from 'react';
import { shallow } from 'enzyme';
import {
  OrderModal,
  mapStateToProps,
  mapDispatchToProps
} from '../../../components/OrderModal/OrderModal';
import initialState from '../../../store/initialState';
let wrapper;
const props = {
  orders: [],
  cartId: 1,
  clearingOrder: false,
  orderStep: 'Delivery',
  orderSteps: ['Delivery', 'Confirmation', 'Payment', 'Finish'],
  submittingOrder: false,
  userError: {},
  user: {},
  loggingIn: false,
  updatingUser: false,
  updatingUserAddress: false,
  regions: [],
  region: '',
  cartProducts: [],
  allTax: [],
  cartTotalAmount: 10,
  stripeToken: {},
  _setOrderModal: jest.fn(),
  _handleUserInput: jest.fn(),
  _fetchOrders: jest.fn(),
  _setOrderStep: jest.fn(),
  _submitOrder: jest.fn(),
  _submitOrderPayment: jest.fn(),
  _generateCartId: jest.fn(),
  _submitEmptyCart: jest.fn(),
  _generateStripToken: jest.fn(),
}
describe('OrderModal.jsx', () => {
  test('should render OrderModal.jx', () => {
    wrapper = shallow(
      <OrderModal {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('reducers', () => {
    test('should return the initial state', () => {
      expect(mapStateToProps(initialState)).toHaveProperty('loggingIn')
    })
  });

  describe('actions creators', () => {
    test('should call _setOrderModal action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._setOrderModal();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _handleUserInput action', () => {
      const event = { target: { name: 'name', value: 'value' }};
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(event));
      mapDispatchToProps(dispatch)._handleUserInput(event);
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _fetchOrders action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._fetchOrders();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _setOrderStep action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._setOrderStep();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _submitOrder action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._submitOrder();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _submitOrderPayment action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._submitOrderPayment();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _generateCartId action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._generateCartId();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _submitEmptyCart action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._submitEmptyCart();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _generateStripToken action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._generateStripToken();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
