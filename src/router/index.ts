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

  let access_token = getCookie("access_token");

  if (!access_token) {
    try {
      await refreshToken(); // wait until token refreshed
      // re-check cookie after refresh
      access_token = getCookie("access_token");
    } catch (err) {
      console.error("Refresh token failed:", err);
    }
  }

  if (to.meta.requiresAuth && !access_token) {
    return next('/login'); // use next() instead of location.href
  }

  if (to.path === "/login" && access_token) {
    return next('/');
  }

  next();
});


