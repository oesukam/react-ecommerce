import React from 'react';
import { shallow, mount } from 'enzyme';
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
  _submitEmptyCart: jest.fn().mockImplementation(() => Promise.resolve(true)),
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

  test('should render MyCartModal.jx without cartId', () => {
    const newProps = {...props};
    newProps.cartId = '';
    wrapper = shallow(
      <MyCartModal {...newProps} />
    );
    expect(wrapper.instance().props.cartId).toBe('');
  });

  test('should render cartProduct empty attribute', () => {
    const newProps = {...props};
    newProps.cartProducts[0].attributes = '';
    wrapper = shallow(
      <MyCartModal {...newProps} />
    );
    expect(wrapper.instance().props.cartProducts[0].attributes).toBe('');
  });

  describe('when clicking on delete item', () => {
    test('should call _submitDeleteCartItem', () => {
      const newProps = {...props};
      newProps.cartProducts[0].deleting = true;
      wrapper = shallow(<MyCartModal {...props} />)

      wrapper.find('.cart-item__delete-btn').at(0).simulate('click')
      expect(wrapper.instance().props.cartProducts[0].deleting).toBeTruthy();
      expect(newProps._submitDeleteCartItem).toHaveBeenCalled();
    })
  });

  describe('when clicking on `Go to shop`', () => {
    test('should call _setCartModal without authentication', () => {
      const newProps = {...props};
      newProps.isAuth = false;
      newProps.cartProductsCount = 2;
      wrapper = shallow(<MyCartModal {...newProps} />)

      wrapper.find('.checkout-btn').simulate('click')
      expect(newProps._setCartModal).toHaveBeenCalled();
      expect(newProps._setOrderModal).toHaveBeenCalledWith('Delivery');
      expect(newProps._setAuthModal).toHaveBeenCalledWith('Sign In');
    });

    test('should call _setCartModal', () => {
      const newProps = {...props};
      newProps.isAuth = true;
      newProps.cartProductsCount = 2;
      wrapper = shallow(<MyCartModal {...newProps} />)

      wrapper.find('.checkout-btn').simulate('click')
      expect(newProps._setCartModal).toHaveBeenCalled();
      expect(newProps._setOrderModal).toHaveBeenCalledWith('Delivery');
    });
  });

  describe('when clicking on `Empty cart`', () => {
    test('should call _submitEmptyCart', () => {
      const newProps = {...props};
      wrapper = shallow(<MyCartModal {...newProps} />)
      wrapper.find('.empty-cart-btn').simulate('click')
      wrapper.setProps({
        clearingCart: true
      })
      expect(newProps._submitEmptyCart).toHaveBeenCalled();
      expect(newProps._setCartModal).toHaveBeenCalled();
    });
  });

  describe('when clicking on `Checkout`', () => {
    test('should call _setCartModal', () => {
      const newProps = {...props};
      wrapper = shallow(<MyCartModal {...props} />)

      wrapper.find('.back-btn').simulate('click')
      expect(newProps._setCartModal).toHaveBeenCalled();
    })
  });

  describe('when clicking on `+` button', () => {
    test('should call _setCartModal', () => {
      wrapper = mount(<MyCartModal {...props} />);
      wrapper.find('button[data-test="quantity-sub-btn"]').simulate('click');
      expect(props._updateCartProduct).toHaveBeenCalled();
    })
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
