import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import 'isomorphic-fetch';
import * as actions from '../../actions/orderActions';
import * as types from '../../actions-types/orderActionsTypes';
import stripe from '../../utils/stripe';

const { API_URL_TEST = 'http://localhost' } = process.env;
const mockStore = configureStore([thunk]);
let store;
jest.setTimeout(30000);

describe('orderActions', () => {
  describe('synchronous', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    test(`should dispatch ${types.SET_ORDER_MODAL}`, () => {
      const payload = true;
      const expectedAction = {
        type: types.SET_ORDER_MODAL,
        payload,
      };
      expect(actions.setOrderModal(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_ORDER_STEP}`, () => {
      const payload = 'Payment';
      const expectedAction = {
        type: types.SET_ORDER_STEP,
        payload,
      };
      expect(actions.setOrderStep(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_ORDER}`, () => {
      const payload = {};
      const expectedAction = {
        type: types.SET_ORDER,
        payload,
      };
      expect(actions.setOrder(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_ORDERS}`, () => {
      const payload = [];
      const expectedAction = {
        type: types.SET_ORDERS,
        payload,
      };
      expect(actions.setOrders(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_SINGLE_TAX}`, () => {
      const payload = 1;
      const expectedAction = {
        type: types.SET_SINGLE_TAX,
        payload,
      };
      expect(actions.setSingleTax(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_ALL_TAX}`, () => {
      const payload = [];
      const expectedAction = {
        type: types.SET_ALL_TAX,
        payload,
      };
      expect(actions.setAllTax(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_LOADING_ORDER}`, () => {
      const payload = true;
      const expectedAction = {
        type: types.SET_LOADING_ORDER,
        payload,
      };
      expect(actions.setLoadingOrder(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_LOADING_ORDERS}`, () => {
      const payload = true;
      const expectedAction = {
        type: types.SET_LOADING_ORDERS,
        payload,
      };
      expect(actions.setLoadingOrders(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_SUBMITTING_ORDER}`, () => {
      const payload = true;
      const expectedAction = {
        type: types.SET_SUBMITTING_ORDER,
        payload,
      };
      expect(actions.setSubmittingOrder(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_ORDER_ERROR}`, () => {
      const payload = {
        error: 'error',
      };
      const expectedAction = {
        type: types.SET_ORDER_ERROR,
        payload,
      };
      expect(actions.setOrderError(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.CLEAR_ORDER_FORM}`, () => {
      const expectedAction = {
        type: types.CLEAR_ORDER_FORM,
      };
      expect(actions.clearOrderForm()).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_ORDER_FORM}`, () => {
      const payload = {};
      const expectedAction = {
        type: types.SET_ORDER_FORM,
        payload,
      };
      expect(actions.setOrderForm(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_ORDER_FORM_FIELD}`, () => {
      const payload = true;
      const expectedAction = {
        type: types.SET_ORDER_FORM_FIELD,
        payload,
      };
      expect(actions.setOrderFormField(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_STRIPE_TOKEN}`, () => {
      const payload = { };
      const expectedAction = {
        type: types.SET_STRIPE_TOKEN,
        payload,
      };
      expect(actions.setStripeToken(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.CLEARING_ORDER}`, () => {
      const payload = true;
      const expectedAction = {
        type: types.CLEARING_ORDER,
        payload,
      };
      expect(actions.clearingOrder(payload)).toEqual(expectedAction);
    });
  });

  describe('asynchronous actions', () => {
    beforeEach(() => {
      store = mockStore({});
    });
    afterEach(() => {
      nock.cleanAll();
    });

    describe('fetchOrders', () => {
      test('should dispatch action - FAILED', async () => {
        const response = {
          code: 'USR_02',
          message: 'The field example is empty.',
          field: 'example',
          status: '500',
        };
        nock(API_URL_TEST)
          .get('/orders/inCustomer')
          .reply(400, response);
        const expectedActions = [
          {
            type: types.SET_LOADING_ORDERS,
            payload: true
          },
          {
            type: types.SET_ORDER_ERROR,
            payload: response,
          },
          {
            type: types.SET_LOADING_ORDERS,
            payload: false,
          },
        ];
        await store.dispatch(actions.fetchOrders())
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });

      test('should dispatch action - SUCCESS', async () => {
        const payload = []
        nock(API_URL_TEST)
          .get('/orders/inCustomer')
          .reply(200, payload);
        const expectedActions = [
          { 
            type: types.SET_LOADING_ORDERS,
            payload: true
          },
          {
            type: types.SET_ORDERS,
            payload,
          },
          {
            type: types.SET_LOADING_ORDERS,
            payload: false,
          },
        ];
        await store.dispatch(actions.fetchOrders())
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
    });

    describe('fetchOrder', () => {
      const orderId = 1;
      test('should dispatch action - FAILED', async () => {
        const response = {
          code: 'USR_02',
          message: 'The field example is empty.',
          field: 'example',
          status: '500',
        };
        nock(API_URL_TEST)
          .get(`/orders/${orderId}`)
          .reply(400, response);
        const expectedActions = [
          {
            type: types.SET_LOADING_ORDER,
            payload: true
          },
          {
            type: types.SET_ORDER_ERROR,
            payload: response,
          },
          {
            type: types.SET_LOADING_ORDER,
            payload: false,
          },
        ];
        await store.dispatch(actions.fetchOrder(orderId))
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });

      test('should dispatch action - SUCCESS', async () => {
        const payload = []
        nock(API_URL_TEST)
          .get(`/orders/${orderId}`)
          .reply(200, payload);
        const expectedActions = [
          { 
            type: types.SET_LOADING_ORDER,
            payload: true
          },
          {
            type: types.SET_ORDER,
            payload,
          },
          {
            type: types.SET_LOADING_ORDER,
            payload: false,
          },
        ];
        await store.dispatch(actions.fetchOrder(orderId))
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
    });

    describe('submitOrder', () => {
      const cart = {
        cart_id: 1,
        shipping_id: 1,
        tax_id: 1,
      };
      test('should dispatch action - FAILED', async () => {
        const response = {
          code: 'USR_02',
          message: 'The field example is empty.',
          field: 'example',
          status: '500',
        };
        nock(API_URL_TEST)
          .post('/orders')
          .reply(400, response);
        const expectedActions = [
          {
            type: types.SET_SUBMITTING_ORDER,
            payload: true
          },
          {
            type: types.SET_ORDER_ERROR,
            payload: response,
          },
          {
            type: types.SET_SUBMITTING_ORDER,
            payload: false,
          },
        ];
        await store.dispatch(actions.submitOrder(cart))
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });

      test('should dispatch action - SUCCESS', async () => {
        const payload = []
        nock(API_URL_TEST)
          .post('/orders')
          .reply(200, payload);
        const expectedActions = [
          { 
            type: types.SET_SUBMITTING_ORDER,
            payload: true
          },
          {
            type: types.SET_ORDER,
            payload,
          },
          {
            type: types.SET_SUBMITTING_ORDER,
            payload: false,
          },
        ];
        await store.dispatch(actions.submitOrder(cart))
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
    });

    describe('fetchAllTax', () => {
      test('should dispatch action - FAILED', async () => {
        const response = {
          code: 'USR_02',
          message: 'The field example is empty.',
          field: 'example',
          status: '500',
        };
        nock(API_URL_TEST)
          .get('/tax')
          .reply(400, response);
        const expectedActions = [];
        await store.dispatch(actions.fetchAllTax())
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });

      test('should dispatch action - SUCCESS', async () => {
        const payload = []
        nock(API_URL_TEST)
          .get('/tax')
          .reply(200, payload);
        const expectedActions = [
          { 
            type: types.SET_ALL_TAX,
            payload
          },
        ];
        await store.dispatch(actions.fetchAllTax())
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
    });

    describe('fetchAllTax', () => {
      const payment = {
        order_id: 1,
        stripeToken: {},
        amount: 100,
        description: "Payment",
      }
      test('should dispatch action - FAILED', async () => {
        const response = {
          code: 'USR_02',
          message: 'The field example is empty.',
          field: 'example',
          status: '500',
        };
        nock(API_URL_TEST)
          .post('/stripe/charge')
          .reply(400, response);
        const expectedActions = [
          {
            type: types.SET_ORDER_ERROR,
            payload: response,
          }
        ];
        await store.dispatch(actions.submitOrderPayment(payment))
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });

      test('should dispatch action - SUCCESS', async () => {
        const payload = []
        nock(API_URL_TEST)
          .post('/stripe/charge')
          .reply(200, payload);
        const expectedActions = [];
        await store.dispatch(actions.submitOrderPayment(payment))
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
    });

    describe('generateStripToken', () => {
      const cart = {
        creditCart: '4242424242424242'
      }
      test('should dispatch action - FAILED', async () => {
        stripe.createToken = jest.fn().mockImplementation(() => Promise.reject(true));
        const expectedActions = [];
        await store.dispatch(actions.generateStripToken(cart))
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });

      test('should dispatch action - SUCCESS', async () => {
        const expectedActions = [
          {
            type: types.SET_STRIPE_TOKEN,
            payload: true
          }
        ];
        stripe.createToken = jest.fn().mockImplementation(() => Promise.resolve(true));
        await store.dispatch(actions.generateStripToken(cart))
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
    });
  });
});
