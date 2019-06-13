import * as types from '../actions-types/currentUserActionsTypes';

export const setLogin = payload => ({
  type: types.SET_IS_AUTH,
  payload,
});

export const setCurrentUser = payload => ({
  type: types.SET_CURRENT_USER,
  payload,
});
