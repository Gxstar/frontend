<template>
  <div class="admin-nav">
    <el-menu 
      default-active="1" 
      class="el-menu-demo" 
      mode="horizontal"
      :ellipsis="false"
    >
      <div class="logo">
        <img src="@/assets/logo.svg" alt="Logo" class="logo-img">
      </div>
      
      <div class="flex-grow" />
      
      <el-menu-item index="1" @click="goToHome">首页</el-menu-item>
      
      <el-dropdown class="avatar-dropdown">
        <span class="el-dropdown-link">
          <el-avatar :size="40" src="https://pic1.imgdb.cn/item/67c166f7d0e0a243d407fe8c.png" />
          <span class="username">{{ authStore.userInfo?.username || '用户名' }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ElMenu, ElMenuItem, ElDropdown, ElDropdownMenu, ElDropdownItem, ElAvatar } from 'element-plus'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter();
const authStore = useAuthStore();

const goToHome = () => {
  router.push('/');
};
</script>

<style scoped>
.admin-nav {
  border-bottom: 1px solid #e6e6e6;
  padding: 0 20px;
}
.el-menu-demo {
  border: none;
}
.flex-grow {
  flex-grow: 1;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  height: 40px;
}

.avatar-dropdown {
  margin-left: 20px;
  display: flex;
  align-items: center;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>