import axios from 'axios';
import 'dotenv/config';
import {
  store
} from '../store';

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

export default http;