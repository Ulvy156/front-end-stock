import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from "@/plugins/i18n"
import "./config/logger"
import { setupNProgress } from './plugins/nprogress';

import App from './App.vue'
import router from './router'
import { getCookie } from './utils/useCookies';
import refreshToken from './services/refresh-token';

async function initApp() {
  const is_logged = getCookie("is_logged")

  if (is_logged !== '1') {
    try {
      await refreshToken();
      console.log('ss');

    } catch (err) {
      console.warn("Token refresh failed:", err)
    }
  }

  const app = createApp(App)
  app.use(i18n)
  app.use(createPinia())
  app.use(router)
  setupNProgress(router)
  app.mount('#app')
}

initApp()
