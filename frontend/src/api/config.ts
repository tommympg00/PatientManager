import axios from 'axios';

export type Response<T = undefined> = {
  data: T;
  success: string;
};

export const ENDPOINTS = {
  patients: {
    base: '/api/patients',
    get: '/api/patients/:id',
  },
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
