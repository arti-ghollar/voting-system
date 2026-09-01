import api from "./api";

const TOKEN_KEY = "blockvote_token";

const saveToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const authService = {
  async login(credentials) {
    const response = await api.post("/auth/login", credentials);

    if (response?.token) {
      saveToken(response.token);
    }

    return response;
  },

  async register(userData) {
    const response = await api.post("/auth/register", userData);

    if (response?.token) {
      saveToken(response.token);
    }

    return response;
  },

  async getProfile() {
    return api.get("/auth/profile");
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("blockvote_auth_user");
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  },
};

export default authService;