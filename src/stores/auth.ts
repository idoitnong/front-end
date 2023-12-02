import { defineStore } from "pinia";
import axios, { AxiosResponse } from "axios";

interface AuthState {
  token: string | null;
}

const API_URL = import.meta.env.VITE_API_URL || "/api";

export const useAuthStore = defineStore({
  id: "auth",
  state: (): AuthState => ({
    token: localStorage.getItem("token") || null,
  }),
  getters: {
    isLoggedIn: (state) => state.token !== null,
    getToken: (state) => state.token,
  },
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    clearToken() {
      this.token = null;
      localStorage.removeItem("token");
    },
    async login(credentials: { username: string; password: string }) {
      try {
        const response: AxiosResponse = await axios.post(`${API_URL}/users/login`, credentials, {
          withCredentials: true,
          timeout: 3000,
        });
        this.setToken(response.data.token);
      } catch (error) {
        throw error;
      }
    },
  },
});
