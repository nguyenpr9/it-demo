// apiService.js
import axios from "axios";
import { API_ENDPOINT } from "../../env";
import { getAuthToken } from "./authService";

const apiService = axios.create({
  baseURL: API_ENDPOINT,
});

apiService.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default apiService;