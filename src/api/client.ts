import axios from 'axios';

export const API_BASE_URL = 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});


api.interceptors.request.use(async (config) => {
  return config;
});