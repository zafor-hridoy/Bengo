import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3001/api" : "/api",
  withCredentials: true,
});

// Suppress 401 errors in console for auth check
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.config?.url?.includes('/auth/check') && error.response?.status === 401) {
      // Silently handle auth check 401 errors
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);