<template>
  <el-header class="bg-white shadow-sm border-b border-gray-200 fixed w-full z-30">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- 品牌Logo和名称 -->
        <div class="flex items-center space-x-2">
          <el-icon class="text-primary text-2xl">
            <CameraFilled />
          </el-icon>
          <span class="text-xl font-bold text-gray-800">CameraData</span>
        </div>

        <!-- 中间导航链接 - 在移动端隐藏 -->
        <nav class="hidden md:flex space-x-8">
          <router-link
            to="/"
            class="text-gray-600 hover:text-primary transition-colors flex items-center"
            active-class="text-primary font-medium"
          >
            <el-icon class="mr-1"><HomeFilled /></el-icon>首页
          </router-link>
          <router-link
            to="/about"
            class="text-gray-600 hover:text-primary transition-colors flex items-center"
            active-class="text-primary font-medium"
          >
            <el-icon class="mr-1"><InfoFilled /></el-icon>关于
          </router-link>
          <router-link
            to="/admin"
            class="text-gray-600 hover:text-primary transition-colors flex items-center"
            active-class="text-primary font-medium"
          >
            <el-icon class="mr-1"><Setting /></el-icon>管理
          </router-link>
        </nav>

        <!-- 右侧用户区域 -->
        <div class="flex items-center space-x-4">
          <!-- 搜索按钮 - 移动端显示 -->
          <button class="md:hidden text-gray-500 hover:text-primary">
            <el-icon class="text-lg"><Search /></el-icon>
          </button>

          <!-- 用户信息/登录按钮 -->
          <div v-if="isLoggedIn" class="relative group">
            <button class="flex items-center space-x-2 focus:outline-none">
              <el-avatar size="small" class="border-2 border-primary/20">
                <img :src="userAvatar" alt="User avatar" class="object-cover" />
              </el-avatar>
              <span class="hidden sm:inline text-sm font-medium text-gray-700">{{ userName }}</span>
              <el-icon class="text-gray-500 text-xs"><ArrowDown /></el-icon>
            </button>

            <!-- 用户下拉菜单 -->
            <el-dropdown-menu
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100"
              v-show="showDropdown"
              @mouseleave="showDropdown = false"
            >
              <router-link
                to="/profile"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="showDropdown = false"
              >
                <el-icon class="mr-2 text-xs"><UserFilled /></el-icon>个人资料
              </router-link>
              <router-link
                to="/settings"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="showDropdown = false"
              >
                <el-icon class="mr-2 text-xs"><Setting /></el-icon>设置
              </router-link>
              <div class="border-t border-gray-100 my-1"></div>
              <button
                class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                @click="handleLogout"
              >
                <el-icon class="mr-2 text-xs"><SwitchButton /></el-icon>退出登录
              </button>
            </el-dropdown-menu>
          </div>

          <!-- 未登录状态 -->
          <router-link
            v-else
            to="/login"
            class="el-button el-button--primary"
          >
            <el-icon class="mr-1"><UserFilled /></el-icon>登录
          </router-link>

          <!-- 移动端菜单按钮 -->
          <button class="md:hidden text-gray-500 hover:text-primary">
            <el-icon class="text-lg"><Menu /></el-icon>
          </button>
        </div>
      </div>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import {
  CameraFilled,
  HomeFilled,
  InfoFilled,
  Setting,
  Search,
  UserFilled,
  ArrowDown,
  SwitchButton,
  Menu
} from '@element-plus/icons-vue';
import { ElHeader, ElIcon, ElAvatar, ElDropdownMenu, ElButton } from 'element-plus';

// 状态管理
const authStore = useAuthStore();
const router = useRouter();
const showDropdown = ref(false);
const isLoggedIn = ref(authStore.isLoggedIn);
const userName = ref(authStore.user?.username || '');
const userAvatar = ref(authStore.user?.avatar || 'https://picsum.photos/id/1005/200');

// 监听点击事件关闭下拉菜单
const handleClickOutside = (event: MouseEvent) => {
  const dropdown = document.querySelector('.el-dropdown-menu');
  const trigger = document.querySelector('.el-avatar, .text-sm.font-medium.text-gray-700');

  if (dropdown && trigger && !dropdown.contains(event.target as Node) && !trigger.contains(event.target as Node)) {
    showDropdown.value = false;
  }
};

// 生命周期钩子
onMounted(() => {
  window.addEventListener('click', handleClickOutside);
  // 监听authStore变化
  authStore.$subscribe(() => {
    isLoggedIn.value = authStore.isLoggedIn;
    userName.value = authStore.user?.username || '';
    userAvatar.value = authStore.user?.avatar || 'https://picsum.photos/id/1005/200';
  });
});

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
});

// 方法
const handleLogout = async () => {
  await authStore.logout();
  showDropdown.value = false;
  router.push('/login');
};
</script>

<style scoped>
/* 自定义滚动条样式 */
:deep(.el-dropdown-menu) {
  scrollbar-width: thin;
  scrollbar-color: #e2e8f0 #f8fafc;
}

:deep(.el-dropdown-menu::-webkit-scrollbar) {
  width: 4px;
}

:deep(.el-dropdown-menu::-webkit-scrollbar-track) {
  background: #f8fafc;
}

:deep(.el-dropdown-menu::-webkit-scrollbar-thumb) {
  background-color: #e2e8f0;
  border-radius: 2px;
}

/* 动画效果 */
.el-dropdown-menu {
  animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>