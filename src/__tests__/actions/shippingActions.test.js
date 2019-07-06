import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import 'isomorphic-fetch';
import * as actions from '../../actions/shippingActions';
import * as types from '../../actions-types/shippingActionsTypes';

const { API_URL_TEST = 'http://localhost' } = process.env;
const mockStore = configureStore([thunk]);
let store;
jest.setTimeout(30000);

describe('shippingActions', () => {
  describe('synchronous', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    test(`should dispatch ${types.SET_SHIPPING_REGION}`, () => {
      const payload = true;
      const expectedAction = {
        type: types.SET_SHIPPING_REGION,
        payload,
      };
      expect(actions.setShippingRegion(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_SHIPPING_REGIONS}`, () => {
      const payload = [];
      const expectedAction = {
        type: types.SET_SHIPPING_REGIONS,
        payload,
      };
      expect(actions.setShippingRegions(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_LOADING_SHIPPING_REGION}`, () => {
      const payload = true;
      const expectedAction = {
        type: types.SET_LOADING_SHIPPING_REGION,
        payload,
      };
      expect(actions.setLoadingShippingRegion(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_LOADING_SHIPPING_REGIONS}`, () => {
      const payload = true;
      const expectedAction = {
        type: types.SET_LOADING_SHIPPING_REGIONS,
        payload,
      };
      expect(actions.setLoadingShippingRegions(payload)).toEqual(expectedAction);
    });
  });

  describe('asynchronous actions', () => {
    beforeEach(() => {
      store = mockStore({});
    });
    afterEach(() => {
      nock.cleanAll();
    });

    describe('fetchShippingRegions', () => {
      test('should dispatch action - FAILED', () => {
        const payload = {
          code: 'USR_02',
          message: 'The field example is empty.',
          field: 'example',
          status: '500',
        };
        nock(API_URL_TEST)
          .get('/shipping/regions')
          .reply(404, payload);
        const expectedActions = [];
        return store.dispatch(actions.fetchShippingRegions()).then(res => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      });

      test('should dispatch action - SUCCESS', async () => {
        const payload = []
        nock(API_URL_TEST)
          .get('/shipping/regions')
          .reply(200, payload);
        const expectedActions = [
          {
            type: types.SET_SHIPPING_REGIONS,
            payload: [],
          },
        ];
        await store.dispatch(actions.fetchShippingRegions())
          const dispatchedActions = store.getActions();
          expect(dispatchedActions).toEqual(expectedActions);
      });
    });
  });
});
