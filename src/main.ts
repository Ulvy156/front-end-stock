import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from "@/plugins/i18n"
//css

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(i18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
