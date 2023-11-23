import { defineStore } from "pinia";
import axios from "axios";

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
        const response = await axios.post("/api/users/login", credentials);
        this.setToken(response.data.token);
      } catch (error) {
        throw error;
      }
    },
  },
});
