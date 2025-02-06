import axios from 'axios';
import { API_PATHS } from '../utils/api.constants';

// Generic function for creating the headers with authCode
const getHeaders = () => {
  const user = JSON.parse(localStorage.getItem('userdata'));
  return {
    headers: {
      authCode: user?.data?.authCode,
    },
  };
};

// Generic CRUD operations
const apiService = {
  get: (url) => {
    const config = getHeaders();
    return axios.get(API_PATHS.API_BASE_URL +url, config).then((response) => response.data);
  },

  post: (url, data) => {
    const config = getHeaders();
    return axios.post(API_PATHS.API_BASE_URL +url, data, config).then((response) => response.data);
  },

  patch: (url, data) => {
    const config = getHeaders();
    return axios.patch(API_PATHS.API_BASE_URL +url, data, config).then((response) => response.data);
  },

  delete: (url) => {
    const config = getHeaders();
    return axios.delete(API_PATHS.API_BASE_URL +url, config).then((response) => response.data);
  },
};

export default apiService;
