// frontend/src/services/authService.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth';

// Interceptor para tokens
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async login(email: string, password: string) {
    console.log("Llamando a:", `${API_URL}/login`);
    console.log("Datos enviados:", { email, password });

    try {
      const { data } = await axios.post(`${API_URL}/login`, { email, password });
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data; // { token, user }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
      }
      throw new Error('Error desconocido al iniciar sesión');
    }
  },

  async register(userData: { name: string; email: string; password: string }) {
    try {
      const { data } = await axios.post(`${API_URL}/register`, userData);
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data; // { token, user }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error al registrarse');
      }
      throw new Error('Error desconocido al registrarse');
    }
  },

  logout() {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  }
};