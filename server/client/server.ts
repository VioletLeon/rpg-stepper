import axios from 'axios';

console.log('process.env.BACKEND_API_ROUTE');

const server = axios.create({
  baseURL: process.env.BACKEND_API_ROUTE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default server;
