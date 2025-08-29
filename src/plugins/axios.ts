import axios from "axios"
import type { App } from "vue"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // your API base
  timeout: 10000
})

export default {
  install(app: App) {
    app.config.globalProperties.$axios = api
  }
}

export { api }
