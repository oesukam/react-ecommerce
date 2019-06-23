import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import 'isomorphic-fetch';
import * as actions from '../../actions/currentUserActions';
import * as types from '../../actions-types/currentUserActionsTypes';

const API_URL = 'http://localhost'
const mockStore = configureStore([thunk]);
let store;
jest.setTimeout(30000);

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

    test('should dispatch submitLogin action - FAILED', () => {
      const payload = {
        email: '',
        password: 'password'
      };
      nock(API_URL)
        .post('/customers/login')
        .reply(404, {
          code: 'USR_02',
          message: 'The field email is empty.',
          field: 'email',
          status: 500,
        });
      const expectedActions = [{
          type: 'SET_LOGGING_IN',
          payload: true
        },
        {
          type: 'SET_USER_ERROR',
          payload: undefined,
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

    test('should dispatch submitLogin action', async () => {
      const payload = {
        email: 'email@email.com',
        password: 'password'
      };
      const accessToken = 'accessToken';
      nock(API_URL)
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

    test('should dispatch submitRegister action - FAILED', () => {
      const payload = {
        name: 'name',
        email: '',
        password: 'password'
      };
      nock(API_URL)
        .post('/customers')
        .reply(400, {
          code: 'USR_02',
          message: 'The field email is empty.',
          field: 'email',
          status: 500,
        });
      const expectedActions = [{
          type: types.SET_SIGNING_UP,
          payload: true
        },
        {
          type: types.SET_USER_ERROR,
          payload: undefined,
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

    test('should dispatch submitRegister action', async () => {
      const payload = {
        name: 'name',
        email: 'email@email.com',
        password: 'password'
      };
      const accessToken = 'accessToken';
      nock(API_URL)
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

    test('should dispatch fetchCurrentUser action - FAILED', () => {
      const payload = 'token';
      nock(API_URL)
        .get('/customer')
        .reply(400, {
          code: 'USR_02',
          message: 'The field email is empty.',
          field: 'email',
          status: 500,
        });
      const expectedActions = [{
        type: types.SET_USER_ERROR,
        payload: undefined,
      }, ];
      return store.dispatch(actions.fetchCurrentUser(payload)).then(res => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });

    test('should dispatch fetchCurrentUser action', async () => {
      const payload = {
        name: 'name',
        email: 'email@email.com'
      };
      nock(API_URL)
        .get('/customer')
        .reply(200, payload);

      const expectedActions = [{
        type: types.SET_CURRENT_USER,
        payload,
      }, ];

      return store.dispatch(actions.fetchCurrentUser('token')).then(res => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });
  });
});