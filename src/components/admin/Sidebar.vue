<template>
  <el-menu
    default-active="admin-dashboard"
    class="sidebar-menu bg-white text-gray-800 h-full"
    router
    active-text-color="#409eff"
    text-color="#333333"
    :collapse-transition="false"
  >
    <el-menu-item index="admin-dashboard" :route="{ name: 'admin-dashboard' }" class="hover:bg-gray-700 transition-colors duration-200">
      <el-icon class="mr-3"><HomeFilled /></el-icon>
      <span>管理首页</span>
    </el-menu-item>
    <el-menu-item index="admin-users" :route="{ name: 'admin-users' }" class="hover:bg-gray-700 transition-colors duration-200">
      <el-icon class="mr-3"><User /></el-icon>
      <span>用户管理</span>
    </el-menu-item>
    <el-menu-item index="admin-brands" :route="{ name: 'admin-brands' }" class="hover:bg-gray-700 transition-colors duration-200">
      <el-icon class="mr-3"><OfficeBuilding /></el-icon>
      <span>品牌管理</span>
    </el-menu-item>
    <el-menu-item index="admin-cameras" :route="{ name: 'admin-cameras' }" class="hover:bg-gray-700 transition-colors duration-200">
      <el-icon class="mr-3"><VideoCamera /></el-icon>
      <span>相机管理</span>
    </el-menu-item>
    <el-menu-item index="admin-lenses" :route="{ name: 'admin-lenses' }" class="hover:bg-gray-700 transition-colors duration-200">
      <el-icon class="mr-3"><Picture /></el-icon>
      <span>镜头管理</span>
    </el-menu-item>
    <el-menu-item index="admin-mounts" :route="{ name: 'admin-mounts' }" class="hover:bg-gray-700 transition-colors duration-200">
      <el-icon class="mr-3"><Link /></el-icon>
      <span>卡口管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { HomeFilled, User, OfficeBuilding, VideoCamera, Picture, Link } from '@element-plus/icons-vue'
import { ElMenu, ElMenuItem, ElIcon } from 'element-plus'
</script>

<style scoped>
/* 侧边栏样式优化 */
.sidebar-menu {
  @apply w-64 border-r border-gray-200 shadow-md;
}

/* 菜单项样式 */
.el-menu-item {
  @apply py-3 pl-6 text-base rounded-md hover:bg-gray-100;
}

/* 图标样式 */
.el-icon {
  @apply text-lg;
}

/* 激活状态样式 */
.el-menu-item.is-active {
  @apply bg-blue-50 text-blue-600 font-medium;
}

/* 修复Element Plus默认样式冲突 */
:deep(.el-menu) {
  @apply bg-transparent border-none;
}

:deep(.el-menu-item) {
  @apply h-auto;
}
</style>