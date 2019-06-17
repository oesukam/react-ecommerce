import axios from 'axios';
import 'dotenv/config';
import { store } from '../store';

const { accessToken } = store.getState().currentUser;

const http = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'USER-KEY': accessToken || localStorage.getItem('accessToken') || undefined,
  },
});
console.log();

export default http;
