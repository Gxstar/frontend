import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { getCurrentInstance } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const userRole = ref('')
  const userInfo = ref(null)
  const accessToken = ref('')

  async function fetchUserInfo() {
    const { proxy } = getCurrentInstance();
    try {
      const response = await proxy.$api.users.readUsersMe();
      userInfo.value = response.data;
      userRole.value = response.data.role;
      return response.data;
    } catch (error) {
      // ElMessage.error('获取用户信息失败')
      throw error;
    }
  }

  async function login(username, password) {
    const { proxy } = getCurrentInstance();
    try {
      const response = await proxy.$api.login.loginForAccessToken(username, password);
      const token = response.data.access_token;
      accessToken.value = token;
      localStorage.setItem('access_token', token);
      const userData = await fetchUserInfo();
      isLoggedIn.value = true;
      userRole.value = userData.role;
      userInfo.value = userData;
    } catch (error) {
      ElMessage.error('登录失败，请检查用户名或密码');
      throw error;
    }
  }

  function logout() {
    isLoggedIn.value = false
    userRole.value = ''
    userInfo.value = null
    accessToken.value = ''
    localStorage.removeItem('access_token')
  }

  function checkAdmin() {
    if (userRole.value !== 'admin') {
      ElMessage.warning('需要管理员权限');
      return false;
    }
    return true;
  }

  return { isLoggedIn, userRole, userInfo, accessToken, login, logout, checkAdmin, fetchUserInfo }
})
