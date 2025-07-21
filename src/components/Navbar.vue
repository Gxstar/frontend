<template>
  <header class="bg-white shadow-sm">
    <div class="w-full px-4">
      <div class="flex justify-between h-16 w-full">
        <div class="flex">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <svg class="h-8 w-auto text-indigo-600" viewBox="0 0 32 32" fill="currentColor">
              <path d="M10 3H22C24.209 3 26 4.79076 26 7V25C26 27.2092 24.209 29 22 29H10C7.791 29 6 27.2092 6 25V7C6 4.79076 7.791 3 10 3ZM22 5H10C8.89543 5 8 5.89543 8 7V25C8 26.1046 8.89543 27 10 27H22C23.1046 27 24 26.1046 24 25V7C24 5.89543 23.1046 5 22 5Z" />
              <path d="M12 9H20V11H12V9Z" fill="#fff" />
              <path d="M12 13H18V15H12V13Z" fill="#fff" />
            </svg>
            <span class="ml-2 text-xl font-bold text-gray-900">MyWebsite</span>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <button
              @click="handleNavigation('home')"
              :class="{
                'border-indigo-500 text-gray-900': activeTab === 'home',
                'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': activeTab !== 'home'
              }"
              class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200"
            >
              首页
            </button>
            <button
              @click="handleNavigation('about')"
              :class="{
                'border-indigo-500 text-gray-900': activeTab === 'about',
                'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': activeTab !== 'about'
              }"
              class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200"
            >
              关于
            </button>
          </nav>
        </div>

        <!-- Search and User Actions -->
        <div class="hidden sm:flex sm:items-center sm:space-x-4 ml-auto">
          <div class="relative">
            <input
              type="text"
              placeholder="搜索..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <svg
              class="h-5 w-5 text-gray-400 absolute left-3 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <button class="p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="sr-only">查看通知</span>
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          <div class="relative" v-if="authStore.user">
            <div class="flex items-center space-x-2 cursor-pointer" @mouseenter="showUserMenu = true" @mouseleave="handleMenuLeave">
              <img
                class="h-8 w-8 rounded-full object-cover border-2 border-transparent hover:border-indigo-300 transition-all duration-200"
                :src="authStore.user.avatar || 'https://picsum.photos/200/300'"
                alt="用户头像"
              />
              <span class="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200">{{ authStore.user.username }}</span>
            </div>
            
            <!-- 用户菜单 -->
            <div v-if="showUserMenu" class="absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100" @mouseenter="cancelMenuLeave" @mouseleave="showUserMenu = false">
              <button @click="handleNavigation('user-center')" class="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 w-full text-left transition-all duration-200">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                进入用户中心
              </button>
              <div class="border-t border-gray-100 my-1"></div>
              <button @click="handleLogout()" class="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 w-full text-left transition-all duration-200">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H3"></path>
                </svg>
                登出
              </button>
            </div>
          </div>
          <button v-else @click="handleNavigation('login')" class="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            登录
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center sm:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span class="sr-only">打开主菜单</span>
            <svg v-if="mobileMenuOpen" class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <svg v-else class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state -->
    <div v-if="mobileMenuOpen" class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <button
          @click="handleMobileNavigation('home')"
          :class="{
            'bg-indigo-50 border-indigo-500 text-indigo-700': activeTab === 'home',
            'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800': activeTab !== 'home'
          }"
          class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left transition-colors duration-200"
        >
          首页
        </button>
        <button
          @click="handleMobileNavigation('about')"
          :class="{
            'bg-indigo-50 border-indigo-500 text-indigo-700': activeTab === 'about',
            'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800': activeTab !== 'about'
          }"
          class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left transition-colors duration-200"
        >
          关于
        </button>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200" v-if="authStore.user">
        <div class="px-4 flex items-center">
          <div class="flex-shrink-0">
            <img
              class="h-8 w-8 rounded-full"
              :src="authStore.user.avatar || 'https://picsum.photos/200/300'"
              alt="用户头像"
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">{{ authStore.user.username }}</div>
            <div class="text-sm font-medium text-gray-500">{{ authStore.user.email }}</div>
          </div>
        </div>
        <div class="mt-3 space-y-1">
          <button class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left transition-colors duration-200">
            个人资料
          </button>
          <button class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left transition-colors duration-200">
            设置
          </button>
          <button class="block px-4 py-2 text-base font-medium text-red-600 hover:text-red-800 hover:bg-gray-100 w-full text-left transition-colors duration-200">
            退出登录
          </button>
        </div>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200" v-else>
        <button @click="handleNavigation('login')" class="block px-4 py-2 text-base font-medium text-indigo-600 hover:text-indigo-800 hover:bg-gray-100 w-full text-left transition-colors duration-200">
          登录
        </button>
        <button class="block px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 w-full text-left transition-colors duration-200">
          注册
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

// 定义响应式状态
const activeTab = ref('home');
const mobileMenuOpen = ref(false);
const showUserMenu = ref(false);
const authStore = useAuthStore();
const router = useRouter();

// 处理登出
const handleLogout = () => {
  console.log('执行登出操作...');
  if (authStore && typeof authStore.logout === 'function') {
    try {
      const result = authStore.logout();
      // 检查是否是 Promise
      if (result && typeof result.then === 'function') {
        result
          .then(() => {
            console.log('登出成功');
            router.push('/login');
          })
          .catch(error => {
            console.error('登出失败:', error);
          });
      } else {
        // 不是 Promise，直接处理
        console.log('登出成功');
        router.push('/login');
      }
    } catch (error) {
      console.error('登出失败:', error);
    }
  } else {
    console.error('登出失败: authStore.logout 不是一个函数');
  }
};

let menuLeaveTimeout;

  const handleMenuLeave = () => {
    menuLeaveTimeout = setTimeout(() => {
      showUserMenu.value = false;
    }, 300);
  }

  const cancelMenuLeave = () => {
    clearTimeout(menuLeaveTimeout);
  };

// 在组件挂载时获取用户信息和设置路由监听
onMounted(() => {
  console.log('Navbar组件已挂载');
  console.log('当前登录状态:', authStore.isLoggedIn);
  console.log('当前用户信息:', authStore.user);
  
  // 初始化activeTab为当前路由名称
  activeTab.value = router.currentRoute.value.name || 'home';
  
  // 设置路由监听
  const routeListener = router.afterEach((to) => {
    activeTab.value = to.name || 'home';
    console.log('路由变化，更新activeTab为:', activeTab.value);
  });
  
  // 清理监听器
  onUnmounted(() => {
    routeListener();
  });
  
  // 检查用户是否已登录但没有用户信息
  if (authStore.isLoggedIn && !authStore.user) {
    console.log('用户已登录但没有用户信息，尝试获取...');
    authStore.getUserInfo()
      .then(user => {
        console.log('成功获取用户信息:', user);
      })
      .catch(error => {
        console.error('获取用户信息失败:', error);
      });
  }
});

// 处理导航
function handleNavigation(tab) {
  console.log('处理导航到:', tab);
  activeTab.value = tab;
  if (tab === 'user-center') {
    router.push({ name: 'admin-dashboard' });
  } else {
    router.push({ name: tab });
  }
  console.log('路由跳转后:', router.currentRoute.value);
}

// 处理移动端导航
function handleMobileNavigation(tab) {
  activeTab.value = tab;
  mobileMenuOpen.value = false;
  router.push({ name: tab });
}
</script>

<style scoped>
/* 这里可以添加额外的样式，但我们已经使用了Tailwind CSS的类 */
</style>