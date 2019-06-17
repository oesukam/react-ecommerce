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

export const clearAuthForm = payload => ({
  type: types.CLEAR_AUTH_FORM,
  payload,
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
  type: types.SET_LOGGING_IN,
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

export const submitLogin = credential => dispatch => {
  dispatch(setLoggingIn(true));
  return axios
    .post('/customers/login', credential)
    .then(({ data }) => {
      dispatch(setCurrentUser(data.customer));
      dispatch(setAccessToken(data.accessToken));
      localStorage.setItem('accessToken', data.accessToken);
      axios.defaults.headers.common['USER-KEY'] = data.accessToken;
      dispatch(setIsAuth(true));
      dispatch(setLoggingIn(false));
    })
    .catch(({ response }) => {
      const { error } = response.data;
      dispatch(setUserError(error));
      dispatch(setLoggingIn(false));
    });
};

export const submitRegister = credential => dispatch => {
  dispatch(setSigningUp(true));
  return axios
    .post('/customers', credential)
    .then(({ data }) => {
      dispatch(setCurrentUser(data.customer));
      dispatch(setAccessToken(data.accessToken));
      axios.defaults.headers.common['USER-KEY'] = data.accessToken;
      dispatch(setIsAuth(true));
      dispatch(setSigningUp(false));
    })
    .catch(({ response }) => {
      const { error } = response.data;
      dispatch(setUserError(error));
      dispatch(setSigningUp(false));
    });
};

export const clearCurrentUser = () => ({
  type: types.CLEAR_CURRENT_USER,
});

export const signout = () => dispatch => {
  localStorage.removeItem('accessToken');
  dispatch(clearCurrentUser());
};

export const setUpdatingCurrentUser = payload => ({
  type: types.SET_UPDATING_CURRENT_USER,
  payload,
});

export const setUpdatingCurrentUserAddress = payload => ({
  type: types.SET_UPDATING_CURRENT_USER_ADDRESS,
  payload,
});

export const fetchCurrentUser = token => dispatch => {
  return axios
    .get('/customer')
    .then(({ data }) => {
      dispatch(setCurrentUser(data));
    })
    .catch(err => {
      const error =
        err.response && err.response.data ? err.response.data.error : err;
      dispatch(setUserError(error));
    });
};

export const submitUpdateUser = user => dispatch => {
  dispatch(setUpdatingCurrentUser(true));
  return axios
    .put('/customer', user)
    .then(({ data }) => {
      dispatch(updateCurrentUser(data));
      dispatch(setUpdatingCurrentUser(false));
    })
    .catch(({ response }) => {
      const { error } = response.data;
      dispatch(setUserError(error));
      dispatch(setUpdatingCurrentUser(false));
    });
};

export const submitUpdateUserAddress = address => dispatch => {
  dispatch(setUpdatingCurrentUserAddress(true));
  return axios
    .put('/customers/address', address)
    .then(({ data }) => {
      dispatch(setUpdatingCurrentUserAddress(false));
    })
    .catch(({ response }) => {
      const { error } = response.data;
      dispatch(setUserError(error));
      dispatch(setUpdatingCurrentUserAddress(false));
    });
};
