import axios, { AxiosResponse } from 'axios';
import { config } from '../config';

const axiosKanban = axios.create({
  baseURL: config.servers.kanban_app,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosKanban.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error: any) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosKanban.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default axiosKanban;
