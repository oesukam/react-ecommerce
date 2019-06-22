import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import 'isomorphic-fetch';
import * as actions from '../../actions/cartActions';
import * as types from '../../actions-types/cartActionsTypes';

const { API_URL = 'http://localhost' } = process.env;
const mockStore = configureStore([thunk]);
let store;
jest.setTimeout(30000);

describe('cartActions', () => {
  describe('synchronous', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    test(`should dispatch ${types.SET_CART_MODAL}`, () => {
      const payload = true;
      const expectedAction = {
        type: types.SET_CART_MODAL,
        payload,
      };
      expect(actions.setCartModal(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_CART_PRODUCT}`, () => {
      const payload = {};
      const expectedAction = {
        type: types.SET_CART_PRODUCT,
        payload,
      };
      expect(actions.setCartProduct(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_CART_PRODUCTS}`, () => {
      const payload = [];
      const expectedAction = {
        type: types.SET_CART_PRODUCTS,
        payload,
      };
      expect(actions.setCartProducts(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_LOADING_CART_PRODUCT}`, () => {
      const payload = true;
      const expectedAction = {
        type: types.SET_LOADING_CART_PRODUCT,
        payload,
      };
      expect(actions.setLoadingCartProduct(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_LOADING_CART_PRODUCTS}`, () => {
      const payload = true;
      const expectedAction = {
        type: types.SET_LOADING_CART_PRODUCTS,
        payload,
      };
      expect(actions.setLoadingCartProducts(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_SUBMITTING_CART_PRODUCT}`, () => {
      const payload = true;
      const expectedAction = {
        type: types.SET_SUBMITTING_CART_PRODUCT,
        payload,
      };
      expect(actions.setSubmittingCartProduct(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_CART_ERROR}`, () => {
      const payload = true;
      const expectedAction = {
        type: types.SET_CART_ERROR,
        payload,
      };
      expect(actions.setCartProductError(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.CLEAR_CART_PRODUCT_FORM}`, () => {
      const payload = true;
      const expectedAction = {
        type: types.CLEAR_CART_PRODUCT_FORM,
        payload,
      };
      expect(actions.clearCartProductForm(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_CART_PRODUCT_FORM}`, () => {
      const payload = {};
      const expectedAction = {
        type: types.SET_CART_PRODUCT_FORM,
        payload,
      };
      expect(actions.setCartProductForm(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_CART_PRODUCT_FORM_FIELD}`, () => {
      const payload = {
        name: 'name',
        value: 'value',
      };
      const expectedAction = {
        type: types.SET_CART_PRODUCT_FORM_FIELD,
        payload,
      };
      expect(actions.setCartProductFormField(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_CART_TOTAL_AMOUNT}`, () => {
      const payload = 0;
      const expectedAction = {
        type: types.SET_CART_TOTAL_AMOUNT,
        payload,
      };
      expect(actions.setCartTotalAmount(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.UPDATE_CART_ITEM}`, () => {
      const payload = {};
      const expectedAction = {
        type: types.UPDATE_CART_ITEM,
        payload,
      };
      expect(actions.updateCartProduct(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_DELETING_CART_ITEM}`, () => {
      const payload = true;
      const expectedAction = {
        type: types.SET_DELETING_CART_ITEM,
        payload,
      };
      expect(actions.setDeleletingCartItem(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.DELETE_CART_ITEM}`, () => {
      const payload = { itemId: 2 };
      const expectedAction = {
        type: types.DELETE_CART_ITEM,
        payload,
      };
      expect(actions.deleteCartItem(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.CLEARING_CART}`, () => {
      const payload = true;
      const expectedAction = {
        type: types.CLEARING_CART,
        payload,
      };
      expect(actions.clearingCart(payload)).toEqual(expectedAction);
    });
  });

  describe('asynchronous actions', () => {
    beforeEach(() => {
      store = mockStore({});
    });
    afterEach(() => {
      nock.cleanAll();
    });
    test('should dispatch fetchCartProducts action - FAILED', () => {
      const payload = 1;
      nock(API_URL)
        .get(`/shoppingcart/${payload}`)
        .reply(404, {
          code: 'USR_02',
          message: 'The field example is empty.',
          field: 'example',
          status: '500',
        });
      const expectedActions = [
        { type: 'SET_LOADING_CART_PRODUCTS', payload: true },
        {
          type: 'SET_CART_ERROR',
          payload: 'SET_CART_ERROR',
        },
        {
          type: 'SET_LOADING_CART_PRODUCTS',
          payload: false,
        },
      ];
      return store.dispatch(actions.fetchCartProducts(payload)).then(res => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedActions[0]);
        expect(actions[2]).toEqual(expectedActions[2]);
      });
    });
  });
});
