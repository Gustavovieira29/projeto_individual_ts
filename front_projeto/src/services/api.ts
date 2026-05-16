import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',  // proxy do Vite redireciona para backend-service:3000
});