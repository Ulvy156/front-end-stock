import { createRouter, createWebHistory } from 'vue-router'
import userRoute from './user.route'
import sharedRoute from './shared.route'
import { getCookie, setCookie } from '@/utils/useCookies'
import { api } from '@/plugins/axios'
import { isTokenExpired } from '@/utils/useToken'

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
  //if access token expired then check if refresh_token expired or not
  // if yes we will call api for refresh token again
  if(!token){
    const refresh_token = getCookie("refresh_token") ?? '';

    // if refresh token is not expired
    if(!isTokenExpired(refresh_token)){
        // call refresh token endpoint
        const { data } = await api.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          { refresh_token } // send in body
        )

        // save new tokens
        setCookie("access_token", data.access_token, 900) // 15mn
        setCookie("refresh_token", data.refresh_token, 604800) // 7 days

        //re-assign token
        token = data.access_token;
    }
  }

  const isLoggedIn = !!token

  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/login") // protected route but not logged in
  } else if (to.path === "/login" && isLoggedIn) {
    next("/dashboard") // redirect logged in user away from login
  } else {
    next() // go normally
  }
})
