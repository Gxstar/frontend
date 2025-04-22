import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Admin from '@/views/Admin.vue'
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
      component: Admin,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
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
      await authStore.login(savedToken)
    } catch (error) {
      authStore.logout()
    }
  }

  // 如果用户已登录且尝试访问登录页面，则跳转到首页
  if (authStore.isLoggedIn && to.name === 'login') {
    next({ name: 'home' })
    return
  }

  if (to.meta.requiresAuth) {
    if (!authStore.isLoggedIn) {
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
