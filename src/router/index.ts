import { createRouter, createWebHistory } from 'vue-router'
import userRoute from './user.route'
import sharedRoute from './shared.route'
import { getCookie } from '@/utils/useCookies'
import refreshToken from '@/services/refresh-token'
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


router.beforeEach(async (to, from, next) => {
  let is_logged = getCookie("is_logged");
  // if not logged in try to refresh is_logged
  if (is_logged !== '1') {
    try {
      await refreshToken();
      is_logged = getCookie("is_logged");
    } catch (err) {
      console.error("Refresh token failed:", err);
    }
  }

  const isLoggedIn = is_logged === '1';

  if (to.meta.requiresAuth && !isLoggedIn) {
    location.href = '/login'
  } else if (to.path === "/login" && isLoggedIn) {
    next("/dashboard");
  } else {
    next();
  }
});

