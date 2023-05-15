import axios from 'axios';
import { BASE_URL } from './const';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default axiosInstance;
