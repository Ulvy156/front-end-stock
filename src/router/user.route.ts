export default [
  {
    path: '/user',
    redirect: '/user/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        component: () => import("@/views/user/home-view.vue")
      }
    ]
  }
]
