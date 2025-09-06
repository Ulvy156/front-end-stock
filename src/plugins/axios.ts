// src/utils/api.ts
import axios from "axios";
import { getCookie } from "@/utils/useCookies";
import refreshToken from "@/services/refresh-token";
import router from "@/router";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// Attach access token to requests
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // refresh token
        await refreshToken();
        const token = getCookie("access_token");
        if (!token) throw new Error("Cannot refresh token");

        // Update axios default headers so next requests use it
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Retry the original request
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${token}`,
        };

        return api(originalRequest);
      } catch (err) {
        router.push("/login");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);


export { api };
