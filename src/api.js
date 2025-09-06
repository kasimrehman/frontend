import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // All API calls go through Express proxy
});

export default api;
