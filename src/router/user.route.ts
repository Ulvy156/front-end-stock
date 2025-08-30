export default [
  {
    path: '/user',
    redirect: '/user/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import("@/views/user/home-view.vue")
      }
    ]
  }
]
