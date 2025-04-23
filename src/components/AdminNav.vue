<template>
  <div class="admin-nav">
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
      <div class="logo">
        <!-- 这里可以放置你的logo图片或文本 -->
        Logo
      </div>
      <el-dropdown trigger="click" class="avatar-dropdown" @command="handleCommand">
        <span class="el-dropdown-link">
          <img src="https://pic1.imgdb.cn/item/67c166f7d0e0a243d407fe8c.png" class="avatar" />
          <span class="username">用户名</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="profile">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMenu, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';

const handleCommand = (command: string) => {
  if (command === 'logout') {
    // 处理退出登录逻辑
    console.log('退出登录');
  } else if (command === 'profile') {
    // 处理个人中心逻辑
    console.log('个人中心');
  }
};
</script>

<style scoped>
.admin-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #f5f7fa;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.avatar-dropdown {
  display: flex;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.username {
  margin-right: 10px;
}
</style>