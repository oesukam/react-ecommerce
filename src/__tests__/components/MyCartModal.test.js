import React from 'react';
import { shallow } from 'enzyme';
import {
  MyCartModal,
  mapStateToProps,
  mapDispatchToProps
} from '../../components/MyCartModal/MyCartModal';
import initialState from '../../store/initialState';

let wrapper;
const props = {
  cartProducts: [
    {
      item_id: 1,
      name: 'name',
      attributes: 'S, White',
      quantity: 2,
    }
  ],
  cartProductsCount: 1,
  cartId: 1,
  clearingCart: false,
  isAuth: false,
  cartTotalAmount: 1,
  _setCartModal: jest.fn(),
  _updateCartProduct: jest.fn(),
  _fetchCartProducts: jest.fn(),
  _submitDeleteCartItem: jest.fn(),
  _submitEmptyCart: jest.fn(),
  _setOrderModal: jest.fn(),
  _setAuthModal: jest.fn(),
};
describe('MyCartModal.jsx', () => {
  test('should render MyCartModal.jx', () => {
    wrapper = shallow(
      <MyCartModal {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('reducers', () => {
    test('should return the initial state', () => {
      expect(mapStateToProps(initialState)).toHaveProperty('cartId')
    })
  });

  describe('actions creators', () => {
    const cartId = 10;
    const itemId = 1;
    const item = {}

    test('should call _setCartModal action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._setCartModal();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _updateCartProduct action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._updateCartProduct({ cartId, itemId, item });
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _fetchCartProducts action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._fetchCartProducts();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _submitDeleteCartItem action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._submitDeleteCartItem({ itemId, cartId });
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _submitEmptyCart action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._submitEmptyCart();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _setOrderModal action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._setOrderModal();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _setAuthModal action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._setAuthModal();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
