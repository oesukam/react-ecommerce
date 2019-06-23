import * as types from '../../actions-types/cartActionsTypes';
import reducer from '../../reducers/cartReducer';
import {
  cart as initialState
} from '../../store/initialState';

describe('cartReducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test(`should handle ${types.CLEARING_CART}`, () => {
    const payload = true;
    const action = {
      type: types.CLEARING_CART,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      clearingCart: payload,
    });
  });

  test(`should handle ${types.SET_LOADING_CART_PRODUCT}`, () => {
    const payload = true;
    const action = {
      type: types.SET_LOADING_CART_PRODUCT,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      loadingCartProduct: payload,
    });
  });

  test(`should handle ${types.SET_SUBMITTING_CART_PRODUCT}`, () => {
    const payload = true;
    const action = {
      type: types.SET_SUBMITTING_CART_PRODUCT,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      submittingCartProduct: payload,
    });
  });

  test(`should handle ${types.SET_LOADING_CART_PRODUCTS}`, () => {
    const payload = true;
    const action = {
      type: types.SET_LOADING_CART_PRODUCTS,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      loadingCartProducts: payload,
    });
  });

  test(`should handle ${types.SET_CART_PRODUCTS}`, () => {
    const payload = [];
    const action = {
      type: types.SET_CART_PRODUCTS,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      cartProducts: payload,
    });
  });

  test(`should handle ${types.UPDATE_CART_ITEM} with wrong itemId`, () => {
    const payload = 1;
    const action = {
      type: types.UPDATE_CART_ITEM,
      payload,
    };
    expect(reducer({
      cartProducts: [{
        item_id: 1
      }]
    }, action)).toEqual({
      cartProducts: [{
        item_id: 1
      }],
    });
  });

  test(`should handle ${types.UPDATE_CART_ITEM}`, () => {
    const payload = {
      itemId: 1,
    };
    const action = {
      type: types.UPDATE_CART_ITEM,
      payload,
    };
    expect(reducer({
      cartProducts: [{
        item_id: 1
      }]
    }, action)).toEqual({
      cartProducts: [{
        item_id: 1
      }],
    });
  });

  test(`should handle ${types.SET_DELETING_CART_ITEM} with wrong itemId`, () => {
    const payload = 2;
    const action = {
      type: types.SET_DELETING_CART_ITEM,
      payload,
    };
    expect(reducer({
      cartProducts: [{
        item_id: 1
      }]
    }, action)).toEqual({
      cartProducts: [{
        item_id: 1
      }],
    });
  });

  test(`should handle ${types.SET_DELETING_CART_ITEM}`, () => {
    const payload = 1;
    const action = {
      type: types.SET_DELETING_CART_ITEM,
      payload,
    };
    expect(reducer({
      cartProducts: [{
        item_id: 1
      }]
    }, action)).toEqual({
      cartProducts: [{
        item_id: 1,
        deleting: true
      }],
    });
  });

  test(`should handle ${types.DELETE_CART_ITEM} with wrong itemId`, () => {
    const payload = 2;
    const action = {
      type: types.DELETE_CART_ITEM,
      payload,
    };
    expect(reducer({
      cartProducts: [{
        item_id: 1
      }]
    }, action)).toEqual({
      cartProducts: [{
        item_id: 1
      }],
    });
  });

  test(`should handle ${types.DELETE_CART_ITEM}`, () => {
    const payload = 1;
    const action = {
      type: types.DELETE_CART_ITEM,
      payload,
    };
    expect(reducer({
      cartProducts: [{
        item_id: 1
      }]
    }, action)).toEqual({
      cartProducts: [],
    });
  });

  test(`should handle ${types.SET_CART_PRODUCT}`, () => {
    const payload = {};
    const action = {
      type: types.SET_CART_PRODUCT,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      cartProduct: payload,
    });
  });

  test(`should handle ${types.SET_CART_TOTAL_AMOUNT}`, () => {
    const payload = 1;
    const action = {
      type: types.SET_CART_TOTAL_AMOUNT,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      cartTotalAmount: payload,
    });
  });

  test(`should handle ${types.SET_CART_PRODUCT_FORM}`, () => {
    const payload = {};
    const action = {
      type: types.SET_CART_PRODUCT_FORM,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      cartProductForm: payload,
    });
  });

  test(`should handle ${types.SET_CART_PRODUCT_FORM_FIELD}`, () => {
    const payload = {
      name: 'name',
      value: 'value',
    };
    const action = {
      type: types.SET_CART_PRODUCT_FORM_FIELD,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      cartProductForm: {
        [payload.name]: payload.value
      },
    });
  });

  test(`should handle ${types.CLEAR_CART_PRODUCT_FORM}`, () => {
    const action = {
      type: types.CLEAR_CART_PRODUCT_FORM,
    };
    expect(reducer({
      cartProductForm: {}
    }, action)).toEqual({
      cartProductForm: {
        cart_id: undefined,
        attributes: "",
        color: "",
        product_id: "",
        quantity: 1,
        size: "",
      },
    });
  });

  test(`should handle ${types.SET_CART_ERROR}`, () => {
    const payload = {
      field: 'name',
      message: 'message',
    };
    const action = {
      type: types.SET_CART_ERROR,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      error: payload,
    });
  });

  test(`should handle ${types.SET_CART_MODAL}`, () => {
    const payload = true;
    const action = {
      type: types.SET_CART_MODAL,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      cartModal: payload,
    });
  });
});