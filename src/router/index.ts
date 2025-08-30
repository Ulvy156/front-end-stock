import { createRouter, createWebHistory } from 'vue-router'
import userRoute from './user.route'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import("@/views/login-view.vue")
    },
    // user routers
    ...userRoute,
  ],
})

export default router
