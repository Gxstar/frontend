import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import config from '@/config'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const userRole = ref('')
  const userInfo = ref(null)
  const accessToken = ref('')

  async function fetchUserInfo() {
    try {
      const response = await axios.get(config.user.me, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`
        }
      })
      userInfo.value = response.data
      userRole.value = response.data.role
      return response.data
    } catch (error) {
      // ElMessage.error('获取用户信息失败')
      throw error
    }
  }

  async function login(token) {
    accessToken.value = token
    localStorage.setItem('access_token', token)
    const userData = await fetchUserInfo()
    isLoggedIn.value = true
    userRole.value = userData.role
    userInfo.value = userData
  }

  function logout() {
    isLoggedIn.value = false
    userRole.value = ''
    userInfo.value = null
    accessToken.value = ''
    localStorage.removeItem('access_token')
  }

  function checkAdmin() {
    if (!isLoggedIn.value) {
      ElMessage.warning('请先登录')
      return false
    }
    if (userRole.value !== 'admin') {
      ElMessage.warning('需要管理员权限')
      return false
    }
    return true
  }

  return { isLoggedIn, userRole, userInfo, accessToken, login, logout, checkAdmin, fetchUserInfo }
})
