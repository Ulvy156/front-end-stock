import axios from "axios";
import { getCookie, setCookie } from "@/utils/useCookies";
import refreshToken from "@/services/refresh-token";
import router from "@/router";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
});

// Attach access token
api.interceptors.request.use((config) => {
  const accessToken = getCookie("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Handle 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken(); // refresh & get new token

        if (!newToken) {
          console.warn("⚠️ Refresh failed: no new token returned");
          setCookie('is_logged', '0', Number(import.meta.env.VITE_JWT_REFRESH_EXPIRES_IN)) 
          router.push("/login");
          return Promise.reject(error);
        }

        // attach new Authorization header
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newToken}`,
        };
        setCookie('is_logged', '1', Number(import.meta.env.VITE_JWT_REFRESH_EXPIRES_IN)) 

        // retry the failed request
        return axios.request(originalRequest);
      } catch (err) {
        setCookie('is_logged', '0', Number(import.meta.env.VITE_JWT_REFRESH_EXPIRES_IN)) 
        console.error("❌ Refresh & retry failed:", err);
        router.push("/login");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);


export { api };
