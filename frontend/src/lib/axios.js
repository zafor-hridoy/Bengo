import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3001/api" : "https://bengo-zdu5-2f49k9mw6-zafor-hridoys-projects.vercel.app/api",
  withCredentials: true,
});


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.config?.url?.includes('/auth/check') && error.response?.status === 401) {
      
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);