import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import HomeView from '../views/HomeView.vue'
import AdminView from '@/views/AdminView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      },
      children: [
        {
          path: 'mount',
          name: 'admin-mount',
          component: () => import('@/views/admin/MountView.vue'),
          meta: { requiresAuth: true, requiresAdmin: true }
        },
        {
          path: 'user',
          name: 'admin-user',
          component: () => import('@/views/admin/UserView.vue'),
          meta: { requiresAuth: true, requiresAdmin: true }
        },
        {
          path: 'settings',
          name: 'admin-settings',
          component: () => import('@/views/admin/SettingsView.vue'),
          meta: { requiresAuth: true, requiresAdmin: true }
        },
        {
          path: 'camera',
          name: 'admin-camera',
          component: () => import('@/views/admin/CameraView.vue'),
          meta: { requiresAuth: true, requiresAdmin: true }
        },
        {
          path: 'lens',
          name: 'admin-lens',
          component: () => import('@/views/admin/LensView.vue'),
          meta: { requiresAuth: true, requiresAdmin: true }
        },
        {
          path: 'brand',
          name: 'admin-brand',
          component: () => import('@/views/admin/BrandView.vue'),
          meta: { requiresAuth: true, requiresAdmin: true }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const savedToken = localStorage.getItem('access_token')

  if (savedToken && !authStore.isLoggedIn) {
    try {
      await authStore.fetchUserInfo();
    } catch (error) {
      authStore.logout();
    }
  }

  // 如果用户已登录且尝试访问登录页面，则跳转到首页
  if (authStore.isLoggedIn && to.name === 'login') {
    next({ name: 'home' })
    return
  }

  if (to.meta.requiresAuth) {
    if (!authStore.isLoggedIn) {
      ElMessage.warning('请先登录')
      next({ name: 'login' })
    } else if (to.meta.requiresAdmin && !authStore.checkAdmin()) {
      next(from)
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
