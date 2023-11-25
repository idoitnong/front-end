import { defineStore } from "pinia";
import axios, { AxiosResponse } from "axios";

interface AuthState {
  token: string | null;
}

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
        const response: AxiosResponse = await axios.post("/api/users/login", credentials, { timeout: 3000 });
        this.setToken(response.data.token);
      } catch (error) {
        throw error;
      }
    },
  },
});
