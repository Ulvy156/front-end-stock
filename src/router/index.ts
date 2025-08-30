import { createRouter, createWebHistory } from 'vue-router'
import userRoute from './user.route'
import sharedRoute from './shared.route'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import("@/features/auth/LoginComponent.vue")
    },
    // user routers
    ...userRoute,
    // for auth users
    ...sharedRoute,
    
  ],
})

export default router
