import axios from 'axios';
import 'dotenv/config';
import {
  store
} from '../store';
import { setAuthModal } from '../actions/currentUserActions'
const {
  accessToken
} = store.getState().currentUser;
const { API_URL_TEST = 'http://localhost' } = process.env;
const baseURL = process.env.NODE_ENV === 'test' ? API_URL_TEST : process.env.API_URL;
const userKey = process.env.NODE_ENV === 'test' ? 'user-key' : accessToken;

const http = axios.create({
  baseURL,
  headers: {
    'user-key': userKey,
  },
});

export const requestHandler = (request) => {
  if (!request.headers['user-key']) {
    request.headers['user-key'] = userKey
  }
  return request
}

export const errorHandler = (err) => {
  const { error } = err.response.data;
  if (error === 'JsonWebTokenError: jwt malformed') {
    store.dispatch(setAuthModal('Sign In'))
  }
  return Promise.reject({ ...err })
}

export const successHandler = (response) => response

http.interceptors.request.use(
  request => requestHandler(request)
)

http.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
)

export default http;