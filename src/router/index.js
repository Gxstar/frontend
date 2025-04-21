import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
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

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // 已登录用户访问登录或注册页面时重定向到首页
  if ((to.name === 'login' || to.name === 'register') && authStore.isLoggedIn) {
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
