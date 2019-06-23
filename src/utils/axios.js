import axios from 'axios';
import 'dotenv/config';
import {
  store
} from '../store';

const {
  accessToken
} = store.getState().currentUser;
const testUrl = 'http://localhost';
const baseURL = process.env.NODE_ENV === 'test' ? testUrl : process.env.API_URL;
const userKey =
  process.env.NODE_ENV === 'test' ?
  'user-key' :
  accessToken || localStorage.getItem('accessToken') || undefined;
const http = axios.create({
  baseURL,
  headers: {
    'user-key': userKey,
  },
});

http.interceptors.request.use((config) => {
  if (userKey) {
    config.headers['user-key'] = userKey;
  }
  return config;
}, (err) => {
  return Promise.reject(err);
});

export default http;