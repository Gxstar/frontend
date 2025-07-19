import { defineStore } from 'pinia';
import { Service } from '@/services/api/services/Service';
import type { Body_login_auth_login_post } from '@/services/api/models/Body_login_auth_login_post';
import type { UserRead } from '@/services/api/models/UserRead';

// 定义Auth store
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as UserRead | null,
    token: localStorage.getItem('token') || null,
    isLoggedIn: !!localStorage.getItem('token'),
  }),

  actions: {
    // 登录方法
    async login(credentials: {
      username: string;
      password: string;
    }) {
      try {
        const formData: Body_login_auth_login_post = {
          username: credentials.username,
          password: credentials.password,
        };

        const response = await Service.loginAuthLoginPost(formData);
        const token = response.access_token;

        // 保存token到localStorage
        localStorage.setItem('token', token);

        // 更新状态
        this.token = token;
        this.isLoggedIn = true;

        // 获取用户信息
        await this.getUserInfo();

        return true;
      } catch (error) {
        console.error('登录失败:', error);
        return false;
      }
    },

    // 登出方法
    logout() {
      // 清除localStorage中的token
      localStorage.removeItem('token');

      // 重置状态
      this.token = null;
      this.user = null;
      this.isLoggedIn = false;
    },

    // 获取用户信息
    async getUserInfo() {
      try {
        if (!this.isLoggedIn) return;

        const userInfo = await Service.readUsersMeUsersMeGet();
        this.user = userInfo;
        return userInfo;
      } catch (error) {
        console.error('获取用户信息失败:', error);
        // 如果获取用户信息失败，可能是token过期，执行登出
        this.logout();
        return null;
      }
    },
  },
});