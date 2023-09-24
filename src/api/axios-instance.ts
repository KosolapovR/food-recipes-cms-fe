import axios from 'axios';
import { BASE_URL } from './const';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  validateStatus: function (status) {
    return status < 400; // Resolve only if the status code is less than 500
  },
});

export default axiosInstance;
