export default [
  {
    path: '/',
    redirect: '/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/user/home-view.vue'),
      },
      {
        path: 'customer',
        component: () => import('@/views/auth/customer-view.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/customer/details/:customer_id',
        component: () => import('@/views/auth/customer-details.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
]
