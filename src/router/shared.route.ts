export default [
  {
    path: '/dashboard',
    component: () => import("@/views/auth/dashboard-view.vue"),
    meta: { requiresAuth: true }
  },
]
