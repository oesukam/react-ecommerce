import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import 'isomorphic-fetch';
import * as actions from '../../actions/cartActions';
import * as types from '../../actions-types/cartActionsTypes';

const { API_URL_TEST = 'http://localhost' } = process.env;
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

    describe('fetchCartProducts', () => {
      test('should dispatch action - FAILED', () => {
        const payload = {
          code: 'USR_02',
          message: 'The field example is empty.',
          field: 'example',
          status: '500',
        };
        const cartId = 1;
        nock(API_URL_TEST)
          .get(`/shoppingcart/${cartId}`)
          .reply(404, payload);
        const expectedActions = [
          { type: types.SET_LOADING_CART_PRODUCTS, payload: true },
          {
            type: types.SET_CART_ERROR,
            payload,
          },
          {
            type: types.SET_LOADING_CART_PRODUCTS,
            payload: false,
          },
        ];
        return store.dispatch(actions.fetchCartProducts(cartId)).then(res => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      });

      test('should dispatch action - SUCCESS', async () => {
        const payload = []
        const cartId = 1;
        nock(API_URL_TEST)
          .get(`/shoppingcart/${cartId}`)
          .reply(200, payload);
        const expectedActions = [
          { type: types.SET_LOADING_CART_PRODUCTS, payload: true },
          {
            type: types.SET_CART_PRODUCTS,
            payload,
          },
          {
            type: types.SET_LOADING_CART_PRODUCTS,
            payload: false,
          },
        ];
        await store.dispatch(actions.fetchCartProducts(cartId))
          const dispatchedActions = store.getActions();
          expect(dispatchedActions).toEqual(expectedActions);
      });
    });

    describe('generateCartId', () => {
      test('should dispatch action - FAILED', () => {
        const payload = {
          code: 'USR_02',
          message: 'The field example is empty.',
          field: 'example',
          status: 400,
        };
        nock(API_URL_TEST)
          .get('/shoppingcart/generateUniqueId')
          .reply(400, payload);
        const expectedActions = [
          {
            type: types.SET_CART_ERROR,
            payload,
          },
        ];
        return store.dispatch(actions.generateCartId())
          .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
          });
      });

      test('should dispatch action - SUCCESS', () => {
        const cartId = 100;
        const payload = { cart_id: cartId }
        nock(API_URL_TEST)
          .get('/shoppingcart/generateUniqueId')
          .reply(200, payload);
        const expectedActions = [
          {
            type: types.SET_CART_PRODUCT_FORM_FIELD,
            payload: { name: 'cart_id', value: cartId }
          },
          {
            type: types.SET_LOADING_CART_PRODUCT,
            payload: true,
          },
        ];
        return store.dispatch(actions.generateCartId())
          .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
          });
      });
    });

    describe('fetchCartProduct', () => {
      test('should dispatch action - FAILED', () => {
        const payload = {
          code: 'USR_02',
          message: 'The field example is empty.',
          field: 'example',
          status: 400,
        };
        const cartId = 100
        nock(API_URL_TEST)
          .get(`/shoppingcart/${cartId}`)
          .reply(400, payload);
        const expectedActions = [
          {
            type: types.SET_LOADING_CART_PRODUCT,
            payload: true,
          },
          {
            type: types.SET_CART_ERROR,
            payload,
          },
          {
            type: types.SET_LOADING_CART_PRODUCT,
            payload: false,
          },
        ];
        return store.dispatch(actions.fetchCartProduct(cartId))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
          });
      });

      test('should dispatch action - SUCCESS', () => {
        const cartId = 100;
        const payload = {};
        nock(API_URL_TEST)
          .get(`/shoppingcart/${cartId}`)
          .reply(200, payload);
        const expectedActions = [
          {
            type: types.SET_LOADING_CART_PRODUCT,
            payload: true,
          },
          {
            type: types.SET_CART_PRODUCT,
            payload,
          },
          {
            type: types.SET_LOADING_CART_PRODUCT,
            payload: false,
          },
        ];
        return store.dispatch(actions.fetchCartProduct(cartId))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
          });
      });
    });

    describe('fetchCartTotalAmount', () => {
      test('should dispatch action - FAILED', () => {
        const payload = {
          code: 'USR_02',
          message: 'The field example is empty.',
          field: 'example',
          status: 400,
        };
        const cartId = 100
        nock(API_URL_TEST)
          .get(`/shoppingcart/totalAmount/${cartId}`)
          .reply(400, payload);
        const expectedActions = [
          {
            type: types.SET_CART_ERROR,
            payload,
          },
          {
            type: types.SET_CART_TOTAL_AMOUNT,
            payload: 0,
          },
        ];
        return store.dispatch(actions.fetchCartTotalAmount(cartId))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
          });
      });

      test('should dispatch action - SUCCESS', () => {
        const cartId = 100;
        const response = {
          total_amount: 10
        };
        nock(API_URL_TEST)
          .get(`/shoppingcart/totalAmount/${cartId}`)
          .reply(200, response);
        const expectedActions = [
          {
            type: types.SET_CART_TOTAL_AMOUNT,
            payload: response.total_amount,
          },
        ];
        return store.dispatch(actions.fetchCartTotalAmount(cartId))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
          });
      });
    });

    describe('submitCartProductUpdate', () => {
      const cartId = 100;
      const itemId = 1;
      const item = { item_id: itemId, quantity: 1, price: 10 };
      test('should dispatch action - FAILED', async () => {
        const payload = {
          code: 'USR_02',
          message: 'The field example is empty.',
          field: 'example',
          status: 400,
        };
        
        nock(API_URL_TEST)
          .put(`/shoppingcart/update/${itemId}`)
          .reply(400, payload);
        const expectedActions = [
          {
            type: types.SET_CART_ERROR,
            payload,
          },
        ];
        
        await store.dispatch(actions.submitCartProductUpdate({ item, cartId, itemId }))
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });

      test('should dispatch action - SUCCESS', async () => {
        const cartId = 100;
        const response = []
        const payload = {
          item: {
            ...item,
            subtotal: item.price * item.quantity
          },
          itemId
        }
        nock(API_URL_TEST)
          .put(`/shoppingcart/update/${itemId}`)
          .reply(200, response);
        const expectedActions = [
          {
            type: types.UPDATE_CART_ITEM,
            payload,
          },
        ];
        await store.dispatch(actions.submitCartProductUpdate({ item, cartId, itemId }))
        const dispacthedActions = store.getActions();
        expect(dispacthedActions).toEqual(expectedActions);
      });
    });

    describe('submitDeleteCartItem', () => {
      const cartId = 100;
      const itemId = 1;
      test('should dispatch action - SUCCESS', async () => {
        nock(API_URL_TEST)
          .delete(`/shoppingcart/removeProduct/${itemId}`)
          .reply(200);
        const expectedActions = [
          {
            type: types.SET_DELETING_CART_ITEM,
            payload: itemId,
          },
          {
            type: types.DELETE_CART_ITEM,
            payload: itemId,
          },
        ];
       
        await store.dispatch(actions.submitDeleteCartItem({ cartId, itemId }))
          const dispatchedActions = store.getActions();
          expect(dispatchedActions).toEqual(expectedActions);
      });
    });

    describe('submitEmptyCart', () => {
      const cartId = 100;
      test('should dispatch action - FAILURE', async () => {
        nock(API_URL_TEST)
          .delete(`/shoppingcart/empty/${cartId}`)
          .reply(400);
        const expectedActions = [
          {
            type: types.CLEARING_CART,
            payload: true,
          },
          {
            type: types.CLEARING_CART,
            payload: false,
          },
          {
            type: types.SET_CART_TOTAL_AMOUNT,
            payload: 0,
          },
          
        ];
        await store.dispatch(actions.submitEmptyCart(cartId))
          const dispatchedActions = store.getActions();
          expect(dispatchedActions).toEqual(expectedActions);
      });

      test('should dispatch action - SUCCESS', async () => {
        nock(API_URL_TEST)
          .delete(`/shoppingcart/empty/${cartId}`)
          .reply(200);
        const expectedActions = [
          {
            type: types.CLEARING_CART,
            payload: true,
          },
          {
            type: types.SET_CART_PRODUCTS,
            payload: [],
          },
          {
            type: types.SET_CART_TOTAL_AMOUNT,
            payload: 0,
          },
          {
            type: types.CLEARING_CART,
            payload: false,
          },
        ];
        await store.dispatch(actions.submitEmptyCart(cartId))
          const dispatchedActions = store.getActions();
          expect(dispatchedActions).toEqual(expectedActions);
      });
    });
  });
});
