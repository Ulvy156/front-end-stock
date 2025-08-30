import { createRouter, createWebHistory } from 'vue-router'
import userRoute from './user.route'
import sharedRoute from './shared.route'
import { getCookie } from '@/utils/useCookies'

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


router.beforeEach((to, from, next) => {
  const token = getCookie("access_token")
  const isLoggedIn = !!token

  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/login") // protected route but not logged in
  } else if (to.path === "/login" && isLoggedIn) {
    next("/dashboard") // redirect logged in user away from login
  } else {
    next() // go normally
  }
})
