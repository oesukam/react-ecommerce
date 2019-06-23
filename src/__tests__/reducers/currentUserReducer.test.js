import * as types from '../../actions-types/currentUserActionsTypes';
import reducer from '../../reducers/currentUserReducer';
import {
  currentUser as initialState
} from '../../store/initialState';

describe('currentReducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test(`should handle ${types.SET_ACCESS_TOKEN}`, () => {
    const payload = 'token';
    const action = {
      type: types.SET_ACCESS_TOKEN,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      accessToken: payload,
    });
  });

  test(`should handle ${types.CLEAR_CURRENT_USER}`, () => {
    const action = {
      type: types.CLEAR_CURRENT_USER,
    };
    expect(reducer({}, action)).toEqual({ ...initialState, accessToken: "" });
  });

  test(`should handle ${types.SET_USER_ERROR}`, () => {
    const payload = {
      field: 'name',
      message: 'message'
    }
    const action = {
      type: types.SET_USER_ERROR,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      userError: payload,
    });
  });

  test(`should handle ${types.SET_AUTH_FORM_FIELD}`, () => {
    const payload = {
      name: 'name',
      value: 'value'
    }
    const action = {
      type: types.SET_AUTH_FORM_FIELD,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      authForm: {
        [payload.name]: {
          valid: true,
          value: payload.value,
        }
      }
    });
  });

  test(`should handle ${types.CLEAR_AUTH_FORM}`, () => {
    const action = {
      type: types.CLEAR_AUTH_FORM,
    };
    expect(reducer({}, action)).toEqual({
      authForm: initialState.authForm,
      userError: initialState.userError,
    });
  });

  test(`should handle ${types.SET_AUTH_MODAL}`, () => {
    const payload = true
    const action = {
      type: types.SET_AUTH_MODAL,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      authModal: payload,
    });
  });

  test(`should handle ${types.SET_IS_AUTH}`, () => {
    const payload = true
    const action = {
      type: types.SET_IS_AUTH,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      isAuth: payload,
    });
  });

  test(`should handle ${types.SET_LOGGING_IN}`, () => {
    const payload = true
    const action = {
      type: types.SET_LOGGING_IN,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      loggingIn: payload,
    });
  });

  test(`should handle ${types.SET_SIGNING_UP}`, () => {
    const payload = true
    const action = {
      type: types.SET_SIGNING_UP,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      signingUp: payload,
    });
  });

  test(`should handle ${types.SET_CURRENT_USER}`, () => {
    const payload = {}
    const action = {
      type: types.SET_CURRENT_USER,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      user: payload,
    });
  });

  test(`should handle ${types.UPDATE_CURRENT_USER}`, () => {
    const payload = {}
    const action = {
      type: types.UPDATE_CURRENT_USER,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      user: payload,
    });
  });

  test(`should handle ${types.SET_CURRENT_USER_FIELD}`, () => {
    const payload = {
      name: 'name',
      value: 'value'
    }
    const action = {
      type: types.SET_CURRENT_USER_FIELD,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      user: {
        [payload.name]: payload.value,
      }
    });
  });

  test(`should handle ${types.SET_UPDATING_CURRENT_USER}`, () => {
    const payload = {}
    const action = {
      type: types.SET_UPDATING_CURRENT_USER,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      updatingUser: {}
    });
  });

  test(`should handle ${types.SET_UPDATING_CURRENT_USER_ADDRESS}`, () => {
    const payload = {}
    const action = {
      type: types.SET_UPDATING_CURRENT_USER_ADDRESS,
      payload,
    };
    expect(reducer({}, action)).toEqual({
      updatingUserAddress: {}
    });
  });
});