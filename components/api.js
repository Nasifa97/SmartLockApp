// components/api.js

import axios from 'axios';

const API_BASE_URL = 'http://172.20.10.2:8000'; // ✅ Your Flask backend address

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signup = (data) => api.post('/auth/signup', data);
export const login = (data) => api.post('/auth/login', data);
export const getLocks = (token) =>
  api.get('/locks', { headers: { Authorization: `Bearer ${token}` } });
export const lockDoor = (token, deviceId) =>
  api.post(`/api/lock?device_id=${deviceId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
export const unlockDoor = (token, deviceId) =>
  api.post(`/api/unlock?device_id=${deviceId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
export const getLogs = (token) =>
  api.get('/api/logs', { headers: { Authorization: `Bearer ${token}` } });
