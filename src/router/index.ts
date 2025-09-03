import { createRouter, createWebHistory } from 'vue-router'
import userRoute from './user.route'
import sharedRoute from './shared.route'
import { getCookie } from '@/utils/useCookies'
import { isTokenExpired } from '@/utils/useToken'
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
  let token = getCookie("access_token");

  if (!token) {
    const refresh_token = getCookie("refresh_token") ?? '';

    if (refresh_token && !isTokenExpired(refresh_token)) {
      try {
        await refreshToken();
        token = getCookie("access_token");
      } catch (err) {
        console.error("Refresh token failed:", err);
      }
    }
  }

  const isLoggedIn = !!token;

  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/login");
  } else if (to.path === "/login" && isLoggedIn) {
    next("/dashboard");
  } else {
    next();
  }
});

