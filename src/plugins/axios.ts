import { getCookie } from "@/utils/useCookies"
import axios from "axios"
import type { App } from "vue"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
})

// Add token automatically to all requests
api.interceptors.request.use(config => {
  const token = getCookie('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default {
  install(app: App) {
    app.config.globalProperties.$axios = api
  }
}

export { api }
