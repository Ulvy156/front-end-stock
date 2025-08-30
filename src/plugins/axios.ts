// src/utils/api.ts
import axios from "axios"
import { getCookie, setCookie, removeCookie } from "@/utils/useCookies"
import router from "@/router"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
})

// Attach access token to requests
api.interceptors.request.use(config => {
  const token = getCookie("access_token") // or localStorage.getItem("access_token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor for 401
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // refresh token from storage
        const refreshToken = getCookie("refresh_token")
        if (!refreshToken) throw new Error("No refresh token")

        // call refresh endpoint
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          { refreshToken } // send in body
        )

        // save new tokens
        setCookie("access_token", data.access_token, 900) // 15mn
        setCookie("refresh_token", data.refresh_token, 604800) // 7 days

        // retry original request
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`
        return api(originalRequest)
      } catch (err) {
        // refresh failed → logout
        removeCookie("access_token")
        removeCookie("refresh_token")
        router.push("/login")
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export { api }
