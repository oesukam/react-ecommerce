import * as types from '../../actions-types/orderActionsTypes';
import reducer from '../../reducers/orderReducer';
import {
  order as initialState
} from '../../store/initialState';

describe('orderReducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test(`should handle ${types.CLEARING_ORDER}`, () => {
    const payload = true;
    const action = {
      type: types.CLEARING_ORDER,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      clearingOrder: payload,
    });
  });

  test(`should handle ${types.SET_LOADING_ORDER}`, () => {
    const payload = true;
    const action = {
      type: types.SET_LOADING_ORDER,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      loadingOrder: payload,
    });
  });

  test(`should handle ${types.SET_SUBMITTING_ORDER}`, () => {
    const payload = true;
    const action = {
      type: types.SET_SUBMITTING_ORDER,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      submittingOrder: payload,
    });
  });

  test(`should handle ${types.SET_LOADING_ORDERS}`, () => {
    const payload = true;
    const action = {
      type: types.SET_LOADING_ORDERS,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      loadingOrders: payload,
    });
  });

  test(`should handle ${types.SET_ORDERS}`, () => {
    const payload = [];
    const action = {
      type: types.SET_ORDERS,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      orders: payload,
    });
  });

  test(`should handle ${types.SET_ORDER}`, () => {
    const payload = {};
    const action = {
      type: types.SET_ORDER,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      order: payload,
    });
  });

  test(`should handle ${types.SET_ALL_TAX}`, () => {
    const payload = [];
    const action = {
      type: types.SET_ALL_TAX,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      allTax: payload,
    });
  });

  test(`should handle ${types.SET_SINGLE_TAX}`, () => {
    const payload = {};
    const action = {
      type: types.SET_SINGLE_TAX,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      tax: payload,
    });
  });

  test(`should handle ${types.SET_ORDER_FORM}`, () => {
    const payload = {};
    const action = {
      type: types.SET_ORDER_FORM,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      orderForm: payload,
    });
  });

  test(`should handle ${types.SET_ORDER_FORM_FIELD}`, () => {
    const payload = {
      name: 'name',
      value: 'value',
    };
    const action = {
      type: types.SET_ORDER_FORM_FIELD,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      orderForm: {
        [payload.name]: payload.value
      },
    });
  });

  test(`should handle ${types.CLEAR_ORDER_FORM}`, () => {
    const action = {
      type: types.CLEAR_ORDER_FORM,
    };
    expect(reducer({
      orderForm: {}
    }, action)).toEqual({
      orderForm: {
        order_id: undefined,
        shipping_id: '',
        tax_id: 1,
      },
    });
  });

  test(`should handle ${types.SET_ORDER_ERROR}`, () => {
    const payload = {
      field: 'name',
      message: 'message',
    };
    const action = {
      type: types.SET_ORDER_ERROR,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      error: payload,
    });
  });

  test(`should handle ${types.SET_ORDER_MODAL}`, () => {
    const payload = true;
    const action = {
      type: types.SET_ORDER_MODAL,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      orderModal: payload,
      submittingOrder: false,
      orderStep: 'Delivery',
    });
  });

  test(`should handle ${types.SET_ORDER_STEP}`, () => {
    const payload = 'Delivery';
    const action = {
      type: types.SET_ORDER_STEP,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      orderStep: payload,
      submittingOrder: false,
    });
  });

  test(`should handle ${types.SET_STRIPE_TOKEN}`, () => {
    const payload = 'token';
    const action = {
      type: types.SET_STRIPE_TOKEN,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      stripeToken: payload,
    });
  });
});