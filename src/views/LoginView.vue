<script setup lang="ts">
import { ref } from 'vue';
import { Service } from '@/services/api/services/Service';

// 定义状态
const formData = ref({
  username: '',
  password: ''
});
const errors = ref<Record<string, string>>({});
const showPassword = ref(false);
const darkMode = ref(false);

// 处理输入变化
const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const { name, value } = target;
  formData.value = { ...formData.value, [name]: value };
  // 清除错误提示
  if (errors.value[name]) {
    errors.value = { ...errors.value, [name]: '' };
  }
};

// 验证表单
const validateForm = () => {
  const newErrors: Record<string, string> = {};
  if (!formData.value.username) newErrors.username = '请输入用户名';
  if (!formData.value.password) newErrors.password = '请输入密码';
  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

// 处理提交
const handleSubmit = async (e: Event) => {
  e.preventDefault();
  if (validateForm()) {
    try {
      const response = await Service.loginAuthLoginPost({
        username: formData.value.username,
        password: formData.value.password,
        grant_type: 'password'
      });
      console.log('Login successful:', response);
      // 这里可以添加登录成功后的跳转逻辑
    } catch (error) {
      console.error('Login failed:', error);
      errors.value = {
        username: '用户名或密码错误',
        password: '用户名或密码错误'
      };
    }
  }
};
</script>

<template>
  <div :class="`min-h-screen flex items-center justify-center px-4 py-12 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-20 blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full opacity-20 blur-3xl"></div>
    </div>

    <!-- 登录卡片 -->
    <div :class="`w-full max-w-md p-8 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-[1.01] ${darkMode ? 'bg-gray-800/80 shadow-gray-900/20' : 'bg-white shadow-gray-200/50'}`">
      <div class="text-center mb-8">
        <div class="flex justify-center items-center mb-4">
          <svg class="w-12 h-12 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 :class="`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`">欢迎回来</h2>
        <p :class="darkMode ? 'text-gray-300' : 'text-gray-600'">请输入您的凭证继续</p>
      </div>

      <form @submit="handleSubmit" class="space-y-6">
        <!-- 用户名字段 -->
        <div>
          <label for="username" :class="`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`">
            用户名
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg :class="`h-5 w-5 ${errors.email ? 'text-red-400' : darkMode ? 'text-gray-400' : 'text-gray-500'}`" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <input
              id="username"
              name="username"
              type="text"
              autocomplete="username"
              v-model="formData.username"
              @input="handleChange"
              :class="`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${
                errors.username 
                  ? 'border-red-300 focus:ring-red-200 dark:border-red-600 dark:focus:ring-red-700/50' 
                  : darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500/50' 
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500/50'
              }`"
              placeholder="请输入用户名"
            />
          </div>
          <div v-if="errors.username" class="mt-1 text-sm text-red-500">{{ errors.username }}</div>
        </div>

        <!-- 密码字段 -->
        <div>
          <label for="password" :class="`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`">
            密码
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg :class="`h-5 w-5 ${errors.password ? 'text-red-400' : darkMode ? 'text-gray-400' : 'text-gray-500'}`" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              id="password"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              v-model="formData.password"
              @input="handleChange"
              :class="`block w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${
                errors.password 
                  ? 'border-red-300 focus:ring-red-200 dark:border-red-600 dark:focus:ring-red-700/50' 
                  : darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500/50' 
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500/50'
              }`"
              placeholder="••••••••"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
              @click="showPassword = !showPassword"
            >
              <svg :class="`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`" fill="none" stroke="currentColor">
                <template v-if="showPassword">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </template>
                <template v-else>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 014.07 8.688M15.94 5.333A10.026 10.026 0 0018 6c2.276 0 4.377.757 6 2m-7.5 3l3 3m0 0l-3-3m3 3V4" />
                </template>
              </svg>
            </button>
          </div>
          <div v-if="errors.password" class="mt-1 text-sm text-red-500">{{ errors.password }}</div>
        </div>

        <!-- 记住我和忘记密码 -->
        <div class="flex items-center justify-between">
          <label :class="`flex items-center cursor-pointer ${darkMode ? 'text-gray-300' : 'text-gray-600'}`">
            <input
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span class="ml-2 text-sm">记住我</span>
          </label>
          <a href="#" class="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
            忘记密码？
          </a>
        </div>

        <!-- 提交按钮 -->
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/50 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
        >
          登录
        </button>
      </form>

      <!-- 社交登录 -->
      <div class="mt-8">
        <div class="relative">
          <div :class="`absolute inset-0 flex items-center ${darkMode ? 'text-gray-600' : 'text-gray-400'}`">
            <div class="w-full border-t border-dashed"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span :class="`px-2 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-500'}`">
              或者继续使用
            </span>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-3">
          <button :class="`flex justify-center py-2 px-4 border rounded-lg shadow-sm text-sm font-medium ${darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-white border-gray-300 hover:bg-gray-50'} transition-colors`">
            <svg class="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.819-.26.819-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.219.694.823.576C20.566 21.797 24 17.299 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </button>
          <button :class="`flex justify-center py-2 px-4 border rounded-lg shadow-sm text-sm font-medium ${darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-white border-gray-300 hover:bg-gray-50'} transition-colors`">
            <svg class="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.18 1.45l3.15-3.15C17.45 2.09 14.95 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 注册链接 -->
      <div class="mt-8 text-center">
        <p :class="darkMode ? 'text-gray-300' : 'text-gray-600'">
          还没有账户？
          <a href="#" class="font-medium text-blue-600 hover:text-blue-500 transition-colors">
            立即注册
          </a>
        </p>
      </div>
    </div>

    <!-- 主题切换 -->
    <button
      @click="darkMode = !darkMode"
      :class="`fixed bottom-4 right-4 p-2 rounded-full shadow-lg transition-colors ${
        darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-white text-gray-800'
      }`"
    >
      <template v-if="darkMode">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </template>
      <template v-else>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </template>
    </button>
  </div>
</template>