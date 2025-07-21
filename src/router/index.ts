import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/components/admin/AdminLayout.vue'),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('@/views/admin/DashboardView.vue')
        },
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('@/views/admin/UserManagementView.vue')
        },
        {
          path: 'brands',
          name: 'admin-brands',
          component: () => import('@/views/admin/BrandManagementView.vue')
        },
        {
          path: 'cameras',
          name: 'admin-cameras',
          component: () => import('@/views/admin/CameraManagementView.vue')
        },
        {
          path: 'lenses',
          name: 'admin-lenses',
          component: () => import('@/views/admin/LensManagementView.vue')
        },
        {
          path: 'mounts',
          name: 'admin-mounts',
          component: () => import('@/views/admin/MountManagementView.vue')
        }
      ]
    },
  ],
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // 检查是否需要认证
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    // 未登录则重定向到登录页
    next({ name: 'login' })
  } 
  // 检查是否需要访客状态
  else if (to.meta.requiresGuest && authStore.isLoggedIn) {
    // 已登录则重定向到首页
    next({ name: 'home' })
  } 
  else {
    // 正常放行
    next()
  }
})

export default router
