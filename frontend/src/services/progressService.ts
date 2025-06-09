import axios from 'axios';

const API_URL = 'http://localhost:5000/api/progress';

const getToken = () => localStorage.getItem('token');

export const progressService = {
  async getProgress() {
    const { data } = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return data;
  },

  async addProgress(progressEntry: { exercise: string; weight: number; reps: number; date: string }) {
    const { data } = await axios.post(API_URL, progressEntry, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return data;
  }
};
