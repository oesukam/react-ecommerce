import React from 'react';
import { shallow } from 'enzyme';
import { SingleItem, mapDispatchToProps, mapStateToProps } from '../../pages/SingleItem/SingleItem';
import initialState from '../../store/initialState';

let wrapper;

const props = {
  match: {
    params: { productId: 1 },
  },
  item: {},
  loadingItem: false,
  cartProductForm: {
    cart_id: 222,
    quantity: 1
  },
  submittingCartProduct: false,
  itemAttributes: {
    Color: [
      {
        attribute_value_id: 1,
        attribute_value: 'Blue'
      }
    ],
    Size: [{
      attribute_value_id: 2,
      attribute_value: 'M'
    }]
  },
  _getItem: jest.fn().mockImplementation(() => Promise.resolve(true)),
  _getCartId: jest.fn().mockImplementation(() => Promise.resolve(true)),
  _setCartField: jest.fn().mockImplementation(() => Promise.resolve(true)),
  _addToCart: jest.fn().mockImplementation(() => Promise.resolve(true)),
  _getItemAttributes: jest.fn().mockImplementation(() => Promise.resolve(true)),
}

describe('SingleItem.jsx', () => {
  test('should render SingleItem.jx', () => {
    wrapper = shallow(
      <SingleItem {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('reducers', () => {
    test('should return the initial state', () => {
      expect(mapStateToProps(initialState)).toHaveProperty('submittingCartProduct')
    })
  });
  describe('actions creators', () => {
    test('should call _getItem action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._getItem();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _getCartId action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._getCartId();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _setCartField action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._setCartField();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _addToCart action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._addToCart();
      expect(dispatch).toHaveBeenCalled();
    });

    test('should call _getItemAttributes action', () => {
      const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true));
      mapDispatchToProps(dispatch)._getItemAttributes();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
