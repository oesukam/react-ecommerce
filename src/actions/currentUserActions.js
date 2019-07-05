import * as types from '../actions-types/currentUserActionsTypes';
import axios from '../utils/axios';

export const setAccessToken = payload => ({
  type: types.SET_ACCESS_TOKEN,
  payload,
});

export const setUserError = payload => ({
  type: types.SET_USER_ERROR,
  payload,
});

export const setAuthModal = payload => ({
  type: types.SET_AUTH_MODAL,
  payload,
});

export const setAuthFormField = payload => ({
  type: types.SET_AUTH_FORM_FIELD,
  payload,
});

export const clearAuthForm = () => ({
  type: types.CLEAR_AUTH_FORM,
});

export const setIsAuth = payload => ({
  type: types.SET_IS_AUTH,
  payload,
});

export const setLoggingIn = payload => ({
  type: types.SET_LOGGING_IN,
  payload,
});

export const setSigningUp = payload => ({
  type: types.SET_SIGNING_UP,
  payload,
});

export const setCurrentUser = payload => ({
  type: types.SET_CURRENT_USER,
  payload,
});

export const updateCurrentUser = payload => ({
  type: types.UPDATE_CURRENT_USER,
  payload,
});

export const setCurrentUserField = payload => ({
  type: types.SET_CURRENT_USER_FIELD,
  payload,
});


export const clearCurrentUser = () => ({
  type: types.CLEAR_CURRENT_USER,
});

export const setUpdatingCurrentUser = payload => ({
  type: types.SET_UPDATING_CURRENT_USER,
  payload,
});

export const setUpdatingCurrentUserAddress = payload => ({
  type: types.SET_UPDATING_CURRENT_USER_ADDRESS,
  payload,
});

export const signout = () => dispatch => {
  localStorage.removeItem('accessToken');
  dispatch(clearCurrentUser());
  return new Promise((resolve) => {
    resolve()
  })
};

export const submitLogin = credential => dispatch => {
  dispatch(setLoggingIn(true));
  return axios
    .post('/customers/login', credential)
    .then(({
      data
    }) => {
      dispatch(setCurrentUser(data.customer));
      dispatch(setAccessToken(data.accessToken));
      localStorage.setItem('accessToken', data.accessToken);
      window.location.reload(false);
      dispatch(setIsAuth(true));
      dispatch(setLoggingIn(false));
      dispatch(setAuthModal(''));
    })
    .catch(err => {
      const error =
        err.response && err.response.data ? err.response.data.error : err;
      dispatch(setUserError(error));
      dispatch(setLoggingIn(false));
    });
};

export const submitRegister = credential => dispatch => {
  dispatch(setSigningUp(true));
  return axios
    .post('/customers', credential)
    .then(({
      data
    }) => {
      dispatch(setCurrentUser(data.customer));
      dispatch(setAccessToken(data.accessToken));
      localStorage.setItem('accessToken', data.accessToken);
      window.location.reload(false);
      dispatch(setIsAuth(true));
      dispatch(setSigningUp(false));
      dispatch(setAuthModal(''));
    })
    .catch(err => {
      const error =
        err.response && err.response.data ? err.response.data.error : err;
      dispatch(setUserError(error));
      dispatch(setSigningUp(false));
    });
};

export const fetchCurrentUser = token => dispatch => {
  return axios
    .get('/customer')
    .then(({
      data
    }) => {
      dispatch(setCurrentUser(data));
    })
    .catch(err => {
      const error =
        err.response && err.response.data ? err.response.data.error : err;
      dispatch(setUserError(error));
      if (error === 'TokenExpiredError: jwt expired') {
        dispatch(signout())
        dispatch(setAuthModal('Sign In'));
      }
    });
};

export const submitUpdateUser = user => dispatch => {
  dispatch(setUpdatingCurrentUser(true));
  return axios
    .put('/customer', user)
    .then(({
      data
    }) => {
      dispatch(updateCurrentUser(data));
      dispatch(setUpdatingCurrentUser(false));
      return data;
    })
    .catch((err) => {
      const error =
        err.response && err.response.data ? err.response.data.error : err;
      dispatch(setUserError(error));
      dispatch(setUpdatingCurrentUser(false));
      return error;
    });
};

export const submitUpdateUserAddress = address => dispatch => {
  dispatch(setUpdatingCurrentUserAddress(true));
  return axios
    .put('/customers/address', address)
    .then(({
      data
    }) => {
      dispatch(setUpdatingCurrentUserAddress(false));
      return data;
    })
    .catch(err => {
      const error =
        err.response && err.response.data ? err.response.data.error : err;
      dispatch(setUserError(error));
      dispatch(setUpdatingCurrentUserAddress(false));
      return error
    });
};