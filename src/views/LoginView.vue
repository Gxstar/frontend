<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

// 创建router实例
const router = useRouter();

// 创建auth store实例
const authStore = useAuthStore();

// 定义状态
const formData = ref({
  username: '',
  password: ''
});
const errors = ref<Record<string, string>>({});
const showPassword = ref(false);

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
      const success = await authStore.login({
        username: formData.value.username,
        password: formData.value.password
      });
      if (success) {
        console.log('Login successful');
        // 登录成功后跳转到首页
        router.push({ name: 'home' });
      } else {
        errors.value = {
          username: '用户名或密码错误',
          password: '用户名或密码错误'
        };
      }
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
  <div class="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
    <!-- 背景装饰 -->
    <div class="absolute inset-x-0 top-16 bottom-0 overflow-hidden min-h-screen">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-20 blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full opacity-20 blur-3xl"></div>
    </div>

    <!-- 登录卡片 -->
    <div class="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white">
      <div class="text-center mb-8">
        <div class="flex justify-center items-center mb-4">
          <svg class="w-12 h-12 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 class="text-3xl font-bold mb-2 text-gray-800">欢迎回来</h2>
        <p class="text-gray-600">请输入您的凭证继续</p>
      </div>

      <form @submit="handleSubmit" class="space-y-6">
        <!-- 用户名字段 -->
        <div>
          <label for="username" class="block text-sm font-medium mb-2 text-gray-700">
            用户名
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              id="username"
              name="username"
              type="text"
              autocomplete="username"
              v-model="formData.username"
              @input="handleChange"
              class="block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${errors.username ? 'border-red-300 focus:ring-red-200' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500/50'}"
              placeholder="请输入用户名"
            />
          </div>
          <div v-if="errors.username" class="mt-1 text-sm text-red-500">{{ errors.username }}</div>
        </div>

        <!-- 密码字段 -->
        <div>
          <label for="password" class="block text-sm font-medium mb-2 text-gray-700">
            密码
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              class="block w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${errors.password ? 'border-red-300 focus:ring-red-200' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500/50'}"
              placeholder="••••••••"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
              @click="showPassword = !showPassword"
            >
              <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <template v-if="showPassword">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </template>
                <template v-else>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.996 0 1.964-.12 2.89-.344" />
                </template>
              </svg>
            </button>
          </div>
          <div v-if="errors.password" class="mt-1 text-sm text-red-500">{{ errors.password }}</div>
        </div>

        <!-- 记住我和忘记密码 -->
        <div class="flex items-center justify-between">
          <label class="flex items-center cursor-pointer text-gray-600">
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

      

      <!-- 注册链接 -->
      <div class="mt-8 text-center">
        <p class="text-gray-600">
          还没有账户？
          <a href="#" class="font-medium text-blue-600 hover:text-blue-500 transition-colors">
            立即注册
          </a>
        </p>
      </div>
    </div>

    
  </div>
</template>