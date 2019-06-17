import * as types from '../actions-types/currentUserActionsTypes';
import { currentUser as initialState } from '../store/initialState';

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: payload,
      };
    case types.CLEAR_CURRENT_USER:
      return initialState;
    case types.SET_USER_ERROR:
      return {
        ...state,
        userError: payload,
      };
    case types.CLEAR_AUTH_FORM:
      return {
        ...state,
        authForm: initialState.authForm,
        userError: initialState.userError,
      };
    case types.SET_AUTH_FORM_FIELD:
      return {
        ...state,
        authForm: {
          ...state.authForm,
          [payload.name]: {
            value: payload.value,
            valid: payload.value.trim() !== '',
          },
        },
      };
    case types.SET_AUTH_MODAL:
      return {
        ...state,
        authModal: payload,
      };
    case types.SET_IS_AUTH:
      return {
        ...state,
        isAuth: payload,
      };
    case types.SET_LOGGING_IN:
      return {
        ...state,
        loggingIn: payload,
      };
    case types.SET_SIGNING_UP:
      return {
        ...state,
        signingUp: payload,
      };
    case types.SET_CURRENT_USER:
      return {
        ...state,
        user: payload,
      };

    default:
      return state;
  }
};

export default reducer;
