<template>
  <el-menu 
    default-active="1" 
    class="el-menu-vertical-demo" 
    mode="vertical"
    :router="true"
    :collapse="false"
    background-color="#ffffff"
    text-color="#606266"
    active-text-color="#409EFF"
  >
    <el-menu-item index="/">
      <el-icon><Menu /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="/camera">
      <el-icon><Camera /></el-icon>
      <span>相机</span>
    </el-menu-item>
    <el-menu-item index="/lens">
      <el-icon><VideoCamera /></el-icon>
      <span>镜头</span>
    </el-menu-item>
    <el-menu-item index="/checkpoint">
      <el-icon><View /></el-icon>
      <span>卡口</span>
    </el-menu-item>
    <el-menu-item index="/user">
      <el-icon><User /></el-icon>
      <span>用户</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <el-icon><Setting /></el-icon>
      <span>设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ElMenu, ElMenuItem, ElIcon } from 'element-plus'
import { Menu, Camera, VideoCamera, View, User, Setting } from '@element-plus/icons-vue'
</script>

<style scoped>
.el-menu-vertical-demo {
  border-right: 1px solid #e6e6e6;
  height: 100%;
  min-height: 100vh;
  background-color: #ffffff;
}

.el-menu-item {
  transition: all 0.3s;
}

.el-menu-item:hover {
  background-color: #f5f7fa !important;
}

.el-icon {
  margin-right: 8px;
  font-size: 18px;
}

.el-menu-item span {
  font-size: 14px;
  font-weight: 500;
}
</style>