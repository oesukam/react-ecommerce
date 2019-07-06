import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import 'isomorphic-fetch';
import * as actions from '../../actions/currentUserActions';
import * as types from '../../actions-types/currentUserActionsTypes';

const { API_URL_TEST = 'http://localhost' } = process.env
const mockStore = configureStore([thunk]);
let store;
jest.setTimeout(30000);

delete window.location;
window.location = { reload: jest.fn() };

describe('currentUserActions', () => {
  describe('synchronous', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    test(`should dispatch ${types.SET_ACCESS_TOKEN}`, () => {
      const payload = 'token';
      const expectedAction = {
        type: types.SET_ACCESS_TOKEN,
        payload,
      };
      expect(actions.setAccessToken(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_USER_ERROR}`, () => {
      const payload = {
        name: 'name',
        value: 'value'
      }
      const expectedAction = {
        type: types.SET_USER_ERROR,
        payload,
      };
      expect(actions.setUserError(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_AUTH_MODAL}`, () => {
      const payload = true;
      const expectedAction = {
        type: types.SET_AUTH_MODAL,
        payload,
      };
      expect(actions.setAuthModal(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_AUTH_FORM_FIELD}`, () => {
      const payload = {
        name: 'name',
        value: 'value'
      };
      const expectedAction = {
        type: types.SET_AUTH_FORM_FIELD,
        payload,
      };
      expect(actions.setAuthFormField(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.CLEAR_AUTH_FORM}`, () => {
      const expectedAction = {
        type: types.CLEAR_AUTH_FORM,
      };
      expect(actions.clearAuthForm()).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_IS_AUTH}`, () => {
      const payload = true
      const expectedAction = {
        type: types.SET_IS_AUTH,
        payload,
      };
      expect(actions.setIsAuth(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_LOGGING_IN}`, () => {
      const payload = true
      const expectedAction = {
        type: types.SET_LOGGING_IN,
        payload,
      };
      expect(actions.setLoggingIn(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_SIGNING_UP}`, () => {
      const payload = true
      const expectedAction = {
        type: types.SET_SIGNING_UP,
        payload,
      };
      expect(actions.setSigningUp(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_SIGNING_UP}`, () => {
      const payload = true
      const expectedAction = {
        type: types.SET_SIGNING_UP,
        payload,
      };
      expect(actions.setSigningUp(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_CURRENT_USER}`, () => {
      const payload = {}
      const expectedAction = {
        type: types.SET_CURRENT_USER,
        payload,
      };
      expect(actions.setCurrentUser(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.UPDATE_CURRENT_USER}`, () => {
      const payload = {}
      const expectedAction = {
        type: types.UPDATE_CURRENT_USER,
        payload,
      };
      expect(actions.updateCurrentUser(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_CURRENT_USER_FIELD}`, () => {
      const payload = {
        name: 'name',
        value: 'value'
      }
      const expectedAction = {
        type: types.SET_CURRENT_USER_FIELD,
        payload,
      };
      expect(actions.setCurrentUserField(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.CLEAR_CURRENT_USER}`, () => {
      const expectedAction = {
        type: types.CLEAR_CURRENT_USER,
      };
      expect(actions.clearCurrentUser()).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_UPDATING_CURRENT_USER}`, () => {
      const payload = {}
      const expectedAction = {
        type: types.SET_UPDATING_CURRENT_USER,
        payload,
      };
      expect(actions.setUpdatingCurrentUser(payload)).toEqual(expectedAction);
    });

    test(`should dispatch ${types.SET_UPDATING_CURRENT_USER_ADDRESS}`, () => {
      const payload = {}
      const expectedAction = {
        type: types.SET_UPDATING_CURRENT_USER_ADDRESS,
        payload,
      };
      expect(actions.setUpdatingCurrentUserAddress(payload)).toEqual(expectedAction);
    });
  });

  describe('asynchrounous', () => {
    beforeEach(() => {
      store = mockStore({});
    });
    afterEach(() => {
      nock.cleanAll();
    });
    test(`should dispatch signout()`, () => {
      const expectedActions = [{
        type: types.CLEAR_CURRENT_USER,
      }];
      return store.dispatch(actions.signout()).then((res) => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });

    describe('submitLogin', () => {
      test('should dispatch action - FAILED', () => {
        const payload = {
          email: '',
          password: 'password'
        };
        const response = {
          code: 'USR_02',
          message: 'The field email is empty.',
          field: 'email',
          status: 500,
        }
        nock(API_URL_TEST)
          .post('/customers/login')
          .reply(404, response);
        const expectedActions = [{
            type: 'SET_LOGGING_IN',
            payload: true
          },
          {
            type: 'SET_USER_ERROR',
            payload: response,
          },
          {
            type: 'SET_LOGGING_IN',
            payload: false,
          },
        ];
        return store.dispatch(actions.submitLogin(payload)).then(res => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      });
  
      test('should dispatch action', async () => {
        const payload = {
          email: 'email@email.com',
          password: 'password'
        };
        const accessToken = 'accessToken';
        nock(API_URL_TEST)
          .post('/customers/login')
          .reply(200, {
            customer: payload,
            accessToken
          });
  
        const expectedActions = [{
            type: types.SET_LOGGING_IN,
            payload: true
          },
          {
            type: types.SET_CURRENT_USER,
            payload,
          },
          {
            type: types.SET_ACCESS_TOKEN,
            payload: accessToken,
          },
          {
            type: types.SET_IS_AUTH,
            payload: true,
          },
          {
            type: types.SET_LOGGING_IN,
            payload: false,
          },
          {
            type: types.SET_AUTH_MODAL,
            payload: '',
          },
        ];
  
        return store.dispatch(actions.submitLogin(payload)).then(res => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      });
    });

    describe('submitRegister', () => {
      test('should dispatch action - FAILED', () => {
        const payload = {
          name: 'name',
          email: '',
          password: 'password'
        };
        const response = {
          code: 'USR_02',
          message: 'The field email is empty.',
          field: 'email',
          status: 500,
        }
        nock(API_URL_TEST)
          .post('/customers')
          .reply(400, response);
        const expectedActions = [{
            type: types.SET_SIGNING_UP,
            payload: true
          },
          {
            type: types.SET_USER_ERROR,
            payload: response,
          },
          {
            type: types.SET_SIGNING_UP,
            payload: false,
          },
        ];
        return store.dispatch(actions.submitRegister(payload)).then(res => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      });
  
      test('should dispatch action', async () => {
        const payload = {
          name: 'name',
          email: 'email@email.com',
          password: 'password'
        };
        const accessToken = 'accessToken';
        nock(API_URL_TEST)
          .post('/customers')
          .reply(200, {
            customer: payload,
            accessToken
          });
  
        const expectedActions = [{
            type: types.SET_SIGNING_UP,
            payload: true
          },
          {
            type: types.SET_CURRENT_USER,
            payload,
          },
          {
            type: types.SET_ACCESS_TOKEN,
            payload: accessToken,
          },
          {
            type: types.SET_IS_AUTH,
            payload: true,
          },
          {
            type: types.SET_SIGNING_UP,
            payload: false,
          },
          {
            type: types.SET_AUTH_MODAL,
            payload: '',
          },
        ];
  
        return store.dispatch(actions.submitRegister(payload)).then(res => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      });
    });

    describe('fetchCurrentUser', () => {
      test('should dispatch action wrong token - FAILED', () => {
        const token = '';
        const payload = {
          code: 'USR_02',
          message: 'The field email is empty.',
          field: 'email',
          status: 500,
        };
        nock(API_URL_TEST)
          .get('/customer')
          .reply(400, payload);
        const expectedActions = [{
          type: types.SET_USER_ERROR,
          payload,
        }, ];
        return store.dispatch(actions.fetchCurrentUser(token)).then(res => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      });

      test('should dispatch action with expired token - FAILED', async () => {
        const token = 'expired_token';
        nock(API_URL_TEST)
          .get('/customer')
          .reply(400, {
            code: 'USR_02',
            error: 'TokenExpiredError: jwt expired',
            field: 'email',
            status: 500,
          });
        const expectedActions = [
          {
            type: types.SET_USER_ERROR,
            payload: 'TokenExpiredError: jwt expired',
          },
          {
            type: types.CLEAR_CURRENT_USER,
          },
          {
            type: types.SET_AUTH_MODAL,
            payload: 'Sign In',
          },
        ];
        await store.dispatch(actions.fetchCurrentUser(token))
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  
      test('should dispatch action', async () => {
        const payload = {
          name: 'name',
          email: 'email@email.com'
        };
        nock(API_URL_TEST)
          .get('/customer')
          .reply(200, payload);
  
        const expectedActions = [{
          type: types.SET_CURRENT_USER,
          payload,
        }, ];
  
        await store.dispatch(actions.fetchCurrentUser('token'))
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
    });

    describe('submitUpdateUser', () => {
      const user = {
        email: 'email@email.com',
        name: 'name'
      }
      test('should dispatch action - FAILED', async () => {
        const response = {
          code: 'USR_02',
          message: 'The field email is empty.',
          field: 'email',
          status: 500,
        }
        nock(API_URL_TEST)
          .put('/customer')
          .reply(400, response);
        const expectedActions = [
          {
            type: types.SET_UPDATING_CURRENT_USER,
            payload: true
          },
          {
            type: types.SET_USER_ERROR,
            payload: response
          },
          {
            type: types.SET_UPDATING_CURRENT_USER,
            payload: false,
          },
        ];
        await store.dispatch(actions.submitUpdateUser(user))
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  
      test('should dispatch action', async () => {
        nock(API_URL_TEST)
          .put('/customer')
          .reply(200, user);
  
        const expectedActions = [
          {
            type: types.SET_UPDATING_CURRENT_USER,
            payload: true
          },
          {
            type: types.UPDATE_CURRENT_USER,
            payload: user
          },
          {
            type: types.SET_UPDATING_CURRENT_USER,
            payload: false,
          },
        ];
  
        await store.dispatch(actions.submitUpdateUser(user))
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
    });

    describe('submitUpdateUserAddress', () => {
      const address = {
        address_1: 'address_1',
      }
      test('should dispatch action - FAILED', async () => {
        const response = {
          code: 'USR_02',
          message: 'The field email is empty.',
          field: 'email',
          status: 500,
        }
        nock(API_URL_TEST)
          .put('/customers/address')
          .reply(400, response);
        const expectedActions = [
          {
            type: types.SET_UPDATING_CURRENT_USER_ADDRESS,
            payload: true
          },
          {
            type: types.SET_USER_ERROR,
            payload: response
          },
          {
            type: types.SET_UPDATING_CURRENT_USER_ADDRESS,
            payload: false,
          },
        ];
        await store.dispatch(actions.submitUpdateUserAddress(address))
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  
      test('should dispatch action', async () => {
        nock(API_URL_TEST)
          .put('/customers/address')
          .reply(200, address);
  
        const expectedActions = [
          {
            type: types.SET_UPDATING_CURRENT_USER_ADDRESS,
            payload: true
          },
          {
            type: types.SET_UPDATING_CURRENT_USER_ADDRESS,
            payload: false,
          },
        ];
  
        await store.dispatch(actions.submitUpdateUserAddress(address))
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
    });
  });
});