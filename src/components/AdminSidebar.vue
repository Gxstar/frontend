<template>
  <el-menu 
    :default-active="$route.path" 
    class="el-menu-vertical-demo" 
    mode="vertical"
    :router="true"
    :collapse="false"
    background-color="#ffffff"
    text-color="#606266"
    active-text-color="#409EFF"
  >
    <el-menu-item index="/admin">
      <el-icon><PieChart /></el-icon>
      <span>数据面板</span>
    </el-menu-item>
    <el-menu-item index="/admin/brand">
      <el-icon><Shop /></el-icon>
      <span>品牌管理</span>
    </el-menu-item>
    <el-menu-item index="/admin/camera">
      <el-icon><Camera /></el-icon>
      <span>相机信息</span>
    </el-menu-item>
    <el-menu-item index="/admin/lens">
      <el-icon><Coin /></el-icon>
      <span>镜头信息</span>
    </el-menu-item>
    <el-menu-item index="/admin/mount">
      <el-icon><Connection /></el-icon>
      <span>卡口管理</span>
    </el-menu-item>
    <el-menu-item index="/admin/user">
      <el-icon><User /></el-icon>
      <span>用户管理</span>
    </el-menu-item>
    <el-menu-item index="/admin/settings">
      <el-icon><Setting /></el-icon>
      <span>系统设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ElMenu, ElMenuItem, ElIcon } from 'element-plus'
import { PieChart, Shop, Camera, Coin, Connection, User, Setting } from '@element-plus/icons-vue'
</script>

<style scoped>
.el-menu-vertical-demo {
  border-right: 1px solid #e6e6e6;
  min-height: calc(100vh - 60.57px);
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