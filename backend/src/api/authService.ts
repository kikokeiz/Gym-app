// src/api/authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Ajusta según tu backend

export const authService = {
  async login(email: string, password: string) {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  },

  async register(userData: {
    name: string;
    email: string;
    password: string;
    // otros campos según tu backend
  }) {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  }
};