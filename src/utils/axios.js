import axios from 'axios';
import store from '../store';

const {
  user: { token },
} = store.getState().user;

const http = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Authorization: token || localStorage.getItem('token') || undefined,
  },
});

export default http;
