import * as types from '../actions-types/currentUserActionsTypes';
import { currentUser as initialState } from '../store/initialState';

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
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
