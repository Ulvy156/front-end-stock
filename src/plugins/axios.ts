import axios from "axios";
import { getCookie } from "@/utils/useCookies";
import refreshToken from "@/services/refresh-token";
import router from "@/router";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// Attach tokens to requests
api.interceptors.request.use(config => {
  const accessToken = getCookie("access_token");

  // send cookies (HttpOnly) automatically
  config.withCredentials = true;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// Handle 401 responses
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

        // Update headers for retry
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const refreshTokenValue = getCookie("refresh_token");
        if (refreshTokenValue) {
          api.defaults.headers.common['refresh_token'] = refreshTokenValue;
        }

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${token}`,
          "refresh_token": refreshTokenValue || "",
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
